export type Role = "character" | "object" | "style";

export const ROLES: Role[] = ["character", "object", "style"];
export const CAPS: Record<Role, number> = { character: 5, object: 6, style: 3 };
export const TOTAL_CAP = 14;

export function isRole(value: string): value is Role {
  return (ROLES as string[]).includes(value);
}

export class RefLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RefLimitError";
  }
}

/**
 * Character references are ordered first because identity anchors read
 * strongest early in the parts array.
 */
export function orderAndValidate<T extends { role: Role }>(refs: T[]): T[] {
  const counts: Record<Role, number> = { character: 0, object: 0, style: 0 };

  for (const ref of refs) {
    counts[ref.role]++;
    if (counts[ref.role] > CAPS[ref.role]) {
      throw new RefLimitError(
        `Too many ${ref.role} references (max ${CAPS[ref.role]}).`
      );
    }
  }

  if (refs.length > TOTAL_CAP) {
    throw new RefLimitError(`Too many reference images (max ${TOTAL_CAP} total).`);
  }

  return [
    ...refs.filter((r) => r.role === "character"),
    ...refs.filter((r) => r.role === "object"),
    ...refs.filter((r) => r.role === "style"),
  ];
}
