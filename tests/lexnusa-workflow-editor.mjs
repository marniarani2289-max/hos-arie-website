// DOM component tests: AI and server action are stubbed; PostgreSQL gates are tested separately.
import { build } from "esbuild";
import { JSDOM, VirtualConsole } from "jsdom";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
const repo = fileURLToPath(new URL("../", import.meta.url));
const bundle = await build({
  stdin: {
    contents: `import React from 'react'; import {createRoot} from 'react-dom/client';import Editor from './app/lexnusa/cohort/workspace/WorkspaceEditor';import Summary from './app/lexnusa/cohort/workspace/WorkflowSummary';import {emptyDocument} from './lib/lexnusa/document-workflow';const work={brief:'Fakta simulasi: digitalisasi arsip perusahaan fiktif.',instruction:'',draft:'',evaluation:'',revision:''};createRoot(document.getElementById('root')).render(<main className="mx-auto max-w-5xl px-6 py-10"><p>UJI LOKAL · Data simulasi · Layanan AI dan simpan disimulasikan</p><Summary version={null} review={null}/><Editor initial={work} document={emptyDocument} versionId={null} initialRefs={{}}/></main>);`,
    resolveDir: repo,
    loader: "tsx",
  },
  bundle: true,
  jsx: "automatic",
  write: false,
  define: { "process.env.NODE_ENV": '"development"' },
  plugins: [
    {
      name: "test-action-only",
      setup(b) {
        b.onResolve({ filter: /^\.\/actions$/ }, (a) =>
          a.importer.endsWith("WorkspaceEditor.tsx")
            ? { path: "action", namespace: "test" }
            : null,
        );
        b.onLoad({ filter: /.*/, namespace: "test" }, () => ({
          contents: `export async function saveVersion(previous,form){if(form.get('document_title')==='Simulasi gagal simpan')return {...previous,ok:false,message:'Penyimpanan belum berhasil. Isi kolom tetap tersedia; coba lagi.'};if(!form.get('document_title')||!form.get('risk_level'))throw Error('missing metadata');if(form.get('intent')==='submit'&&form.get('human_checked')!=='on')throw Error('missing attestation');return {versionId:'00000000-0000-0000-0000-000000000111',ok:true,message:form.get('intent')==='submit'?'Versi dikirim untuk persetujuan manusia.':'Draf versi baru tersimpan.'}}`,
          loader: "js",
        }));
      },
    },
  ],
});
const errors = [];
const vc = new VirtualConsole();
vc.on("jsdomError", (e) => errors.push(e.message));
vc.on("error", (...args) => errors.push(args.join(" ")));
const dom = new JSDOM(
  '<!DOCTYPE html><html><body><div id="root"></div></body></html>',
  {
    url: "http://localhost:3100",
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(w) {
      w.process = { env: { NODE_ENV: "development" } };
      w.fetch = async () => ({
        ok: true,
        json: async () => ({
          id: "00000000-0000-0000-0000-000000000222",
          output: "Usulan AI simulasi untuk dokumen praktik.",
        }),
      });
    },
  },
);
const w = dom.window,
  d = w.document;
w.eval(bundle.outputFiles[0].text);
const settle = () => new Promise((r) => setTimeout(r, 80));
await settle();
function button(text) {
  const el = [...d.querySelectorAll("button")].find((b) =>
    b.textContent.includes(text),
  );
  assert.ok(el, text);
  return el;
}
function fill(el, value) {
  Object.getOwnPropertyDescriptor(
    el.tagName === "TEXTAREA"
      ? w.HTMLTextAreaElement.prototype
      : w.HTMLInputElement.prototype,
    "value",
  ).set.call(el, value);
  el.dispatchEvent(new w.Event("input", { bubbles: true }));
}
assert.ok(d.body.textContent.includes("Dokumen dan acuan"));
assert.equal(button("Kirim untuk persetujuan").disabled, true);
assert.equal(button("Bantu dengan AI").disabled, true);
const brief = d.querySelector("#brief"),
  before = brief.value;
button("Tambahkan ke Memahami").click();
await settle();
assert.ok(brief.value.startsWith(before));
assert.ok(brief.value.includes("Fakta kasus:"));
d.querySelector("input[type=checkbox]").click();
await settle();
assert.equal(button("Bantu dengan AI").disabled, false);
button("Bantu dengan AI: Membuat draf").click();
await settle();
assert.equal(d.querySelector("#draft").value, "");
button("Gunakan usulan").click();
await settle();
assert.ok(d.querySelector("#draft").value.includes("Usulan AI"));
assert.ok(
  d.querySelector("input[name=generation_refs]").value.includes("000000000222"),
);
d.querySelector("input[name=human_checked]").click();
await settle();
assert.equal(button("Kirim untuk persetujuan").disabled, false);
fill(d.querySelector("#draft"), "Draf diubah oleh manusia");
await settle();
assert.equal(button("Kirim untuk persetujuan").disabled, true);
button("Simpan versi kerja").click();
await settle();
assert.ok(d.body.textContent.includes("Draf versi baru tersimpan."));
assert.equal(
  d.querySelector("input[name=parent_version_id]").value,
  "00000000-0000-0000-0000-000000000111",
);
assert.equal(d.querySelector("#draft").value, "Draf diubah oleh manusia");
fill(d.querySelector("input[name=document_title]"), "Simulasi gagal simpan");
await settle();
button("Simpan versi kerja").click();
await settle();
assert.ok(d.body.textContent.includes("Penyimpanan belum berhasil"));
assert.equal(d.querySelector("#draft").value, "Draf diubah oleh manusia");
assert.equal(
  d.querySelector("input[name=parent_version_id]").value,
  "00000000-0000-0000-0000-000000000111",
);
assert.deepEqual(errors, []);
w.close();
console.log(
  "PASS: DOM render, AI consent, template append, explicit AI application and provenance, reset attestation after edit, save updates parent version, failed save preserves work. Services stubbed; not a live browser test.",
);
