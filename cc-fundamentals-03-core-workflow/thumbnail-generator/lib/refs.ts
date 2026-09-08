export type Role = "character" | "object" | "style";

export const ROLES: Role[] = ["character", "object", "style"];
export const CAPS: Record<Role, number> = { character: 5, object: 6, style: 3 };
export const TOTAL_CAP = 14;

export function isRole(value: string): value is Role {
  return (ROLES as string[]).includes(value);
}
