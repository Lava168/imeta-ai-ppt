import { NextResponse } from "next/server";

import { generateComponentImage } from "@/lib/ai/images/generateComponentImage";
import {
  findComponent,
  patchStoredComponent,
} from "@/lib/server/projectStore";
import { isAiImageComponent } from "@/lib/types/slide";

export const runtime = "nodejs";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ componentId: string }> },
) {
  const { componentId } = await params;
  const found = findComponent(componentId);

  if (!found || !isAiImageComponent(found.component)) {
    return NextResponse.json({ error: "AI 图片组件不存在" }, { status: 404 });
  }

  patchStoredComponent(componentId, {
    data: {
      ...found.component.data,
      status: "generating",
    },
  });

  try {
    const result = await generateComponentImage({
      scenario: found.detail.project.scenario,
      slideTitle: found.slide.title,
      componentPrompt: found.component.data.prompt,
      stylePreset: found.component.data.stylePreset,
      aspectRatio: found.component.data.aspectRatio,
    });
    const updated = patchStoredComponent(componentId, {
      data: {
        ...found.component.data,
        imageUrl: result.imageUrl,
        revisedPrompt: result.revisedPrompt,
        status: "ready",
      },
    });

    return NextResponse.json({ component: updated?.component });
  } catch (error) {
    const updated = patchStoredComponent(componentId, {
      data: {
        ...found.component.data,
        status: "failed",
      },
    });

    return NextResponse.json(
      {
        component: updated?.component,
        error: error instanceof Error ? error.message : "图片生成失败",
      },
      { status: 500 },
    );
  }
}
