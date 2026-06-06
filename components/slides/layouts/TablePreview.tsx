import { getBulletItems, getTableComponent } from "@/lib/slideComponentAccessors";
import type { SlideViewModel } from "@/lib/types/slide";

export function TablePreview({ slide }: { slide: SlideViewModel }) {
  const rows =
    getTableComponent(slide)?.data.rows ??
    getBulletItems(slide, "main_bullets").map((bullet, index) => [
      `${index + 1}`,
      bullet,
    ]);

  return (
    <div className="overflow-hidden rounded-md border text-sm">
      {rows.map((row, rowIndex) => (
        <div
          key={`${rowIndex}-${row.join("-")}`}
          className="grid grid-cols-2 border-b last:border-b-0"
        >
          {row.slice(0, 2).map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}-${cell}`}
              className="border-r p-3 last:border-r-0"
            >
              <span className={rowIndex === 0 ? "font-semibold" : ""}>
                {cell}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
