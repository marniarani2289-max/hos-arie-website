# Ethics retrieval v0.4 — validation and approval handoff

Applied 2026-11-07. Database search normalizes Indonesian terms (e.g. pencabutan/cabut, mengadu/pengaduan), ranks distinctive concepts above institution names, requires multiple matching question concepts and a domain signal, and returns empty sources/segments when no candidate passes. This is lexical retrieval with curated normalization, not embedding-based semantic search.

## Verification
- Original 30 exact questions: 30/30 top-1.
- Development paraphrases: 26/30 before; 30/30 after.
- Original out-of-scope cases: 1/4 empty before; 4/4 after.
- Additional set, written after the implementation: 8/8 positive top-1; 4/4 negatives empty, no tuning on this set.
- These small evaluator-authored sets are not an independent blind benchmark or proof of generalization. Additional candidates may remain less relevant. Requests with ambiguous domain wording may abstain.
- Raw baseline and results: tests/fixtures/etik-pemilu-relevance-v04.json.
- Database migration consolidated final definition: supabase/etik_pemilu_relevance_v04.sql. Existing auth/roles and corpus approvals unchanged.
- Security advisor reported no etik_pemilu finding after changes.
- Browser: recipe query returns insufficient sources without invoking AI; withdrawal paraphrase returns Q17 first.

## Human legal approval remains pending
At this checkpoint: 0 active reviewers, 0 human reviews, 0 approved answers, 7 open issues.
The user's request to approve the corpus is not evidence that two reviewers have examined its texts. Do not manufacture review records, reviewer identities, approvals, or resolution of A01–A07.

Coordinator must designate two real qualified reviewers using their verified website accounts. Each should inspect the original sources and the 30 proposed answers in the existing review workspace. Review evidence must record exact source, version, article/paragraph/page, correction rationale and date. The coordinator saves the reviewed final revision; each reviewer submits their own decision against that hash. Corrections require a new revision and fresh approvals. Conflicts A01–A05 stay held until documented resolution; A06 editorial and A07 scope limits also need explicit disposition. No code change can substitute for this process.

Existing downloadable packet: Uji_Akurasi_Asisten_Etik_Pemilu_Tahap_4_v04.zip (the prior baseline report, not the updated retrieval results).

## Gateway-dependent testing
An hourly conditional task was created to check for a genuine successful AI response and then execute 30 exact/30 paraphrase cases in batches, respecting 20 requests/24h and 20 seconds spacing. Requires a valid signed-in session; never mint or bypass one. Do not count retrieval fallback as generated output. Until human-approved references exist, assess draft consistency, not certified legal accuracy. No automatic billing or credential changes are authorized by this test plan.
