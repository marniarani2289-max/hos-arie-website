// Reconstruct the complete legacy + migration history in a disposable local project.
// This is test-fixture preparation, never a production migration or history repair.
import { mkdir, mkdtemp, readdir, readFile, writeFile, copyFile, appendFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const repo = resolve(fileURLToPath(new URL('..', import.meta.url)));
const source = join(repo, 'supabase');
const workdir = await mkdtemp(join(tmpdir(), 'lexnusa-ci-'));
const target = join(workdir, 'supabase');
await mkdir(join(target, 'migrations'), { recursive: true });
const config = await readFile(join(source, 'config.toml'), 'utf8');
await writeFile(join(target, 'config.toml'), config.replace(/^project_id\s*=.*$/m, 'project_id = "lexnusa-ci-replay"'));
await copyFile(join(source, 'seed.sql'), join(target, 'seed.sql'));

// schema.sql predates migrations and supplies profiles/enrollments/certificates.
// Include every migration, including files that share a legacy version prefix.
// Local replay IDs are unique; SQL bytes and production filenames are untouched.
const names = (await readdir(join(source, 'migrations'))).filter(n => n.endsWith('.sql')).sort();
if (!names.length) throw new Error('No migrations found');
const inputs = ['schema.sql', ...names.map(n => 'migrations/' + n)];
const manifest = [];
for (const [index, input] of inputs.entries()) {
  const bytes = await readFile(join(source, input));
  if (!bytes.length) throw new Error('Empty SQL input: ' + input);
  const version = new Date(Date.UTC(2000, 0, 1, 0, 0, index)).toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const name = version + '_' + input.replaceAll('/', '_');
  await writeFile(join(target, 'migrations', name), bytes);
  manifest.push({ source: input, replay: name, sha256: createHash('sha256').update(bytes).digest('hex') });
}
await writeFile(join(workdir, 'replay-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
if (process.env.GITHUB_ENV) await appendFile(process.env.GITHUB_ENV, 'CRM_SUPABASE_WORKDIR=' + workdir + '\n');
console.log('Prepared legacy schema and ' + names.length + ' migrations for disposable local replay.');
console.log('Workdir: ' + workdir);
