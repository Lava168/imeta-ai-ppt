export type OutlineSection = {
  id: string;
  title: string;
  bullets: string[];
  speakerNotes: string;
};

export const researchPaperOutline: OutlineSection[] = [
  {
    id: "cover",
    title: "封面",
    bullets: ["论文题目", "作者 / 汇报人", "单位 / 日期"],
    speakerNotes: "开场交代论文题目、汇报人信息和本次汇报主题。",
  },
  {
    id: "background",
    title: "研究背景",
    bullets: ["研究问题", "现实意义", "理论意义"],
    speakerNotes: "说明研究为什么重要，并把听众带入核心问题。",
  },
  {
    id: "literature",
    title: "文献综述 / 相关研究",
    bullets: ["已有研究做了什么", "存在哪些不足", "本文切入点"],
    speakerNotes: "先概括已有研究脉络，再自然引出本文的切入点。",
  },
  {
    id: "research-question",
    title: "研究问题 / 研究假设",
    bullets: ["核心问题", "研究假设", "研究目标"],
    speakerNotes: "把研究问题、假设和目标讲清楚，形成后续分析主线。",
  },
  {
    id: "data-method",
    title: "数据与方法",
    bullets: ["数据来源", "样本范围", "方法模型", "变量说明"],
    speakerNotes: "交代数据可信度、样本范围和方法模型的选择理由。",
  },
  {
    id: "results",
    title: "实证结果 / 实验结果",
    bullets: ["主要发现", "关键图表", "结果解释"],
    speakerNotes: "围绕关键图表解释主要发现，避免逐项复述表格。",
  },
  {
    id: "robustness",
    title: "稳健性检验 / 进一步分析",
    bullets: ["稳健性测试", "异质性分析", "补充结果"],
    speakerNotes: "说明结果是否可靠，以及进一步分析带来的补充洞见。",
  },
  {
    id: "conclusion",
    title: "结论与启示",
    bullets: ["研究结论", "理论贡献", "实践启示"],
    speakerNotes: "提炼研究结论，并说明对理论和实践分别有什么价值。",
  },
  {
    id: "limitations",
    title: "不足与展望",
    bullets: ["研究局限", "未来研究方向"],
    speakerNotes: "主动说明研究边界，并给出未来可延展的方向。",
  },
  {
    id: "qa",
    title: "Q&A",
    bullets: ["欢迎提问"],
    speakerNotes: "预留互动时间，准备回答研究设计、数据和结论相关问题。",
  },
];

export const businessPlanOutline: OutlineSection[] = [
  {
    id: "cover",
    title: "封面",
    bullets: ["项目名称", "一句话介绍", "团队 / 日期"],
    speakerNotes: "快速说明项目是什么、面向谁，以及本次路演目的。",
  },
  {
    id: "pain-opportunity",
    title: "痛点与机会",
    bullets: ["用户痛点", "市场空白", "为什么现在是机会"],
    speakerNotes: "先讲清楚真实痛点，再说明市场为什么正在出现窗口期。",
  },
  {
    id: "solution",
    title: "解决方案",
    bullets: ["产品/服务是什么", "如何解决问题", "核心价值"],
    speakerNotes: "把解决方案和前一部分痛点逐一对应，突出核心价值。",
  },
  {
    id: "product-demo",
    title: "产品展示",
    bullets: ["核心功能", "使用流程", "产品截图占位"],
    speakerNotes: "用流程和截图占位帮助听众直观看到产品如何工作。",
  },
  {
    id: "market-size",
    title: "市场规模",
    bullets: ["目标市场", "TAM/SAM/SOM", "增长趋势"],
    speakerNotes: "用市场分层和增长趋势说明机会足够大且可进入。",
  },
  {
    id: "business-model",
    title: "商业模式",
    bullets: ["收入来源", "定价方式", "成本结构"],
    speakerNotes: "说明钱从哪里来、如何定价，以及主要成本如何构成。",
  },
  {
    id: "competition",
    title: "竞争分析",
    bullets: ["主要竞品", "差异化优势", "竞争壁垒"],
    speakerNotes: "对比主要竞品，讲清楚差异化和长期壁垒。",
  },
  {
    id: "growth",
    title: "增长策略",
    bullets: ["获客渠道", "推广方式", "阶段目标"],
    speakerNotes: "说明如何从早期验证走向规模增长，以及各阶段目标。",
  },
  {
    id: "team",
    title: "团队介绍",
    bullets: ["核心成员", "相关经验", "分工"],
    speakerNotes: "突出团队为什么适合做这件事，以及关键分工是否完整。",
  },
  {
    id: "finance",
    title: "财务预测 / 融资计划",
    bullets: ["收入预测", "成本预测", "融资金额", "资金用途"],
    speakerNotes: "用收入、成本和资金用途支撑融资金额的合理性。",
  },
  {
    id: "milestones",
    title: "里程碑",
    bullets: ["已完成进展", "未来 6-12 个月计划"],
    speakerNotes: "说明当前进展和未来 6-12 个月的关键交付节点。",
  },
  {
    id: "closing",
    title: "结束页",
    bullets: ["总结", "联系方式"],
    speakerNotes: "用一句话收束项目价值，并留下清晰联系方式。",
  },
];
