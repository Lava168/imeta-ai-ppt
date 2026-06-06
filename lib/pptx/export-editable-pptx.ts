import PptxGenJS from "pptxgenjs";

import type { OutlineSection } from "@/lib/sample-outlines";

type TemplateKey =
  | "research_classic"
  | "research_modern"
  | "business_clean"
  | "business_dark";

type EditablePptxInput = {
  title: string;
  scenarioLabel: string;
  templateKey: TemplateKey;
  sections: OutlineSection[];
};

type Theme = {
  accent: string;
  accentSoft: string;
  background: string;
  foreground: string;
  muted: string;
};

const themes: Record<TemplateKey, Theme> = {
  research_classic: {
    accent: "1D4ED8",
    accentSoft: "DBEAFE",
    background: "F8FAFC",
    foreground: "111827",
    muted: "64748B",
  },
  research_modern: {
    accent: "4F46E5",
    accentSoft: "E0E7FF",
    background: "F8FAFC",
    foreground: "111827",
    muted: "64748B",
  },
  business_clean: {
    accent: "0F766E",
    accentSoft: "CCFBF1",
    background: "FAFAF9",
    foreground: "1C1917",
    muted: "78716C",
  },
  business_dark: {
    accent: "22C55E",
    accentSoft: "DCFCE7",
    background: "111827",
    foreground: "F9FAFB",
    muted: "CBD5E1",
  },
};

const SLIDE_WIDTH = 13.333;
const SLIDE_HEIGHT = 7.5;

export async function exportEditablePptx(input: EditablePptxInput) {
  const pptx = new PptxGenJS();
  const theme = themes[input.templateKey];

  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "AI PPT MVP";
  pptx.company = "AI PPT MVP";
  pptx.subject = input.scenarioLabel;
  pptx.title = input.title;
  pptx.theme = {
    headFontFace: "Aptos Display",
    bodyFontFace: "Aptos",
  };

  addCoverSlide(pptx, input, theme);
  input.sections.forEach((section, index) => {
    addSectionSlide(pptx, section, index + 1, input.sections.length, theme);
  });

  const buffer = await pptx.write({
    outputType: "nodebuffer",
    compression: true,
  });

  return Buffer.from(buffer as Uint8Array);
}

function addCoverSlide(pptx: PptxGenJS, input: EditablePptxInput, theme: Theme) {
  const slide = pptx.addSlide();

  slide.background = { color: theme.background };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: SLIDE_WIDTH,
    h: SLIDE_HEIGHT,
    fill: { color: theme.background },
    line: { color: theme.background },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 0.22,
    h: SLIDE_HEIGHT,
    fill: { color: theme.accent },
    line: { color: theme.accent },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.72,
    y: 0.72,
    w: 2.1,
    h: 0.34,
    fill: { color: theme.accentSoft },
    line: { color: theme.accentSoft },
  });
  slide.addText(input.scenarioLabel, {
    x: 0.88,
    y: 0.76,
    w: 2.2,
    h: 0.25,
    color: theme.accent,
    fontSize: 12,
    bold: true,
    margin: 0,
  });
  slide.addText(input.title, {
    x: 0.72,
    y: 1.65,
    w: 10.8,
    h: 1.3,
    color: theme.foreground,
    fontSize: 34,
    bold: true,
    fit: "shrink",
    breakLine: false,
    margin: 0,
  });
  slide.addText("结构化大纲生成 · 可编辑 PPTX", {
    x: 0.76,
    y: 3.15,
    w: 6.5,
    h: 0.38,
    color: theme.muted,
    fontSize: 16,
    margin: 0,
  });
  slide.addText("所有主要文字均由 addText 生成，可在 PowerPoint 中直接编辑。", {
    x: 0.76,
    y: 6.72,
    w: 8.6,
    h: 0.28,
    color: theme.muted,
    fontSize: 10,
    margin: 0,
  });
  slide.addNotes("开场页：介绍主题、汇报场景和本次 PPT 的核心内容。");
}

function addSectionSlide(
  pptx: PptxGenJS,
  section: OutlineSection,
  sectionNumber: number,
  sectionCount: number,
  theme: Theme,
) {
  const slide = pptx.addSlide();

  slide.background = { color: "FFFFFF" };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: SLIDE_WIDTH,
    h: 0.18,
    fill: { color: theme.accent },
    line: { color: theme.accent },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.64,
    y: 0.72,
    w: 0.54,
    h: 0.54,
    fill: { color: theme.accentSoft },
    line: { color: theme.accentSoft },
  });
  slide.addText(String(sectionNumber).padStart(2, "0"), {
    x: 0.73,
    y: 0.84,
    w: 0.38,
    h: 0.2,
    color: theme.accent,
    fontSize: 11,
    bold: true,
    align: "center",
    margin: 0,
  });
  slide.addText(section.title, {
    x: 1.35,
    y: 0.68,
    w: 10.6,
    h: 0.65,
    color: theme.foreground,
    fontSize: 25,
    bold: true,
    fit: "shrink",
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.72,
    y: 1.55,
    w: 11.8,
    h: 0,
    line: { color: "E5E7EB", width: 1 },
  });

  section.bullets.slice(0, 6).forEach((bullet, index) => {
    const y = 2.02 + index * 0.58;

    slide.addShape(pptx.ShapeType.rect, {
      x: 0.92,
      y: y + 0.12,
      w: 0.14,
      h: 0.14,
      fill: { color: theme.accent },
      line: { color: theme.accent },
    });
    slide.addText(bullet, {
      x: 1.22,
      y,
      w: 8.7,
      h: 0.36,
      color: theme.foreground,
      fontSize: 16,
      breakLine: false,
      fit: "shrink",
      margin: 0,
    });
  });

  // Complex charts should be editable. MVP uses editable text/shape placeholders,
  // never full-slide HTML or Canvas screenshots.
  slide.addShape(pptx.ShapeType.rect, {
    x: 9.85,
    y: 2.05,
    w: 2.46,
    h: 2.04,
    fill: { color: theme.accentSoft, transparency: 28 },
    line: { color: theme.accent, width: 1 },
  });
  slide.addText("可编辑图表 / 图片占位", {
    x: 10.05,
    y: 2.72,
    w: 2.06,
    h: 0.42,
    color: theme.accent,
    fontSize: 12,
    bold: true,
    align: "center",
    margin: 0,
  });
  slide.addText("复杂图表第一版使用文本与形状占位", {
    x: 10.05,
    y: 3.15,
    w: 2.06,
    h: 0.35,
    color: theme.muted,
    fontSize: 9,
    align: "center",
    margin: 0,
  });

  slide.addText(`${sectionNumber} / ${sectionCount}`, {
    x: 11.35,
    y: 6.88,
    w: 1.0,
    h: 0.22,
    color: theme.muted,
    fontSize: 10,
    align: "right",
    margin: 0,
  });

  if (section.speakerNotes) {
    slide.addNotes(section.speakerNotes);
  }
}
