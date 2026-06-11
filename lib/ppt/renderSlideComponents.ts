import PptxGenJS from "pptxgenjs";

import { renderAiImageComponent } from "@/lib/ppt/renderAiImageComponent";
import type { TemplateKey } from "@/lib/types/project";
import type {
  ChartSlideComponent,
  ShapeSlideComponent,
  SlideComponentBounds,
  SlideViewModel,
  TableSlideComponent,
  TeamSlideComponent,
  TimelineSlideComponent,
} from "@/lib/types/slide";

export type PptTheme = {
  accent: string;
  accentSoft: string;
  background: string;
  foreground: string;
  muted: string;
  panel: string;
};

const SLIDE_WIDTH = 13.333;
const SLIDE_HEIGHT = 7.5;

const themes: Record<TemplateKey, PptTheme> = {
  research_classic: {
    accent: "5F6F64",
    accentSoft: "E1E7DE",
    background: "F7F4EC",
    foreground: "252823",
    muted: "6E746B",
    panel: "FFFFFF",
  },
  research_modern: {
    accent: "6D7893",
    accentSoft: "DDE3EC",
    background: "F6F2EA",
    foreground: "272A2B",
    muted: "687077",
    panel: "FFFDF8",
  },
  business_clean: {
    accent: "7B8F86",
    accentSoft: "DFE8E1",
    background: "F5F1E9",
    foreground: "2B2A27",
    muted: "746D64",
    panel: "FFFFFF",
  },
  business_dark: {
    accent: "C7B99A",
    accentSoft: "39423F",
    background: "1E2523",
    foreground: "F7F1E7",
    muted: "B6ADA1",
    panel: "26302D",
  },
};

export async function exportComponentPptx({
  title,
  templateKey,
  slides,
}: {
  title: string;
  templateKey: TemplateKey;
  slides: SlideViewModel[];
}) {
  const pptx = new PptxGenJS();
  const theme = themes[templateKey];

  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "iMeta";
  pptx.company = "iMeta";
  pptx.subject = "Editable AI PPTX";
  pptx.title = title;
  pptx.theme = {
    headFontFace: "Aptos Display",
    bodyFontFace: "Aptos",
  };

  slides.forEach((slide, index) => {
    const pptSlide = pptx.addSlide();

    renderSlideBackground(pptx, pptSlide, theme, index + 1, slides.length);
    renderSlideComponents(pptx, pptSlide, slide, theme);

    if (slide.speakerNotes) {
      pptSlide.addNotes(slide.speakerNotes);
    }
  });

  const buffer = await pptx.write({
    outputType: "nodebuffer",
    compression: true,
  });

  return Buffer.from(buffer as Uint8Array);
}

export function renderSlideComponents(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  sourceSlide: SlideViewModel,
  theme: PptTheme,
) {
  sourceSlide.components.forEach((component) => {
    const rect = toPptRect(component.bounds);

    switch (component.type) {
      case "text":
        slide.addText(component.data.text, {
          ...rect,
          color: theme.foreground,
          fontSize: getTextFontSize(component.data.variant),
          bold: component.data.variant === "title",
          fit: "shrink",
          margin: 0,
          breakLine: false,
        });
        break;

      case "bullets":
        renderBullets(slide, component.data.items, rect, theme);
        break;

      case "table":
        renderTable(slide, component, rect, theme);
        break;

      case "chart":
        renderChart(pptx, slide, component, rect, theme);
        break;

      case "shape":
        renderShape(pptx, slide, component, rect, theme);
        break;

      case "timeline":
        renderTimeline(pptx, slide, component, rect, theme);
        break;

      case "team":
        renderTeam(pptx, slide, component, rect, theme);
        break;

      case "ai_image":
        renderAiImageComponent({ component, slide, rect });
        if (!component.data.imageUrl) {
          renderImagePlaceholder(pptx, slide, rect, theme);
        }
        break;

      case "image":
        if (component.data.imageUrl) {
          slide.addImage({
            path: component.data.imageUrl,
            ...rect,
            altText: component.data.alt,
          });
        }
        break;
    }
  });
}

function renderSlideBackground(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  theme: PptTheme,
  slideNumber: number,
  slideCount: number,
) {
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
    x: 0.18,
    y: 0.18,
    w: SLIDE_WIDTH - 0.36,
    h: SLIDE_HEIGHT - 0.36,
    fill: { color: theme.panel, transparency: 8 },
    line: { color: "FFFFFF", transparency: 20 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: SLIDE_WIDTH,
    h: 0.12,
    fill: { color: theme.accent },
    line: { color: theme.accent },
  });
  slide.addText(`${slideNumber} / ${slideCount}`, {
    x: 11.45,
    y: 6.92,
    w: 1.0,
    h: 0.22,
    color: theme.muted,
    fontSize: 9,
    align: "right",
    margin: 0,
  });
}

function renderBullets(
  slide: PptxGenJS.Slide,
  items: string[],
  rect: PptRect,
  theme: PptTheme,
) {
  const visibleItems = items.slice(0, 5);

  visibleItems.forEach((item, index) => {
    slide.addText(item, {
      x: rect.x,
      y: rect.y + index * Math.min(0.52, rect.h / Math.max(visibleItems.length, 1)),
      w: rect.w,
      h: 0.34,
      color: theme.foreground,
      fontSize: 15,
      bullet: { type: "bullet", indent: 14 },
      fit: "shrink",
      margin: 0,
      breakLine: false,
    });
  });
}

function renderTable(
  slide: PptxGenJS.Slide,
  component: TableSlideComponent,
  rect: PptRect,
  theme: PptTheme,
) {
  const rows = component.data.rows.slice(0, 6).map((row, rowIndex) =>
    row.slice(0, 4).map((cell) => ({
      text: cell,
      options: {
        bold: rowIndex === 0,
        color: rowIndex === 0 ? theme.accent : theme.foreground,
        fill: {
          color: rowIndex === 0 ? theme.accentSoft : "FFFFFF",
          transparency: rowIndex === 0 ? 0 : 14,
        },
        margin: 0.08,
        fontSize: rowIndex === 0 ? 10 : 9,
      },
    })),
  );

  if (!rows.length) {
    return;
  }

  slide.addTable(rows, {
    ...rect,
    border: { color: "D8D5CD", pt: 0.7 },
    color: theme.foreground,
    fontSize: 9,
    valign: "middle",
  });
}

function renderChart(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  component: ChartSlideComponent,
  rect: PptRect,
  theme: PptTheme,
) {
  if (!component.data.data.length) {
    return;
  }

  slide.addChart(
    pptx.ChartType.bar,
    [
      {
        name: "可编辑数据",
        labels: component.data.data.map((item) => item.label),
        values: component.data.data.map((item) => item.value),
      },
    ],
    {
      ...rect,
      catAxisLabelFontFace: "Aptos",
      catAxisLabelFontSize: 8,
      showLegend: false,
      showTitle: false,
      showValue: false,
      valAxisLabelFontSize: 8,
      valAxisMinVal: 0,
      valAxisMaxVal: Math.max(...component.data.data.map((item) => item.value), 100),
      chartColors: [theme.accent],
    },
  );
}

function renderShape(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  component: ShapeSlideComponent,
  rect: PptRect,
  theme: PptTheme,
) {
  slide.addShape(getShapeType(pptx, component.data.shape), {
    ...rect,
    fill: { color: component.data.fill ?? theme.accentSoft, transparency: 10 },
    line: { color: component.data.stroke ?? theme.accent, width: 1 },
  });
}

function renderTimeline(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  component: TimelineSlideComponent,
  rect: PptRect,
  theme: PptTheme,
) {
  const items = component.data.items.slice(0, 5);
  const gap = rect.w / Math.max(items.length, 1);
  const lineY = rect.y + rect.h * 0.32;

  slide.addShape(pptx.ShapeType.line, {
    x: rect.x,
    y: lineY,
    w: rect.w,
    h: 0,
    line: { color: theme.accent, width: 1.2 },
  });

  items.forEach((item, index) => {
    const x = rect.x + index * gap + gap * 0.18;

    slide.addShape(pptx.ShapeType.ellipse, {
      x,
      y: lineY - 0.16,
      w: 0.32,
      h: 0.32,
      fill: { color: theme.accent },
      line: { color: theme.accent },
    });
    slide.addText(item.label, {
      x: x - 0.08,
      y: lineY - 0.48,
      w: 0.5,
      h: 0.2,
      color: theme.accent,
      bold: true,
      fontSize: 10,
      align: "center",
      margin: 0,
    });
    slide.addText(item.description, {
      x: x - 0.18,
      y: lineY + 0.28,
      w: Math.max(gap - 0.18, 1),
      h: rect.h * 0.42,
      color: theme.foreground,
      fontSize: 10,
      fit: "shrink",
      margin: 0,
    });
  });
}

function renderTeam(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  component: TeamSlideComponent,
  rect: PptRect,
  theme: PptTheme,
) {
  const members = component.data.members.slice(0, 4);
  const cardW = rect.w / Math.max(members.length, 1) - 0.16;

  members.forEach((member, index) => {
    const x = rect.x + index * (cardW + 0.16);

    slide.addShape(pptx.ShapeType.rect, {
      x,
      y: rect.y,
      w: cardW,
      h: rect.h,
      fill: { color: theme.accentSoft, transparency: 10 },
      line: { color: "FFFFFF", transparency: 20 },
    });
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + 0.18,
      y: rect.y + 0.18,
      w: 0.42,
      h: 0.42,
      fill: { color: theme.accent },
      line: { color: theme.accent },
    });
    slide.addText(member.name, {
      x: x + 0.18,
      y: rect.y + 0.78,
      w: cardW - 0.36,
      h: 0.24,
      color: theme.foreground,
      bold: true,
      fontSize: 12,
      margin: 0,
    });
    slide.addText(member.role, {
      x: x + 0.18,
      y: rect.y + 1.1,
      w: cardW - 0.36,
      h: 0.46,
      color: theme.muted,
      fontSize: 10,
      fit: "shrink",
      margin: 0,
    });
  });
}

function renderImagePlaceholder(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  rect: PptRect,
  theme: PptTheme,
) {
  slide.addShape(pptx.ShapeType.rect, {
    ...rect,
    fill: { color: theme.accentSoft, transparency: 20 },
    line: { color: theme.accent, transparency: 16, dashType: "dash" },
  });
  slide.addText("AI image component", {
    x: rect.x + 0.12,
    y: rect.y + rect.h / 2 - 0.12,
    w: Math.max(rect.w - 0.24, 0.4),
    h: 0.24,
    color: theme.accent,
    fontSize: 9,
    align: "center",
    margin: 0,
  });
}

type PptRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

function toPptRect(bounds: SlideComponentBounds): PptRect {
  return {
    x: bounds.x * SLIDE_WIDTH,
    y: bounds.y * SLIDE_HEIGHT,
    w: bounds.width * SLIDE_WIDTH,
    h: bounds.height * SLIDE_HEIGHT,
  };
}

function getTextFontSize(variant: "title" | "subtitle" | "body") {
  if (variant === "title") {
    return 28;
  }

  if (variant === "subtitle") {
    return 15;
  }

  return 13;
}

function getShapeType(pptx: PptxGenJS, shape: ShapeSlideComponent["data"]["shape"]) {
  if (shape === "line") {
    return pptx.ShapeType.line;
  }

  if (shape === "circle") {
    return pptx.ShapeType.ellipse;
  }

  return pptx.ShapeType.rect;
}
