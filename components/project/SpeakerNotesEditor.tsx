"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SpeakerNotesEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SpeakerNotesEditor({
  value,
  onChange,
}: SpeakerNotesEditorProps) {
  return (
    <div className="space-y-2 rounded-md border border-white/70 bg-white/[0.45] p-3">
      <Label htmlFor="speakerNotes">演讲备注</Label>
      <Textarea
        id="speakerNotes"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
      />
    </div>
  );
}
