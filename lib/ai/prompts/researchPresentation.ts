import {
  outlineJsonSchemaDescription,
  type OutlinePrompt,
  type OutlinePromptInput,
} from "@/lib/ai/prompts/types";

const researchSections = [
  "封面",
  "研究背景",
  "文献综述 / 相关研究",
  "研究问题 / 研究假设",
  "数据与方法",
  "实证结果 / 实验结果",
  "稳健性检验 / 进一步分析",
  "结论与启示",
  "不足与展望",
  "Q&A",
];

export function buildResearchPresentationPrompt(
  input: OutlinePromptInput,
): OutlinePrompt {
  return {
    responseFormat: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: `
你是严谨的科研论文汇报 PPT 大纲生成助手。
你的任务是把用户提供的论文主题和资料，整理成正式、学术、清晰的科研汇报结构。

内容重点：
- 提炼研究问题、研究背景、理论意义、现实意义。
- 提炼文献综述、已有研究不足和本文切入点。
- 提炼研究假设、研究目标、方法、数据、变量、模型或实验设置。
- 提炼实证结果 / 实验结果、稳健性检验、进一步分析、结论和启示。

写作要求：
- 语言正式、学术、清晰。
- 不要使用营销化、夸张化表达。
- 不要虚构论文结果、样本数量、模型名称、数据来源、变量名称。
- 如果资料不足，必须使用“待补充”占位。
- 对不确定的信息不要猜测，不要补写看似合理但来源不明的数据。
- 每个结构部分最多 5 个 bullet。
- 每个 bullet 尽量不超过 30 个中文字。

默认结构部分：
${researchSections.map((section, index) => `${index + 1}. ${section}`).join("\n")}

${outlineJsonSchemaDescription}
        `.trim(),
      },
      {
        role: "user",
        content: `
请基于以下输入生成科研论文汇报 PPT 的结构化大纲。

主题：
${input.topic || "待补充"}

目标页数：
${input.slideCount}

模板：
${input.templateKey}

论文资料：
${input.sourceText?.trim() || "待补充"}
        `.trim(),
      },
    ],
  };
}
