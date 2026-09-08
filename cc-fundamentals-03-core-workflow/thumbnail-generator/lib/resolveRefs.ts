import { CAPS, ROLES, TOTAL_CAP, type Role } from "@/lib/refs";

/**
 * Merges per-request uploads with saved persona and style images into one
 * cap-respecting reference set.
 *
 * Priority, highest first: per-request uploads, then persona images, then style
 * images. Over-supply degrades — extras are returned in `dropped` so the UI can
 * report them — because silently dropping a creator's references is the worst
 * outcome, and erroring makes a saved persona a liability rather than a feature.
 */
export function resolveRefs<T extends { role: Role }>(input: {
  uploads?: T[];
  persona?: T[];
  style?: T[];
}): { refs: T[]; dropped: T[] } {
  const buckets: Record<Role, T[]> = { character: [], object: [], style: [] };
  const dropped: T[] = [];
  let total = 0;

  const ordered = [
    ...(input.uploads ?? []),
    ...(input.persona ?? []),
    ...(input.style ?? []),
  ];

  for (const ref of ordered) {
    if (buckets[ref.role].length >= CAPS[ref.role] || total >= TOTAL_CAP) {
      dropped.push(ref);
      continue;
    }
    buckets[ref.role].push(ref);
    total++;
  }

  // Character refs first — identity anchors read strongest early in the parts array.
  return {
    refs: [...buckets.character, ...buckets.object, ...buckets.style],
    dropped,
  };
}

const ROLE_NOUNS: Record<Role, string> = {
  character: "face",
  object: "object",
  style: "style",
};

/** Non-blocking notices, one per role that lost references. */
export function describeDropped<T extends { role: Role }>(
  refs: T[],
  dropped: T[]
): string[] {
  return ROLES.flatMap((role) => {
    const lost = dropped.filter((ref) => ref.role === role).length;
    if (lost === 0) return [];
    const used = refs.filter((ref) => ref.role === role).length;
    return [
      `Using ${used} of ${used + lost} ${ROLE_NOUNS[role]} references — the model caps ${role} references at ${CAPS[role]}.`,
    ];
  });
}
