"use client";

import { Download, FileDown, Save, Sparkles } from "lucide-react";

import { StatusBadge } from "@/components/app/StatusBadge";
import { Button } from "@/components/ui/button";
import type { ProjectStatus } from "@/lib/types/project";

type ProjectToolbarProps = {
  projectId: string;
  title: string;
  status: ProjectStatus;
  exported: boolean;
  onGenerateOutline: () => void;
  onSave: () => void;
  onExport: () => void;
  busy?: boolean;
};

export function ProjectToolbar({
  projectId,
  title,
  status,
  exported,
  onGenerateOutline,
  onSave,
  onExport,
  busy = false,
}: ProjectToolbarProps) {
  return (
    <header className="border-b border-white/70 bg-white/[0.62] px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Project · {projectId}</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-normal">{title}</h1>
            <StatusBadge status={status} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={onGenerateOutline}>
            <Sparkles className="mr-2 h-4 w-4" />
            大纲
          </Button>
          <Button type="button" variant="secondary" onClick={onSave} disabled={busy}>
            <Save className="mr-2 h-4 w-4" />
            {busy ? "保存中" : "保存"}
          </Button>
          <Button type="button" onClick={onExport} disabled={busy}>
            <FileDown className="mr-2 h-4 w-4" />
            导出 PPTX
          </Button>
          {exported ? (
            <Button asChild type="button" variant="outline">
              <a href={`/api/projects/${projectId}/pptx`}>
                <Download className="mr-2 h-4 w-4" />
                下载 PPTX
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
