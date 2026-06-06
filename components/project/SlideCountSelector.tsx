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
      <Label>页数</Label>
      <div className="grid grid-cols-4 gap-2">
        {SLIDE_COUNTS_BY_SCENARIO[scenario].map((count) => (
          <button
            key={count}
            type="button"
            onClick={() => onChange(count)}
            className={cn(
              "rounded-md border border-white/75 bg-white/[0.56] px-3 py-2 text-sm font-medium shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.78]",
              value === count &&
                "border-primary/35 bg-secondary/70 text-primary shadow-[inset_0_0_0_1px_rgba(100,125,115,0.2)]",
            )}
          >
            {count} 页
          </button>
        ))}
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
