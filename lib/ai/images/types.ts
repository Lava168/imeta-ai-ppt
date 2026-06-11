import type {
  AiImageAspectRatio,
  AiImageStylePreset,
} from "@/lib/types/slide";
import type { ProjectScenario } from "@/lib/types/project";

export type ComponentImageInput = {
  scenario: ProjectScenario;
  slideTitle: string;
  componentPrompt: string;
  stylePreset: AiImageStylePreset;
  aspectRatio: AiImageAspectRatio;
};

export type ComponentImageResult = {
  imageUrl: string;
  revisedPrompt: string;
};
