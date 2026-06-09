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
  if (projectId === "example-research-medical-ai") {
    return buildExampleResearchMedicalProject(projectId);
  }

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

function buildExampleResearchMedicalProject(
  projectId: string,
): ProjectDetailMock {
  const title = "多模态大模型在医学影像诊断中的应用";
  const slides = exampleResearchMedicalSlides;

  return {
    project: {
      id: projectId,
      title,
      scenario: "research_presentation",
      topic: title,
      sourceText:
        "示例资料：本汇报围绕多模态大模型在医学影像诊断中的应用展开，重点讨论研究背景、相关工作、方法框架、数据与评估、结果解读、局限与未来方向。由于未提供真实论文全文，具体样本数量、模型名称和实验结果均以待补充标记呈现。",
      slideCount: slides.length,
      templateKey: "research_modern",
      status: "outline_ready",
      createdAt: now,
      updatedAt: now,
    },
    slides: slides.map((slide) =>
      hydrateSlideDraft(slide, "research_presentation", projectId),
    ),
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

const exampleResearchMedicalSlides: SlideDraft[] = [
  {
    id: "medical-cover",
    order: 1,
    title: "多模态大模型在医学影像诊断中的应用",
    layout: "cover",
    legacyContent: {
      subtitle: "科研论文汇报示例 · 可编辑 PPTX 工作流",
      bullets: ["汇报人：待补充", "单位：待补充", "日期：待补充"],
    },
    speakerNotes:
      "开场说明本次汇报聚焦医学影像诊断中的多模态大模型应用。由于当前是示例资料，真实作者、单位、数据规模和论文结果需要在正式资料中补充。",
  },
  {
    id: "medical-background",
    order: 2,
    title: "研究背景",
    layout: "section",
    legacyContent: {
      subtitle: "医学影像诊断正在进入多模态协同阶段",
      bullets: [
        "影像诊断依赖专业经验",
        "单一模态信息存在局限",
        "临床文本可补充上下文",
        "AI 辅助需强调可靠性",
      ],
    },
    speakerNotes:
      "这一页用于解释研究动机：医学影像诊断不仅依赖图像本身，也受到病史、报告文本和临床指标影响。多模态模型的价值在于整合这些信息，但医疗场景对可靠性和可解释性要求很高。",
  },
  {
    id: "medical-literature",
    order: 3,
    title: "文献综述 / 相关研究",
    layout: "title_bullets",
    legacyContent: {
      subtitle: "从影像模型到视觉语言模型",
      bullets: [
        "CNN 已广泛用于影像分类",
        "Transformer 提升全局建模",
        "视觉语言模型连接图文信息",
        "医学领域仍需专门适配",
        "真实临床验证仍待补充",
      ],
    },
    speakerNotes:
      "不要把相关工作讲成论文罗列。建议按技术演进讲：传统影像模型、Transformer、视觉语言模型，再落到医学场景的适配问题。",
  },
  {
    id: "medical-question",
    order: 4,
    title: "研究问题 / 研究假设",
    layout: "two_columns",
    legacyContent: {
      subtitle: "模型能力与临床可用性如何同时提升",
      leftBullets: [
        "如何融合影像与文本信息",
        "如何减少诊断不确定性",
        "如何解释模型判断依据",
      ],
      rightBullets: [
        "多模态融合可提升表现",
        "注意力区域有助解释",
        "真实临床收益待验证",
      ],
    },
    speakerNotes:
      "这一页要明确研究问题和假设。由于没有真实论文全文，不能声称模型已经显著提升诊断准确率，只能把它作为研究假设或待验证目标。",
  },
  {
    id: "medical-method",
    order: 5,
    title: "数据与方法",
    layout: "table",
    legacyContent: {
      subtitle: "数据、模态、模型和评估指标",
      bullets: ["影像数据：待补充", "文本数据：待补充", "模型结构：待补充"],
      table: [
        ["模块", "示例内容"],
        ["影像模态", "CT / MRI / X-ray 待补充"],
        ["文本模态", "报告文本 / 病史 待补充"],
        ["模型框架", "视觉编码器 + 语言模型 待补充"],
        ["评估指标", "AUC / F1 / 敏感性 待补充"],
      ],
    },
    speakerNotes:
      "这里要特别避免编造样本数量、数据集名称和模型名称。正式接入论文全文后，这些字段应该由 AI 从资料中提取；资料缺失时保留待补充。",
  },
  {
    id: "medical-results",
    order: 6,
    title: "实验结果 / 实证结果",
    layout: "chart",
    legacyContent: {
      subtitle: "结果图表占位，等待真实实验数据",
      bullets: [
        "主要发现：待补充",
        "对比基线：待补充",
        "统计显著性：待补充",
        "错误案例：建议补充",
      ],
      chartData: [
        { label: "Baseline", value: 42 },
        { label: "Model", value: 64 },
        { label: "Ablation", value: 52 },
      ],
    },
    speakerNotes:
      "当前图表只是可编辑占位，不代表真实结果。正式汇报时需要替换为论文中的真实指标，并说明是否有统计检验或外部验证。",
  },
  {
    id: "medical-robustness",
    order: 7,
    title: "稳健性检验 / 进一步分析",
    layout: "timeline",
    legacyContent: {
      subtitle: "从模型效果到临床可信度",
      bullets: ["外部数据验证", "消融实验", "亚组分析", "错误案例分析"],
      timeline: [
        { label: "01", description: "跨数据集验证待补充" },
        { label: "02", description: "模态消融实验待补充" },
        { label: "03", description: "医生协同评估待补充" },
      ],
    },
    speakerNotes:
      "进一步分析部分可以体现论文质量。建议关注跨中心数据、模态消融、不同病种或人群的亚组表现，以及失败案例。",
  },
  {
    id: "medical-conclusion",
    order: 8,
    title: "结论与启示",
    layout: "conclusion",
    legacyContent: {
      subtitle: "技术潜力、理论贡献与实践价值",
      bullets: [
        "多模态建模有应用潜力",
        "影像与文本可互补",
        "临床落地需严格验证",
        "可解释性仍是关键",
      ],
    },
    speakerNotes:
      "结论要收束到研究价值，不要过度营销。可以强调多模态 AI 的潜力，同时指出临床验证、监管和解释性仍是落地前提。",
  },
  {
    id: "medical-limitations",
    order: 9,
    title: "不足与展望",
    layout: "title_bullets",
    legacyContent: {
      subtitle: "面向真实临床部署的关键问题",
      bullets: [
        "样本代表性待确认",
        "外部验证仍需补充",
        "模型偏差需要评估",
        "隐私与合规不可忽视",
        "医生协同流程待设计",
      ],
    },
    speakerNotes:
      "这一页可以建立可信度。主动承认限制比夸大结果更符合科研汇报语气，尤其在医疗 AI 场景中。",
  },
  {
    id: "medical-qna",
    order: 10,
    title: "Q&A",
    layout: "qna",
    legacyContent: {
      subtitle: "欢迎交流与讨论",
      bullets: ["谢谢观看", "欢迎提问", "联系方式：待补充"],
    },
    speakerNotes:
      "结束时可以提示听众围绕数据来源、模型解释性、临床验证和部署风险提问。",
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
