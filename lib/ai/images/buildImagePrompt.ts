import { imageStylePresetPrompts } from "@/lib/ai/images/presets";
import type { ComponentImageInput } from "@/lib/ai/images/types";

export function buildImagePrompt(input: ComponentImageInput) {
  const scenarioInstruction =
    input.scenario === "research_presentation"
      ? "For a research presentation: academic, clean, minimal, professional. Do not invent specific experiment results, sample sizes, model names, or medical claims."
      : "For a business plan: clean business, startup pitch friendly. Do not invent market size, financial numbers, competitors, or funding amounts.";

  return `
Create a single component visual for one PPT slide.
This must NOT be a full PPT slide.
No slide title, no bullet list, no large text blocks, no fake charts with precise numbers.
The visual will be inserted as a local image component while titles, bullets, tables, charts, and shapes remain editable PowerPoint elements.

Scenario:
${scenarioInstruction}

Slide title:
${input.slideTitle}

Component visual prompt:
${input.componentPrompt}

Style:
${imageStylePresetPrompts[input.stylePreset]}

Aspect ratio:
${input.aspectRatio}
  `.trim();
}
