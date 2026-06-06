"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type BulletEditorProps = {
  id: string;
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
};

export function BulletEditor({ id, label, value, onChange }: BulletEditorProps) {
  return (
    <div className="space-y-2 rounded-md border border-white/70 bg-white/[0.45] p-3">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={value.join("\n")}
        onChange={(event) =>
          onChange(
            event.target.value
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean),
          )
        }
        rows={4}
      />
    </div>
  );
}
