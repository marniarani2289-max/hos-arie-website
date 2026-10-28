const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const render = require('react-dom/server').renderToStaticMarkup;

function loadTs(path, mocks = {}) {
  const source = fs.readFileSync(path, 'utf8');
  const compiled = ts.transpileModule(source, {compilerOptions: {
    module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
    target: ts.ScriptTarget.ES2022, esModuleInterop: true,
  }}).outputText;
  const context = {exports: {}, require: name => name in mocks ? mocks[name] : require(name)};
  vm.runInNewContext(compiled, context);
  return context.exports;
}
const doc = loadTs('lib/cji/peta-perkara-document.ts');
const confirmed = {id: 'test-user-a', is_anonymous: false, email_confirmed_at: '2026-01-01'};
function page(user, member, error = null) {
  return loadTs('app/constitutional-justice/peta-perkara/page.tsx', {
    'next/link': props => React.createElement('a', props),
    'next/navigation': {redirect: url => {throw new Error('REDIRECT:' + url);}},
    '@/lib/supabase/server': {createClient: async () => ({
      auth: {getUser: async () => ({data: {user}})},
      from: table => {assert.equal(table, 'cji_members'); return {
        select: () => ({eq: (key, id) => {
          assert.equal(key, 'user_id'); assert.equal(id, user.id);
          return {maybeSingle: async () => ({data: member, error})};
        }}),
      };},
    })},
    '@/lib/cji/peta-perkara-document': doc,
  }).default;
}
for (const [label, user] of [['signed out', null], ['anonymous', {...confirmed, is_anonymous: true}], ['unconfirmed', {...confirmed, email_confirmed_at: null}]]) {
  test(label + ' redirects to login with return path', async () => {
    await assert.rejects(page(user, null)(), /REDIRECT:\/login\?next=%2Fconstitutional-justice%2Fpeta-perkara/);
  });
}
for (const [label, member, error] of [['nonmember', null, null], ['membership error', {role: 'owner'}, new Error('unavailable')]]) {
  test(label + ' cannot receive the application', async () => {
    const html = render(await page(confirmed, member, error)());
    assert.ok(!html.includes('<iframe')); assert.match(html, /ruang kerja internal/);
  });
}
test('member receives local app under per-user storage key', async () => {
  const html = render(await page(confirmed, {role: 'owner'})());
  assert.match(html, /<iframe/);
  assert.match(html, /cji-peta-perkara-v1:test-user-a/);
  assert.ok(!html.includes('peta-perkara-rahrn.hossibarani.chatgpt.site'));
  assert.ok(!html.includes('__USER_ID__'));
});
test('different users get separate local storage namespaces; old backup schema retained', () => {
  const a = doc.petaPerkaraDocument('test-user-a'), b = doc.petaPerkaraDocument('test-user-b');
  assert.ok(!b.includes('cji-peta-perkara-v1:test-user-a'));
  assert.match(b, /cji-peta-perkara-v1:test-user-b/);
  assert.match(a, /d.version===1/);
  const script = a.match(/<script>([\s\S]*)<\/script>/)[1];
  assert.doesNotThrow(() => new vm.Script(script));
});
if (process.env.CJI_PREVIEW_PATH) {
  page(confirmed, {role: 'owner'})().then(tree => {
    fs.writeFileSync(process.env.CJI_PREVIEW_PATH, '<!doctype html><html lang="id"><body style="margin:0">' + render(tree) + '</body></html>');
  });
}
