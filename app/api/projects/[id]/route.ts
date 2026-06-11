import { NextResponse } from "next/server";

import { updateGeneratedProject } from "@/lib/server/projectStore";
import type { ProjectStatus } from "@/lib/types/project";
import type { SlideViewModel } from "@/lib/types/slide";

export const runtime = "nodejs";

const projectStatuses: ProjectStatus[] = [
  "draft",
  "outline_ready",
  "generating",
  "pptx_ready",
  "failed",
];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = (await request.json()) as {
    slides?: SlideViewModel[];
    status?: ProjectStatus;
  };
  const status = projectStatuses.includes(body.status as ProjectStatus)
    ? body.status
    : undefined;
  const updated = updateGeneratedProject(id, {
    slides: Array.isArray(body.slides) ? body.slides : undefined,
    status,
  });

  if (!updated) {
    return NextResponse.json({ error: "项目不存在" }, { status: 404 });
  }

  return NextResponse.json({
    project: updated.project,
    slides: updated.slides,
  });
}
