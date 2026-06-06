import { getBulletItems } from "@/lib/slideComponentAccessors";
import type { SlideViewModel } from "@/lib/types/slide";

export function SectionPreview({ slide }: { slide: SlideViewModel }) {
  const bullets = getBulletItems(slide, "main_bullets");

  return (
    <div className="grid h-full place-items-center rounded-md bg-secondary p-8 text-center">
      <p className="text-xl font-semibold text-secondary-foreground">
        {bullets[0] ?? "待补充"}
      </p>
    </div>
  );
}
