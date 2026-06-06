import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PreviewBulletList({
  items,
  large = false,
}: {
  items: string[];
  large?: boolean;
}) {
  const safeItems = items.length > 0 ? items : ["待补充"];

  return (
    <ul className="space-y-3">
      {safeItems.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/85 shadow-[0_0_0_4px_rgba(47,125,116,0.08)]" />
          <span className={cn("text-sm", large && "text-base")}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function PreviewPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-md border bg-muted/40 p-4 shadow-inner shadow-white/60">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}
