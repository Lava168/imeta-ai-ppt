export type OutlinePromptInput = {
  scenario?: "research_presentation" | "business_plan";
  topic: string;
  sourceText?: string;
  slideCount: number;
  templateKey: string;
};

export type OutlinePromptMessage = {
  role: "system" | "user";
  content: string;
};

export type OutlinePrompt = {
  messages: OutlinePromptMessage[];
  responseFormat: {
    type: "json_object";
  };
};

export type GeneratedOutlineSection = {
  id: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  speakerNotes: string;
};

export type GeneratedOutline = {
  title: string;
  scenario: "research_presentation" | "business_plan";
  language: "zh-CN";
  sections: GeneratedOutlineSection[];
};

export const outlineJsonSchemaDescription = `
输出必须是一个合法 JSON 对象，不要输出 Markdown，不要使用代码块。
JSON 结构：
{
  "title": "PPT 标题",
  "scenario": "research_presentation 或 business_plan",
  "language": "zh-CN",
  "sections": [
    {
      "id": "稳定的英文或拼音 key",
      "title": "结构部分标题",
      "bullets": ["要点 1", "要点 2"],
      "speakerNotes": "该部分演讲备注"
    }
  ]
}
硬性限制：
- sections 必须是数组。
- 每个 section 的 bullets 最多 5 条。
- 每个 bullet 尽量不超过 30 个中文字。
- speakerNotes 必须是字符串，可以使用“待补充”。
- 信息不足时使用“待补充”，不要编造事实、数字、结果或名称。
`.trim();
