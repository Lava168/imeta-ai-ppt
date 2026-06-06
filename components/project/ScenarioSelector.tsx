"use client";

import { CheckCircle2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { SCENARIOS } from "@/lib/constants/scenarios";
import type { ProjectScenario } from "@/lib/types/project";
import { cn } from "@/lib/utils";

type ScenarioSelectorProps = {
  value: ProjectScenario;
  onChange: (value: ProjectScenario) => void;
  error?: string;
};

export function ScenarioSelector({
  value,
  onChange,
  error,
}: ScenarioSelectorProps) {
  return (
    <div className="space-y-3 md:col-span-2">
      <Label>生成类型</Label>
      <div className="grid gap-3 md:grid-cols-2">
        {SCENARIOS.map((scenario) => {
          const Icon = scenario.icon;
          const selected = scenario.value === value;

          return (
            <button
              key={scenario.value}
              type="button"
              onClick={() => onChange(scenario.value)}
              className={cn(
                "premium-lift rounded-md border border-white/75 bg-white/[0.54] p-4 text-left shadow-sm",
                selected &&
                  "border-primary/35 bg-secondary/55 shadow-[inset_0_0_0_1px_rgba(100,125,115,0.26),0_18px_40px_rgba(64,58,50,0.085)]",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-foreground/90 text-white">
                  <Icon className="h-4 w-4" />
                </span>
                {selected ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : null}
              </div>
              <p className="mt-4 text-base font-semibold">
                {scenario.shortLabel}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {scenario.description}
              </p>
            </button>
          );
        })}
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
