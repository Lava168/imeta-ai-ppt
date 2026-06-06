import {
  PreviewBulletList,
  PreviewPanel,
} from "@/components/slides/layouts/PreviewHelpers";
import { getBulletItems } from "@/lib/slideComponentAccessors";
import type { SlideViewModel } from "@/lib/types/slide";

export function TwoColumnsPreview({ slide }: { slide: SlideViewModel }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <PreviewPanel title="左栏">
        <PreviewBulletList items={getBulletItems(slide, "left_bullets")} />
      </PreviewPanel>
      <PreviewPanel title="右栏">
        <PreviewBulletList items={getBulletItems(slide, "right_bullets")} />
      </PreviewPanel>
    </div>
  );
}
