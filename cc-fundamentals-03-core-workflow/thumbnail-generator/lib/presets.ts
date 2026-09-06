export type Preset = {
  id: string;
  name: string;
  description: string;
  fragment: string;
};

export const PRESETS: Preset[] = [
  {
    id: "high-energy",
    name: "High Energy",
    description: "Saturated colours, big reaction, maximum contrast.",
    fragment:
      "Explosive high-energy YouTube thumbnail. Subject front and centre with an exaggerated surprised or excited expression, mouth open. Hyper-saturated complementary colours, strong rim lighting, heavy subject-to-background separation with a subtle outer glow. Busy but readable background with motion streaks or a burst pattern. Extreme contrast so it pops at small sizes.",
  },
  {
    id: "clean-tutorial",
    name: "Clean Tech Tutorial",
    description: "Calm, professional, uncluttered. Good for how-to content.",
    fragment:
      "Clean, modern tech tutorial thumbnail. Subject on one third of the frame, relaxed confident expression, soft key light. Uncluttered background using a flat colour or a subtle gradient with a faint grid or code motif. Generous negative space on the opposite third reserved for the headline. Restrained, professional palette.",
  },
  {
    id: "podcast",
    name: "Podcast / Interview",
    description: "Two-shot framing for conversations and guests.",
    fragment:
      "Podcast or interview thumbnail. Subjects framed as a balanced two-shot facing the viewer, warm studio lighting with visible practical lights or a soft bokeh background. Cinematic colour grade with deep shadows. Space across the lower third for the headline.",
  },
  {
    id: "vlog",
    name: "Vlog / Lifestyle",
    description: "Warm, candid, location-led.",
    fragment:
      "Lifestyle vlog thumbnail. Subject candid and mid-motion in an appealing real-world location, natural golden-hour light, shallow depth of field. Warm authentic colour grade, slightly desaturated shadows. The location reads clearly as a place worth watching.",
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Neon, dramatic, high-stakes.",
    fragment:
      "Gaming thumbnail. Subject reacting dramatically in the foreground, lit by cool neon rim light against a dark high-contrast background. Vivid magenta and cyan accents, glowing edges, subtle particle effects and depth haze. Cinematic and high stakes.",
  },
];

export const DEFAULT_PRESET_ID = "clean-tutorial";

export function getPreset(id: string): Preset {
  return PRESETS.find((p) => p.id === id) ?? PRESETS.find((p) => p.id === DEFAULT_PRESET_ID)!;
}
