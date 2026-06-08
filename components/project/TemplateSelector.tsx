"use client";

import { CheckCircle2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { TEMPLATE_OPTIONS_BY_SCENARIO } from "@/lib/constants/templates";
import type { ProjectScenario, TemplateKey } from "@/lib/types/project";
import { cn } from "@/lib/utils";

type TemplateSelectorProps = {
  scenario: ProjectScenario;
  value: TemplateKey;
  onChange: (value: TemplateKey) => void;
  error?: string;
};

export function TemplateSelector({
  scenario,
  value,
  onChange,
  error,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>模板风格</Label>
      <div className="grid gap-3 md:grid-cols-2">
        {TEMPLATE_OPTIONS_BY_SCENARIO[scenario].map((template) => {
          const selected = template.key === value;

          return (
            <button
              key={template.key}
              type="button"
              onClick={() => onChange(template.key)}
              className={cn(
                "motion-border premium-lift rounded-md bg-white/[0.48] p-3 text-left shadow-sm",
                selected &&
                  "bg-secondary/55 shadow-[0_18px_44px_rgba(64,58,50,0.09)]",
              )}
            >
              <TemplateSwatch templateKey={template.key} selected={selected} />
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{template.name}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                {selected ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                ) : null}
              </div>
            </button>
          );
        })}
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function TemplateSwatch({
  templateKey,
  selected,
}: {
  templateKey: TemplateKey;
  selected: boolean;
}) {
  const palettes: Record<TemplateKey, string> = {
    research_classic: "from-[#fbfaf7] via-[#dde5dd] to-[#d7dbe1]",
    research_modern: "from-[#f6f1e9] via-[#d9d0c4] to-[#d7dbe1]",
    business_clean: "from-[#fbfaf7] via-[#c8d3ca] to-[#ead8cf]",
    business_dark: "from-[#5f676d] via-[#758b7f] to-[#a88f82]",
  };
  const dark = templateKey === "business_dark";

  return (
    <div
      className={cn(
        "soft-shimmer aspect-[16/9] rounded-md border border-white/75 bg-gradient-to-br p-3",
        palettes[templateKey],
        selected && "atelier-glow",
      )}
    >
      <div
        className={cn(
          "h-1.5 w-12 rounded-sm",
          dark ? "bg-[#efe8dc]" : "bg-primary",
        )}
      />
      <div
        className={cn(
          "mt-6 h-4 w-2/3 rounded-sm",
          dark ? "bg-white/90" : "bg-foreground/90",
        )}
      />
      <div
        className={cn(
          "mt-3 h-2 w-1/2 rounded-sm",
          dark ? "bg-white/45" : "bg-[#c9b7a8]",
        )}
      />
      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className={cn("h-9 rounded-sm", dark ? "bg-white/10" : "bg-white/70")} />
        <div className={cn("h-9 rounded-sm", dark ? "bg-[#d9d0c4]/25" : "bg-[#d7dbe1]")} />
        <div className={cn("h-9 rounded-sm", dark ? "bg-[#ead8cf]/25" : "bg-[#ead8cf]")} />
      </div>
    </div>
  );
}
