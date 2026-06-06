"use client";

import type { SlideViewModel } from "@/lib/types/slide";
import { cn } from "@/lib/utils";

type SlideListProps = {
  slides: SlideViewModel[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function SlideList({ slides, selectedId, onSelect }: SlideListProps) {
  return (
    <aside className="surface-panel rounded-md p-3 lg:sticky lg:top-24">
      <div className="mb-3 px-1">
        <p className="text-xs font-semibold uppercase text-primary">Slides</p>
        <p className="mt-1 text-xs text-muted-foreground">演示节奏</p>
      </div>
      <div className="space-y-2">
      {slides.map((slide) => (
        <button
          key={slide.id}
          type="button"
          onClick={() => onSelect(slide.id)}
          className={cn(
            "flex w-full gap-3 rounded-md border border-white/70 bg-white/[0.54] p-3 text-left text-sm shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/[0.82]",
            selectedId === slide.id &&
              "border-primary/35 bg-secondary/55 shadow-[inset_3px_0_0_rgba(100,125,115,0.45),0_12px_30px_rgba(64,58,50,0.08)]",
          )}
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-sm bg-white/[0.72] text-xs font-semibold text-primary shadow-sm">
            {slide.order}
          </span>
          <span className="line-clamp-2 pt-1">{slide.title}</span>
        </button>
      ))}
      </div>
    </aside>
  );
}
