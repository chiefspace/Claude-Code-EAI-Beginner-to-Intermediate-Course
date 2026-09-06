import { describe, expect, it } from "vitest";
import { CAPS, orderAndValidate, RefLimitError, TOTAL_CAP, type Role } from "@/lib/refs";

const ref = (role: Role, id: string = role) => ({ role, id });
const many = (role: Role, n: number) =>
  Array.from({ length: n }, (_, i) => ref(role, `${role}-${i}`));

describe("orderAndValidate", () => {
  it("accepts exactly the cap for each role", () => {
    for (const role of Object.keys(CAPS) as Role[]) {
      expect(() => orderAndValidate(many(role, CAPS[role]))).not.toThrow();
    }
  });

  it("rejects one over the cap for each role", () => {
    for (const role of Object.keys(CAPS) as Role[]) {
      expect(() => orderAndValidate(many(role, CAPS[role] + 1))).toThrow(RefLimitError);
      expect(() => orderAndValidate(many(role, CAPS[role] + 1))).toThrow(
        `max ${CAPS[role]}`
      );
    }
  });

  it("accepts a full 14-reference set at every per-role cap", () => {
    const full = [...many("character", 5), ...many("object", 6), ...many("style", 3)];
    expect(full).toHaveLength(TOTAL_CAP);
    expect(orderAndValidate(full)).toHaveLength(TOTAL_CAP);
  });

  it("orders character references first, then objects, then styles", () => {
    const mixed = [ref("style"), ref("object"), ref("character")];
    expect(orderAndValidate(mixed).map((r) => r.role)).toEqual([
      "character",
      "object",
      "style",
    ]);
  });

  it("preserves relative order within a role", () => {
    const result = orderAndValidate(many("object", 3));
    expect(result.map((r) => r.id)).toEqual(["object-0", "object-1", "object-2"]);
  });

  it("accepts an empty set", () => {
    expect(orderAndValidate([])).toEqual([]);
  });
});
