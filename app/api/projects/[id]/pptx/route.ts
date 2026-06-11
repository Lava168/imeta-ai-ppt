import { NextResponse } from "next/server";

import { getMockProject } from "@/lib/api/projects";
import { exportComponentPptx } from "@/lib/ppt/renderSlideComponents";
import { getGeneratedProject } from "@/lib/server/projectStore";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const detail = getGeneratedProject(id) ?? getMockProject(id);
  const buffer = await exportComponentPptx({
    title: detail.project.title,
    templateKey: detail.project.templateKey,
    slides: detail.slides,
  });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(
        detail.project.title,
      )}.pptx"`,
    },
  });
}
