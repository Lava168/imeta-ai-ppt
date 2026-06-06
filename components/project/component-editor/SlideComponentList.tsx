"use client";

import type { SlideComponent } from "@/lib/types/slide";
import { cn } from "@/lib/utils";

const componentTypeLabels: Record<SlideComponent["type"], string> = {
  text: "文本",
  bullets: "要点",
  image: "图片",
  ai_image: "AI 图片",
  table: "表格",
  chart: "图表",
  shape: "形状",
  timeline: "时间线",
  team: "团队",
};

type SlideComponentListProps = {
  components: SlideComponent[];
  selectedComponentId: string;
  onSelect: (componentId: string) => void;
};

export function SlideComponentList({
  components,
  selectedComponentId,
  onSelect,
}: SlideComponentListProps) {
  return (
    <div className="space-y-2">
      {components.map((component) => (
        <button
          key={component.id}
          type="button"
          onClick={() => onSelect(component.id)}
          className={cn(
            "flex w-full items-center justify-between gap-3 rounded-md border border-white/70 bg-white/[0.54] px-3 py-2 text-left text-sm shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/[0.82]",
            selectedComponentId === component.id &&
              "border-primary/35 bg-secondary/55 shadow-[inset_3px_0_0_rgba(100,125,115,0.45)]",
          )}
        >
          <span className="min-w-0">
            <span className="block truncate font-medium">
              {component.name}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {componentTypeLabels[component.type]}
            </span>
          </span>
          <span className="rounded-sm bg-white/70 px-2 py-1 text-xs text-muted-foreground">
            {component.type}
          </span>
        </button>
      ))}
    </div>
  );
}
