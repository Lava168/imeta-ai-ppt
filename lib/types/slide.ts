export type SlideLayout =
  | "cover"
  | "section"
  | "title_bullets"
  | "two_columns"
  | "table"
  | "chart"
  | "timeline"
  | "team"
  | "conclusion"
  | "qna"
  | "product"
  | "problem_solution";

export type SlideComponentType =
  | "text"
  | "bullets"
  | "image"
  | "ai_image"
  | "table"
  | "chart"
  | "shape"
  | "timeline"
  | "team";

export type AiImageComponentRole =
  | "cover_hero_image"
  | "section_visual"
  | "concept_illustration"
  | "product_mockup"
  | "market_scene_illustration"
  | "supporting_visual"
  | "icon_style_illustration";

export type SlideComponentRole =
  | "title"
  | "subtitle"
  | "body"
  | "main_bullets"
  | "left_bullets"
  | "right_bullets"
  | "table"
  | "chart"
  | "shape"
  | "timeline"
  | "team"
  | AiImageComponentRole;

export type AiImageStatus = "idle" | "generating" | "ready" | "failed";

export type AiImageAspectRatio = "16:9" | "4:3" | "1:1" | "3:2";

export type AiImageStylePreset =
  | "academic_clean"
  | "academic_minimal"
  | "business_clean"
  | "business_dark"
  | "concept_line"
  | "product_mockup"
  | "icon_style";

export type SlideComponentBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type BaseSlideComponent<
  Type extends SlideComponentType,
  Data extends Record<string, unknown>,
> = {
  id: string;
  type: Type;
  name: string;
  role?: SlideComponentRole;
  bounds: SlideComponentBounds;
  data: Data;
};

export type TextSlideComponent = BaseSlideComponent<
  "text",
  {
    text: string;
    variant: "title" | "subtitle" | "body";
  }
>;

export type BulletsSlideComponent = BaseSlideComponent<
  "bullets",
  {
    items: string[];
  }
>;

export type ImageSlideComponent = BaseSlideComponent<
  "image",
  {
    imageUrl?: string;
    alt: string;
    aspectRatio?: AiImageAspectRatio;
  }
>;

export type AiImageSlideComponent = BaseSlideComponent<
  "ai_image",
  {
    prompt: string;
    revisedPrompt?: string;
    status: AiImageStatus;
    imageUrl?: string;
    aspectRatio: AiImageAspectRatio;
    stylePreset: AiImageStylePreset;
    alt: string;
  }
> & {
  role: AiImageComponentRole;
};

export type TableSlideComponent = BaseSlideComponent<
  "table",
  {
    rows: string[][];
  }
>;

export type ChartSlideComponent = BaseSlideComponent<
  "chart",
  {
    data: Array<{
      label: string;
      value: number;
    }>;
  }
>;

export type ShapeSlideComponent = BaseSlideComponent<
  "shape",
  {
    shape: "rect" | "line" | "circle";
    fill?: string;
    stroke?: string;
  }
>;

export type TimelineSlideComponent = BaseSlideComponent<
  "timeline",
  {
    items: Array<{
      label: string;
      description: string;
    }>;
  }
>;

export type TeamSlideComponent = BaseSlideComponent<
  "team",
  {
    members: Array<{
      name: string;
      role: string;
    }>;
  }
>;

export type SlideComponent =
  | TextSlideComponent
  | BulletsSlideComponent
  | ImageSlideComponent
  | AiImageSlideComponent
  | TableSlideComponent
  | ChartSlideComponent
  | ShapeSlideComponent
  | TimelineSlideComponent
  | TeamSlideComponent;

export type SlideViewModel = {
  id: string;
  projectId: string;
  order: number;
  title: string;
  layout: SlideLayout;
  components: SlideComponent[];
  speakerNotes: string;
  createdAt: string;
  updatedAt: string;
};

export function isAiImageComponent(
  component: SlideComponent,
): component is AiImageSlideComponent {
  return component.type === "ai_image";
}
