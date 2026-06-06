import type { ProjectScenario, TemplateKey } from "@/lib/types/project";

export const TEMPLATE_KEYS = [
  "research_classic",
  "research_modern",
  "business_clean",
  "business_dark",
] as const;

export type TemplateOption = {
  key: TemplateKey;
  name: string;
  scenario: ProjectScenario;
  scenarioLabel: string;
  description: string;
};

export const TEMPLATES: TemplateOption[] = [
  {
    key: "research_classic",
    name: "Research Classic",
    scenario: "research_presentation",
    scenarioLabel: "科研论文汇报",
    description: "稳重、清晰，适合论文答辩、组会和课程汇报。",
  },
  {
    key: "research_modern",
    name: "Research Modern",
    scenario: "research_presentation",
    scenarioLabel: "科研论文汇报",
    description: "更现代的学术风格，适合 AI、工程、交叉学科主题。",
  },
  {
    key: "business_clean",
    name: "Business Clean",
    scenario: "business_plan",
    scenarioLabel: "商业计划书",
    description: "简洁高效，适合 BP、路演和融资展示。",
  },
  {
    key: "business_dark",
    name: "Business Dark",
    scenario: "business_plan",
    scenarioLabel: "商业计划书",
    description: "深色商务风，适合科技产品和高对比数据展示。",
  },
];

export const TEMPLATE_OPTIONS_BY_SCENARIO: Record<
  ProjectScenario,
  TemplateOption[]
> = {
  research_presentation: TEMPLATES.filter(
    (template) => template.scenario === "research_presentation",
  ),
  business_plan: TEMPLATES.filter(
    (template) => template.scenario === "business_plan",
  ),
};

export function getDefaultTemplateKey(scenario: ProjectScenario): TemplateKey {
  return TEMPLATE_OPTIONS_BY_SCENARIO[scenario][0].key;
}
