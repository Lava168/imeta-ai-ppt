"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TEMPLATE_OPTIONS_BY_SCENARIO } from "@/lib/constants/templates";
import type { ProjectScenario, TemplateKey } from "@/lib/types/project";

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
    <div className="space-y-2">
      <Label>模板风格</Label>
      <Select
        value={value}
        onValueChange={(nextValue) => onChange(nextValue as TemplateKey)}
      >
        <SelectTrigger>
          <SelectValue placeholder="选择模板" />
        </SelectTrigger>
        <SelectContent>
          {TEMPLATE_OPTIONS_BY_SCENARIO[scenario].map((template) => (
            <SelectItem key={template.key} value={template.key}>
              {template.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
