import { CheckCircle2 } from "lucide-react";

import { getBulletItems, getTeamComponent } from "@/lib/slideComponentAccessors";
import type { SlideViewModel } from "@/lib/types/slide";

export function TeamPreview({ slide }: { slide: SlideViewModel }) {
  const members =
    getTeamComponent(slide)?.data.members ??
    getBulletItems(slide, "main_bullets").slice(0, 3).map((bullet) => ({
      name: bullet,
      role: "待补充",
    }));

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {members.slice(0, 3).map((member) => (
        <div key={member.name} className="rounded-md border bg-muted/40 p-4">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <p className="mt-3 text-sm font-medium">{member.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
        </div>
      ))}
    </div>
  );
}
