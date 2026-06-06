import { getDefaultTemplateKey } from "@/lib/constants/templates";
import type {
  NewProjectFormValues,
  ProjectScenario,
  ProjectViewModel,
} from "@/lib/types/project";
import type {
  AiImageComponentRole,
  AiImageStylePreset,
  SlideComponent,
  SlideLayout,
  SlideViewModel,
} from "@/lib/types/slide";

const now = "2026-06-04T00:00:00.000Z";

export type ProjectDetailMock = {
  project: ProjectViewModel;
  slides: SlideViewModel[];
};

export function createMockProject(values: NewProjectFormValues) {
  const id = `demo-${values.scenario}-${Date.now().toString(36)}`;

  return {
    id,
    title: values.topic.trim() || defaultProjectTitle(values.scenario),
  };
}

export function getMockProject(projectId: string): ProjectDetailMock {
  const scenario: ProjectScenario = projectId.includes("business_plan")
    ? "business_plan"
    : "research_presentation";
  const title = defaultProjectTitle(scenario);
  const slides = scenario === "business_plan" ? businessSlides : researchSlides;

  return {
    project: {
      id: projectId,
      title,
      scenario,
      topic: title,
      sourceText: "",
      slideCount: slides.length,
      templateKey: getDefaultTemplateKey(scenario),
      status: "outline_ready",
      createdAt: now,
      updatedAt: now,
    },
    slides: slides.map((slide) => hydrateSlideDraft(slide, scenario, projectId)),
  };
}

function defaultProjectTitle(scenario: ProjectScenario) {
  return scenario === "business_plan"
    ? "AI 销售助手商业计划书"
    : "科研论文汇报 PPT";
}

type SlideLegacyContentDraft = {
  subtitle?: string;
  bullets?: string[];
  leftBullets?: string[];
  rightBullets?: string[];
  table?: string[][];
  chartData?: Array<{
    label: string;
    value: number;
  }>;
  timeline?: Array<{
    label: string;
    description: string;
  }>;
  teamMembers?: Array<{
    name: string;
    role: string;
  }>;
};

type SlideDraft = Omit<
  SlideViewModel,
  "projectId" | "createdAt" | "updatedAt" | "components"
> & {
  legacyContent: SlideLegacyContentDraft;
};

function hydrateSlideDraft(
  draft: SlideDraft,
  scenario: ProjectScenario,
  projectId: string,
): SlideViewModel {
  return {
    id: draft.id,
    order: draft.order,
    title: draft.title,
    layout: draft.layout,
    speakerNotes: draft.speakerNotes,
    projectId,
    components: buildSlideComponents(draft, scenario),
    createdAt: now,
    updatedAt: now,
  };
}

function buildSlideComponents(
  slide: SlideDraft,
  scenario: ProjectScenario,
): SlideComponent[] {
  const components: SlideComponent[] = [
    {
      id: `${slide.id}-title`,
      type: "text",
      name: "标题",
      role: "title",
      bounds: { x: 0.07, y: 0.1, width: 0.72, height: 0.14 },
      data: {
        text: slide.title,
        variant: "title",
      },
    },
  ];

  if (slide.legacyContent.subtitle) {
    components.push({
      id: `${slide.id}-subtitle`,
      type: "text",
      name: "副标题",
      role: "subtitle",
      bounds: { x: 0.07, y: 0.24, width: 0.64, height: 0.08 },
      data: {
        text: slide.legacyContent.subtitle,
        variant: "subtitle",
      },
    });
  }

  if (slide.legacyContent.bullets?.length) {
    components.push({
      id: `${slide.id}-bullets`,
      type: "bullets",
      name: "要点列表",
      role: "main_bullets",
      bounds: { x: 0.08, y: 0.4, width: 0.44, height: 0.44 },
      data: {
        items: slide.legacyContent.bullets,
      },
    });
  }

  if (slide.legacyContent.leftBullets?.length) {
    components.push({
      id: `${slide.id}-left-bullets`,
      type: "bullets",
      name: "左栏要点",
      role: "left_bullets",
      bounds: { x: 0.08, y: 0.4, width: 0.36, height: 0.44 },
      data: {
        items: slide.legacyContent.leftBullets,
      },
    });
  }

  if (slide.legacyContent.rightBullets?.length) {
    components.push({
      id: `${slide.id}-right-bullets`,
      type: "bullets",
      name: "右栏要点",
      role: "right_bullets",
      bounds: { x: 0.54, y: 0.4, width: 0.36, height: 0.44 },
      data: {
        items: slide.legacyContent.rightBullets,
      },
    });
  }

  if (slide.legacyContent.table?.length) {
    components.push({
      id: `${slide.id}-table`,
      type: "table",
      name: "表格",
      role: "table",
      bounds: { x: 0.08, y: 0.38, width: 0.72, height: 0.46 },
      data: {
        rows: slide.legacyContent.table,
      },
    });
  }

  if (slide.legacyContent.chartData?.length) {
    components.push({
      id: `${slide.id}-chart`,
      type: "chart",
      name: "可编辑图表",
      role: "chart",
      bounds: { x: 0.58, y: 0.38, width: 0.32, height: 0.46 },
      data: {
        data: slide.legacyContent.chartData,
      },
    });
  }

  if (slide.legacyContent.timeline?.length) {
    components.push({
      id: `${slide.id}-timeline`,
      type: "timeline",
      name: "时间线",
      role: "timeline",
      bounds: { x: 0.1, y: 0.38, width: 0.76, height: 0.44 },
      data: {
        items: slide.legacyContent.timeline,
      },
    });
  }

  if (slide.legacyContent.teamMembers?.length) {
    components.push({
      id: `${slide.id}-team`,
      type: "team",
      name: "团队/贡献卡片",
      role: "team",
      bounds: { x: 0.08, y: 0.4, width: 0.82, height: 0.36 },
      data: {
        members: slide.legacyContent.teamMembers,
      },
    });
  }

  const aiImageRole = getAiImageRole(slide.layout);

  if (aiImageRole) {
    components.push({
      id: `${slide.id}-ai-image`,
      type: "ai_image",
      name: getAiImageName(aiImageRole),
      role: aiImageRole,
      bounds: getAiImageBounds(slide.layout),
      data: {
        prompt: buildDefaultAiImagePrompt(slide, scenario, aiImageRole),
        revisedPrompt: "",
        status: "idle",
        imageUrl: "",
        aspectRatio: slide.layout === "cover" ? "16:9" : "4:3",
        stylePreset: getDefaultAiImageStyle(scenario, aiImageRole),
        alt: `${slide.title} 局部视觉组件`,
      },
    });
  }

  return components;
}

function getAiImageRole(layout: SlideLayout): AiImageComponentRole | null {
  if (layout === "cover") {
    return "cover_hero_image";
  }

  if (layout === "section") {
    return "section_visual";
  }

  if (layout === "title_bullets") {
    return "concept_illustration";
  }

  if (layout === "conclusion") {
    return "supporting_visual";
  }

  if (layout === "product") {
    return "product_mockup";
  }

  if (layout === "problem_solution") {
    return "concept_illustration";
  }

  return null;
}

function getAiImageName(role: AiImageComponentRole) {
  const labels: Record<AiImageComponentRole, string> = {
    cover_hero_image: "封面局部视觉",
    section_visual: "章节视觉",
    concept_illustration: "概念插图",
    product_mockup: "产品 Mockup",
    market_scene_illustration: "市场场景插图",
    supporting_visual: "辅助视觉",
    icon_style_illustration: "图标风插图",
  };

  return labels[role];
}

function getAiImageBounds(layout: SlideLayout) {
  if (layout === "cover") {
    return { x: 0.6, y: 0.18, width: 0.32, height: 0.5 };
  }

  if (layout === "section") {
    return { x: 0.62, y: 0.28, width: 0.26, height: 0.38 };
  }

  return { x: 0.58, y: 0.38, width: 0.32, height: 0.42 };
}

function getDefaultAiImageStyle(
  scenario: ProjectScenario,
  role: AiImageComponentRole,
): AiImageStylePreset {
  if (role === "product_mockup") {
    return "product_mockup";
  }

  if (role === "icon_style_illustration") {
    return "icon_style";
  }

  return scenario === "research_presentation"
    ? "academic_clean"
    : "business_clean";
}

function buildDefaultAiImagePrompt(
  slide: SlideDraft,
  scenario: ProjectScenario,
  role: AiImageComponentRole,
) {
  const scenarioText =
    scenario === "research_presentation"
      ? "科研论文汇报的专业局部视觉"
      : "商业计划书的清晰局部视觉";

  return `${scenarioText}，用于 ${slide.title}，类型：${getAiImageName(role)}。不要生成整页 PPT，不要包含标题或大段文字。`;
}

const researchSlides: SlideDraft[] = [
  {
    id: "cover",
    order: 1,
    title: "科研论文汇报 PPT",
    layout: "cover",
    legacyContent: {
      subtitle: "iMeta 自动生成结构化汇报",
      bullets: ["论文题目", "作者 / 汇报人", "单位 / 日期"],
    },
    speakerNotes: "开场介绍论文主题、汇报人和汇报目标。",
  },
  {
    id: "section",
    order: 2,
    title: "研究背景",
    layout: "section",
    legacyContent: {
      subtitle: "从问题、意义和研究动机展开",
      bullets: ["研究问题", "现实意义", "理论意义"],
    },
    speakerNotes: "解释为什么该问题值得研究。",
  },
  {
    id: "title-bullets",
    order: 3,
    title: "文献综述 / 相关研究",
    layout: "title_bullets",
    legacyContent: {
      subtitle: "已有研究与本文切入点",
      bullets: ["已有研究做了什么", "存在哪些不足", "本文切入点"],
    },
    speakerNotes: "概括研究脉络，避免罗列文献。",
  },
  {
    id: "two-columns",
    order: 4,
    title: "研究问题 / 研究假设",
    layout: "two_columns",
    legacyContent: {
      subtitle: "问题与目标对齐",
      leftBullets: ["核心问题", "研究假设"],
      rightBullets: ["研究目标", "预期贡献"],
    },
    speakerNotes: "说明研究问题如何推导出假设。",
  },
  {
    id: "table",
    order: 5,
    title: "数据与方法",
    layout: "table",
    legacyContent: {
      subtitle: "数据、样本、模型和变量",
      bullets: ["数据来源", "样本范围", "方法模型", "变量说明"],
      table: [
        ["模块", "内容"],
        ["数据来源", "待补充"],
        ["样本范围", "待补充"],
        ["方法模型", "待补充"],
      ],
    },
    speakerNotes: "交代数据可靠性和方法选择理由。",
  },
  {
    id: "chart",
    order: 6,
    title: "实证结果 / 实验结果",
    layout: "chart",
    legacyContent: {
      subtitle: "主要发现与关键图表",
      bullets: ["主要发现", "关键图表", "结果解释"],
      chartData: [
        { label: "发现 A", value: 48 },
        { label: "发现 B", value: 78 },
        { label: "发现 C", value: 60 },
      ],
    },
    speakerNotes: "围绕关键图表解释结果。",
  },
  {
    id: "timeline",
    order: 7,
    title: "进一步分析",
    layout: "timeline",
    legacyContent: {
      subtitle: "稳健性测试与补充结果",
      bullets: ["稳健性测试", "异质性分析", "补充结果"],
      timeline: [
        { label: "01", description: "稳健性测试" },
        { label: "02", description: "异质性分析" },
        { label: "03", description: "补充结果" },
      ],
    },
    speakerNotes: "说明结果是否稳健。",
  },
  {
    id: "team",
    order: 8,
    title: "贡献与作者分工",
    layout: "team",
    legacyContent: {
      subtitle: "研究贡献和协作角色",
      bullets: ["理论贡献", "方法贡献", "实践启示"],
      teamMembers: [
        { name: "贡献一", role: "理论贡献" },
        { name: "贡献二", role: "方法贡献" },
        { name: "贡献三", role: "实践启示" },
      ],
    },
    speakerNotes: "突出研究贡献和团队协作。",
  },
  {
    id: "conclusion",
    order: 9,
    title: "结论与启示",
    layout: "conclusion",
    legacyContent: {
      subtitle: "结论、贡献和局限",
      bullets: ["研究结论", "理论贡献", "实践启示", "未来方向"],
    },
    speakerNotes: "清晰收束结论。",
  },
  {
    id: "qna",
    order: 10,
    title: "Q&A",
    layout: "qna",
    legacyContent: {
      subtitle: "欢迎提问",
      bullets: ["欢迎提问", "谢谢观看"],
    },
    speakerNotes: "预留互动时间。",
  },
];

const businessSlides: SlideDraft[] = [
  {
    id: "cover",
    order: 1,
    title: "AI 销售助手商业计划书",
    layout: "cover",
    legacyContent: {
      subtitle: "用 AI 提升销售跟进效率",
      bullets: ["项目名称", "一句话介绍", "团队 / 日期"],
    },
    speakerNotes: "用一句话说明项目和目标客户。",
  },
  {
    id: "pain-opportunity",
    order: 2,
    title: "痛点与机会",
    layout: "problem_solution",
    legacyContent: {
      subtitle: "用户痛点、市场空白和时机",
      bullets: ["用户痛点", "市场空白", "为什么现在是机会"],
    },
    speakerNotes: "说明问题的强度和机会窗口。",
  },
  {
    id: "solution",
    order: 3,
    title: "解决方案",
    layout: "problem_solution",
    legacyContent: {
      subtitle: "产品服务与核心价值",
      leftBullets: ["产品/服务是什么", "如何解决问题"],
      rightBullets: ["核心价值", "待补充验证数据"],
    },
    speakerNotes: "将痛点和方案一一对应。",
  },
  {
    id: "product",
    order: 4,
    title: "产品展示",
    layout: "product",
    legacyContent: {
      subtitle: "核心功能、使用流程和截图占位",
      bullets: ["核心功能", "使用流程", "产品截图占位"],
    },
    speakerNotes: "展示最短使用路径。",
  },
  {
    id: "market",
    order: 5,
    title: "市场规模",
    layout: "chart",
    legacyContent: {
      subtitle: "TAM / SAM / SOM",
      bullets: ["目标市场", "TAM/SAM/SOM", "增长趋势"],
      chartData: [
        { label: "TAM", value: 88 },
        { label: "SAM", value: 56 },
        { label: "SOM", value: 28 },
      ],
    },
    speakerNotes: "若无真实数据，明确标注待补充。",
  },
  {
    id: "business-model",
    order: 6,
    title: "商业模式",
    layout: "table",
    legacyContent: {
      subtitle: "收入、定价和成本",
      bullets: ["收入来源", "定价方式", "成本结构"],
      table: [
        ["项目", "说明"],
        ["收入来源", "待补充"],
        ["定价方式", "待补充"],
        ["成本结构", "待补充"],
      ],
    },
    speakerNotes: "讲清楚如何持续赚钱。",
  },
  {
    id: "competition",
    order: 7,
    title: "竞争分析",
    layout: "two_columns",
    legacyContent: {
      subtitle: "竞品、差异化和壁垒",
      leftBullets: ["主要竞品", "竞品数据待补充"],
      rightBullets: ["差异化优势", "竞争壁垒"],
    },
    speakerNotes: "避免夸大竞品和壁垒。",
  },
  {
    id: "growth",
    order: 8,
    title: "增长策略",
    layout: "timeline",
    legacyContent: {
      subtitle: "获客渠道、推广方式和阶段目标",
      bullets: ["获客渠道", "推广方式", "阶段目标"],
      timeline: [
        { label: "01", description: "验证核心客户" },
        { label: "02", description: "建立获客渠道" },
        { label: "03", description: "扩大销售转化" },
      ],
    },
    speakerNotes: "按阶段说明增长动作。",
  },
  {
    id: "team",
    order: 9,
    title: "团队介绍",
    layout: "team",
    legacyContent: {
      subtitle: "成员、经验和分工",
      bullets: ["核心成员", "相关经验", "分工"],
      teamMembers: [
        { name: "成员 A", role: "待补充" },
        { name: "成员 B", role: "待补充" },
        { name: "成员 C", role: "待补充" },
      ],
    },
    speakerNotes: "突出与项目相关的经验。",
  },
  {
    id: "finance",
    order: 10,
    title: "财务预测 / 融资计划",
    layout: "table",
    legacyContent: {
      subtitle: "预测、金额和资金用途",
      bullets: ["收入预测", "成本预测", "融资金额", "资金用途"],
      table: [
        ["项目", "数值"],
        ["收入预测", "待补充"],
        ["融资金额", "待补充"],
        ["资金用途", "待补充"],
      ],
    },
    speakerNotes: "没有数据时不要编造金额。",
  },
  {
    id: "milestone",
    order: 11,
    title: "里程碑",
    layout: "timeline",
    legacyContent: {
      subtitle: "已完成进展与未来计划",
      bullets: ["已完成进展", "未来 6-12 个月计划"],
      timeline: [
        { label: "已完成", description: "待补充" },
        { label: "6 个月", description: "待补充" },
        { label: "12 个月", description: "待补充" },
      ],
    },
    speakerNotes: "用进度证明执行能力。",
  },
  {
    id: "ending",
    order: 12,
    title: "结束页",
    layout: "qna",
    legacyContent: {
      subtitle: "总结与联系方式",
      bullets: ["总结", "联系方式"],
    },
    speakerNotes: "收束价值并留下联系信息。",
  },
];
