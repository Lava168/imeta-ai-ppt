import type { SlideLayout } from "@/lib/types/slide";

export const SLIDE_LAYOUTS: Array<{
  value: SlideLayout;
  label: string;
}> = [
  { value: "cover", label: "封面" },
  { value: "section", label: "章节页" },
  { value: "title_bullets", label: "标题正文" },
  { value: "two_columns", label: "双栏" },
  { value: "table", label: "表格" },
  { value: "chart", label: "图表" },
  { value: "timeline", label: "时间线" },
  { value: "team", label: "团队" },
  { value: "conclusion", label: "结论" },
  { value: "qna", label: "Q&A" },
  { value: "product", label: "产品展示" },
  { value: "problem_solution", label: "问题方案" },
];

export const SLIDE_LAYOUT_LABELS: Record<SlideLayout, string> =
  Object.fromEntries(
    SLIDE_LAYOUTS.map((layout) => [layout.value, layout.label]),
  ) as Record<SlideLayout, string>;
