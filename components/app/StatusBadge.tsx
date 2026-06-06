import type { ProjectStatus } from "@/lib/types/project";
import { cn } from "@/lib/utils";

const statusLabels: Record<ProjectStatus, string> = {
  draft: "草稿",
  outline_ready: "大纲已生成",
  generating: "生成中",
  pptx_ready: "PPTX 已导出",
  failed: "失败",
};

const statusClasses: Record<ProjectStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  outline_ready: "bg-secondary text-secondary-foreground",
  generating: "bg-primary/10 text-primary",
  pptx_ready: "bg-emerald-50 text-emerald-700",
  failed: "bg-red-50 text-red-700",
};

type StatusBadgeProps = {
  status: ProjectStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2.5 py-1 text-xs font-medium",
        statusClasses[status],
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
