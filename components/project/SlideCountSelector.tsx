"use client";

import { Label } from "@/components/ui/label";
import { SLIDE_COUNTS_BY_SCENARIO } from "@/lib/constants/scenarios";
import type { ProjectScenario } from "@/lib/types/project";
import { cn } from "@/lib/utils";

type SlideCountSelectorProps = {
  scenario: ProjectScenario;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function SlideCountSelector({
  scenario,
  value,
  onChange,
  error,
}: SlideCountSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <Label>页数</Label>
        <span className="text-xs text-muted-foreground">篇幅节奏</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {SLIDE_COUNTS_BY_SCENARIO[scenario].map((count) => {
          const selected = value === count;

          return (
            <button
              key={count}
              type="button"
              onClick={() => onChange(count)}
              className={cn(
                "rounded-md border border-white/75 bg-white/[0.56] px-3 py-2 text-sm font-medium shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.78]",
                selected &&
                  "border-primary/35 bg-secondary/70 text-primary shadow-[inset_0_0_0_1px_rgba(100,125,115,0.2),0_12px_30px_rgba(64,58,50,0.08)]",
              )}
            >
              <span className="block">{count} 页</span>
              <span className="mt-1 block h-1 overflow-hidden rounded-full bg-white/70">
                <span
                  className={cn(
                    "block h-full rounded-full bg-primary transition-all duration-500",
                    selected ? "w-full" : "w-1/3 opacity-35",
                  )}
                />
              </span>
            </button>
          );
        })}
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
