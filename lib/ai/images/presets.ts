import type { AiImageStylePreset } from "@/lib/types/slide";

export const imageStylePresetPrompts: Record<AiImageStylePreset, string> = {
  academic_clean:
    "academic, clean, minimal, professional, muted Morandi palette",
  academic_minimal:
    "academic minimalism, quiet layout, refined scientific visual language",
  business_clean:
    "clean business, startup pitch friendly, polished product storytelling",
  business_dark:
    "dark business presentation accent, premium technology visual",
  concept_line:
    "conceptual line illustration, simple geometry, no dense details",
  product_mockup:
    "product mockup style, interface preview, no readable fake UI text",
  icon_style:
    "icon-style illustration, simple object, centered, clean silhouette",
};
