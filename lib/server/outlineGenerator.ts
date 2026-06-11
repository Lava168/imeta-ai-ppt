import OpenAI from "openai";

import { buildBusinessPlanPrompt } from "@/lib/ai/prompts/businessPlan";
import { buildResearchPresentationPrompt } from "@/lib/ai/prompts/researchPresentation";
import type {
  GeneratedOutline,
  GeneratedOutlineSection,
  OutlinePromptInput,
} from "@/lib/ai/prompts/types";
import {
  businessPlanOutline,
  researchPaperOutline,
  type OutlineSection,
} from "@/lib/sample-outlines";
import type { ProjectScenario } from "@/lib/types/project";

type GenerateOutlineInput = OutlinePromptInput & {
  scenario: ProjectScenario;
};

const fallbackSections: Record<ProjectScenario, OutlineSection[]> = {
  research_presentation: researchPaperOutline,
  business_plan: businessPlanOutline,
};

export async function generateOutline(input: GenerateOutlineInput) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey.includes("your-api-key")) {
    return buildFallbackOutline(input);
  }

  try {
    const prompt =
      input.scenario === "business_plan"
        ? buildBusinessPlanPrompt(input)
        : buildResearchPresentationPrompt(input);
    const client = new OpenAI({ apiKey });
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_OUTLINE_MODEL || "gpt-4o-mini",
      messages: prompt.messages,
      response_format: prompt.responseFormat,
      temperature: 0.35,
    });
    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return buildFallbackOutline(input);
    }

    return normalizeOutline(JSON.parse(content), input);
  } catch {
    return buildFallbackOutline(input);
  }
}

function normalizeOutline(raw: unknown, input: GenerateOutlineInput): GeneratedOutline {
  const value = raw as Partial<GeneratedOutline>;
  const sections = Array.isArray(value.sections)
    ? value.sections.map((section, index) =>
        normalizeSection(section as Partial<GeneratedOutlineSection>, index),
      )
    : [];
  const safeSections = sections.length > 0 ? sections : buildFallbackOutline(input).sections;

  return {
    title: safeText(value.title, input.topic || defaultTitle(input.scenario)),
    scenario: input.scenario,
    language: "zh-CN",
    sections: safeSections.slice(0, Math.max(input.slideCount, safeSections.length)),
  };
}

function normalizeSection(
  section: Partial<GeneratedOutlineSection>,
  index: number,
): GeneratedOutlineSection {
  const title = safeText(section.title, `第 ${index + 1} 部分`);
  const bullets = Array.isArray(section.bullets)
    ? section.bullets
        .map((bullet) => safeText(bullet, "待补充"))
        .filter(Boolean)
        .slice(0, 5)
    : ["待补充"];

  return {
    id: safeId(section.id, title, index),
    title,
    subtitle: section.subtitle ? safeText(section.subtitle, "") : undefined,
    bullets: bullets.length > 0 ? bullets : ["待补充"],
    speakerNotes: safeText(section.speakerNotes, "待补充"),
  };
}

function buildFallbackOutline(input: GenerateOutlineInput): GeneratedOutline {
  const base = fallbackSections[input.scenario];
  const sourceHints = extractSourceHints(input.sourceText);

  return {
    title: input.topic || defaultTitle(input.scenario),
    scenario: input.scenario,
    language: "zh-CN",
    sections: base.map((section, index) => ({
      id: section.id,
      title: index === 0 ? input.topic || section.title : section.title,
      subtitle: buildFallbackSubtitle(input.scenario, section.title),
      bullets: enrichBullets(section.bullets, sourceHints).slice(0, 5),
      speakerNotes: section.speakerNotes,
    })),
  };
}

function enrichBullets(bullets: string[], sourceHints: string[]) {
  if (sourceHints.length === 0) {
    return bullets;
  }

  return bullets.map((bullet, index) => sourceHints[index] || bullet);
}

function extractSourceHints(sourceText?: string) {
  if (!sourceText?.trim()) {
    return [];
  }

  return sourceText
    .split(/[\n。；;]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => (item.length > 30 ? `${item.slice(0, 30)}…` : item))
    .slice(0, 5);
}

function buildFallbackSubtitle(scenario: ProjectScenario, title: string) {
  if (scenario === "research_presentation") {
    return title === "Q&A" ? "欢迎交流与讨论" : "基于资料自动整理，缺失信息标记待补充";
  }

  return title === "结束页" ? "总结与联系方式" : "面向路演沟通的结构化表达";
}

function defaultTitle(scenario: ProjectScenario) {
  return scenario === "business_plan" ? "商业计划书" : "科研论文汇报";
}

function safeText(value: unknown, fallback: string) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function safeId(value: unknown, title: string, index: number) {
  if (typeof value === "string" && /^[a-z0-9-_]+$/i.test(value)) {
    return value;
  }

  return `section-${index + 1}-${title.length}`;
}
