import { NextResponse } from "next/server";

import { exportEditablePptx } from "@/lib/pptx/export-editable-pptx";
import { researchPaperOutline } from "@/lib/sample-outlines";

export const runtime = "nodejs";

export async function GET() {
  const buffer = await exportEditablePptx({
    title: "科研论文汇报 PPT Demo",
    scenarioLabel: "科研论文汇报",
    templateKey: "research_classic",
    sections: researchPaperOutline,
  });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "Content-Disposition":
        'attachment; filename="research-presentation-demo.pptx"',
    },
  });
}
