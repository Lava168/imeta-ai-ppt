import { PreviewBulletList } from "@/components/slides/layouts/PreviewHelpers";
import {
  getBulletItems,
  getChartComponent,
} from "@/lib/slideComponentAccessors";
import type { SlideViewModel } from "@/lib/types/slide";

export function ChartPreview({ slide }: { slide: SlideViewModel }) {
  const chartData = getChartComponent(slide)?.data.data ?? [
    { label: "A", value: 48 },
    { label: "B", value: 78 },
    { label: "C", value: 60 },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-[1fr_220px]">
      <PreviewBulletList items={getBulletItems(slide, "main_bullets")} />
      <div className="flex items-end gap-3 rounded-md border bg-muted/40 p-5">
        {chartData.map((item) => (
          <div key={item.label} className="flex flex-1 flex-col items-center">
            <div
              className="w-full rounded-t-sm bg-primary"
              style={{ height: Math.max(item.value, 16) }}
              aria-label={`${item.label} chart bar`}
            />
            <span className="mt-2 text-xs text-muted-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
