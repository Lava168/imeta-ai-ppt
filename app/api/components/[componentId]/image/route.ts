import { NextResponse } from "next/server";

import { findComponent, patchStoredComponent } from "@/lib/server/projectStore";
import { isAiImageComponent } from "@/lib/types/slide";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ componentId: string }> },
) {
  const { componentId } = await params;
  const found = findComponent(componentId);

  if (!found || !isAiImageComponent(found.component)) {
    return NextResponse.json({ error: "AI 图片组件不存在" }, { status: 404 });
  }

  const updated = patchStoredComponent(componentId, {
    data: {
      ...found.component.data,
      imageUrl: "",
      revisedPrompt: "",
      status: "idle",
    },
  });

  return NextResponse.json({ component: updated?.component });
}
