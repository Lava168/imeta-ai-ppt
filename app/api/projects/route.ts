import { NextResponse } from "next/server";

import { buildProjectFromOutline } from "@/lib/api/projects";
import { PROJECT_SCENARIOS } from "@/lib/constants/scenarios";
import { TEMPLATE_KEYS } from "@/lib/constants/templates";
import { generateOutline } from "@/lib/server/outlineGenerator";
import { saveGeneratedProject } from "@/lib/server/projectStore";
import type { ProjectScenario, TemplateKey } from "@/lib/types/project";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const scenario = parseScenario(formData.get("scenario"));
    const topic = String(formData.get("topic") ?? "").trim();
    const sourceText = await readSourceText(formData);
    const slideCount = parseSlideCount(formData.get("slideCount"), scenario);
    const templateKey = parseTemplateKey(formData.get("templateKey"), scenario);

    if (!topic) {
      return NextResponse.json({ error: "请输入主题" }, { status: 400 });
    }

    const outline = await generateOutline({
      scenario,
      topic,
      sourceText,
      slideCount,
      templateKey,
    });
    const id = `generated-${scenario}-${Date.now().toString(36)}`;
    const detail = saveGeneratedProject(
      buildProjectFromOutline({
        id,
        scenario,
        sourceText,
        templateKey,
        outline,
      }),
    );

    return NextResponse.json({
      id: detail.project.id,
      title: detail.project.title,
      scenario: detail.project.scenario,
      status: detail.project.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "生成失败",
      },
      { status: 500 },
    );
  }
}

function parseScenario(value: FormDataEntryValue | null): ProjectScenario {
  return PROJECT_SCENARIOS.includes(value as ProjectScenario)
    ? (value as ProjectScenario)
    : "research_presentation";
}

function parseTemplateKey(
  value: FormDataEntryValue | null,
  scenario: ProjectScenario,
): TemplateKey {
  const fallback =
    scenario === "business_plan" ? "business_clean" : "research_classic";

  return TEMPLATE_KEYS.includes(value as TemplateKey)
    ? (value as TemplateKey)
    : fallback;
}

function parseSlideCount(
  value: FormDataEntryValue | null,
  scenario: ProjectScenario,
) {
  const parsed = Number(value);

  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed;
  }

  return scenario === "business_plan" ? 12 : 10;
}

async function readSourceText(formData: FormData) {
  const rawSourceText = String(formData.get("sourceText") ?? "").trim();
  const file = formData.get("uploadFile");

  if (!(file instanceof File) || file.size === 0) {
    return rawSourceText;
  }

  const filename = file.name.toLowerCase();

  if (!filename.endsWith(".txt") && !filename.endsWith(".md")) {
    throw new Error("当前仅支持 txt / md 文件");
  }

  const fileText = (await file.text()).trim();

  return [rawSourceText, fileText].filter(Boolean).join("\n\n");
}
