import {
  getBulletItems,
  getTimelineComponent,
} from "@/lib/slideComponentAccessors";
import type { SlideViewModel } from "@/lib/types/slide";

export function TimelinePreview({ slide }: { slide: SlideViewModel }) {
  const items =
    getTimelineComponent(slide)?.data.items ??
    getBulletItems(slide, "main_bullets").map((bullet, index) => ({
      label: `${index + 1}`,
      description: bullet,
    }));

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={`${item.label}-${item.description}`} className="flex items-center gap-3">
          <span className="grid h-8 min-w-8 place-items-center rounded-full bg-primary px-2 text-sm font-semibold text-primary-foreground">
            {item.label}
          </span>
          <span className="text-sm">{item.description}</span>
        </div>
      ))}
    </div>
  );
}
