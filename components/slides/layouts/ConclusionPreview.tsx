import { PreviewBulletList } from "@/components/slides/layouts/PreviewHelpers";
import { getBulletItems } from "@/lib/slideComponentAccessors";
import type { SlideViewModel } from "@/lib/types/slide";

export function ConclusionPreview({ slide }: { slide: SlideViewModel }) {
  return <PreviewBulletList items={getBulletItems(slide, "main_bullets")} large />;
}
