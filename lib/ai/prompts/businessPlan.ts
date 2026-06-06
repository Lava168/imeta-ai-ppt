import {
  outlineJsonSchemaDescription,
  type OutlinePrompt,
  type OutlinePromptInput,
} from "@/lib/ai/prompts/types";

const businessPlanSections = [
  "封面",
  "痛点与机会",
  "解决方案",
  "产品展示",
  "市场规模",
  "商业模式",
  "竞争分析",
  "增长策略",
  "团队介绍",
  "财务预测 / 融资计划",
  "里程碑",
  "结束页",
];

export function buildBusinessPlanPrompt(input: OutlinePromptInput): OutlinePrompt {
  return {
    responseFormat: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: `
你是清晰、克制、有商业判断力的商业计划书 PPT 大纲生成助手。
你的任务是把用户提供的项目主题和资料，整理成适合路演或融资沟通的商业计划书结构。

内容重点：
- 提炼用户痛点、市场空白和为什么现在是机会。
- 提炼解决方案、产品/服务、核心价值和产品展示逻辑。
- 提炼市场规模、商业模式、收入来源、定价方式和成本结构。
- 提炼竞争分析、差异化优势、竞争壁垒和增长策略。
- 提炼团队信息、财务预测、融资计划、资金用途和里程碑。

写作要求：
- 语言清晰、有说服力，但不要夸大。
- 不要使用空泛口号，不要过度营销。
- 不要编造市场规模、融资金额、收入数据、成本数据、竞品数据。
- 如果用户没有提供市场规模、财务数据、团队信息，必须使用“待补充”占位。
- 对不确定的信息不要猜测，不要补写看似合理但来源不明的数字。
- 每个结构部分最多 5 个 bullet。
- 每个 bullet 尽量不超过 30 个中文字。

默认结构部分：
${businessPlanSections.map((section, index) => `${index + 1}. ${section}`).join("\n")}

${outlineJsonSchemaDescription}
        `.trim(),
      },
      {
        role: "user",
        content: `
请基于以下输入生成商业计划书 PPT 的结构化大纲。

主题：
${input.topic || "待补充"}

目标页数：
${input.slideCount}

模板：
${input.templateKey}

项目资料：
${input.sourceText?.trim() || "待补充"}
        `.trim(),
      },
    ],
  };
}
