import type PptxGenJS from "pptxgenjs";

import type { AiImageSlideComponent } from "@/lib/types/slide";

type RenderAiImageInput = {
  component: AiImageSlideComponent;
  slide: PptxGenJS.Slide;
  rect: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
};

export function renderAiImageComponent({
  component,
  slide,
  rect,
}: RenderAiImageInput) {
  if (!component.data.imageUrl) {
    return;
  }

  const imageData = component.data.imageUrl.replace(/^data:/, "");

  slide.addImage({
    data: imageData,
    x: rect.x,
    y: rect.y,
    w: rect.w,
    h: rect.h,
    altText: component.data.alt,
  });
}
