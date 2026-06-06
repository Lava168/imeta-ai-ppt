import { BookOpenText, Building2 } from "lucide-react";

import type { ProjectScenario } from "@/lib/types/project";

export const PROJECT_SCENARIOS = [
  "research_presentation",
  "business_plan",
] as const;

export const SCENARIOS: Array<{
  value: ProjectScenario;
  label: string;
  shortLabel: string;
  description: string;
  ctaLabel: string;
  href: string;
  icon: typeof BookOpenText;
}> = [
  {
    value: "research_presentation",
    label: "科研论文汇报 PPT",
    shortLabel: "科研论文汇报",
    description: "上传论文或研究资料，生成答辩、组会、课程汇报 PPT",
    ctaLabel: "创建科研汇报",
    href: "/projects/new?scenario=research_presentation",
    icon: BookOpenText,
  },
  {
    value: "business_plan",
    label: "商业计划书 PPT",
    shortLabel: "商业计划书",
    description: "输入项目资料，生成 BP、路演、融资展示 PPT",
    ctaLabel: "创建商业计划书",
    href: "/projects/new?scenario=business_plan",
    icon: Building2,
  },
];

export const SCENARIO_LABELS: Record<ProjectScenario, string> = {
  research_presentation: "科研论文汇报",
  business_plan: "商业计划书",
};

export const SLIDE_COUNTS_BY_SCENARIO: Record<ProjectScenario, string[]> = {
  research_presentation: ["8", "10", "12", "15"],
  business_plan: ["10", "12", "15"],
};

export const TOPIC_PLACEHOLDERS: Record<ProjectScenario, string> = {
  research_presentation: "例如：多模态大模型在医学影像诊断中的应用",
  business_plan: "例如：AI 销售助手商业计划书",
};

export const SOURCE_PLACEHOLDERS: Record<ProjectScenario, string> = {
  research_presentation:
    "可以粘贴论文摘要、研究问题、方法、数据、结果等内容。",
  business_plan: "可以粘贴项目介绍、市场资料、商业模式、团队和财务信息。",
};

export function normalizeScenario(value: string | null): ProjectScenario {
  return value === "business_plan" ? "business_plan" : "research_presentation";
}

export function getDefaultSlideCount(scenario: ProjectScenario) {
  return SLIDE_COUNTS_BY_SCENARIO[scenario][1];
}
