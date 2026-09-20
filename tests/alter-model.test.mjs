import assert from "node:assert/strict";
import {
  emptyWorkspace,
  parseWorkspace,
  safeSourceUrl,
} from "../lib/alter/model.ts";
assert.ok(parseWorkspace(emptyWorkspace));
assert.equal(parseWorkspace(null), null);
assert.equal(
  parseWorkspace({
    ...emptyWorkspace,
    sources: [
      {
        id: "1",
        title: "x",
        url: "javascript:alert(1)",
        excerpt: "",
        reviewed: false,
      },
    ],
  }),
  null,
);
assert.equal(safeSourceUrl("https://example.org/book"), true);
assert.equal(safeSourceUrl("https://user:password@example.org"), false);
assert.equal(
  parseWorkspace({
    ...emptyWorkspace,
    tasks: [{ id: "1", title: "Practice", evidence: "", done: true }],
  }),
  null,
);
assert.ok(
  parseWorkspace({
    ...emptyWorkspace,
    tasks: [
      {
        id: "1",
        title: "Practice",
        evidence: "A concrete learning result",
        done: true,
      },
    ],
  }),
);
assert.equal(parseWorkspace({ ...emptyWorkspace, minutes: NaN }), null);
assert.equal(parseWorkspace({ ...emptyWorkspace, weeks: 13 }), null);
assert.equal(
  parseWorkspace({ ...emptyWorkspace, draft: "a".repeat(16001) }),
  null,
);
assert.equal(parseWorkspace({ ...emptyWorkspace, sources: [null] }), null);
console.log("ALTER: schema bounds, unsafe links and evidence gates passed");
