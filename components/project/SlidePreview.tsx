"use client";

import { ChartPreview } from "@/components/slides/layouts/ChartPreview";
import { ConclusionPreview } from "@/components/slides/layouts/ConclusionPreview";
import { CoverPreview } from "@/components/slides/layouts/CoverPreview";
import { QnaPreview } from "@/components/slides/layouts/QnaPreview";
import { SectionPreview } from "@/components/slides/layouts/SectionPreview";
import { TablePreview } from "@/components/slides/layouts/TablePreview";
import { TeamPreview } from "@/components/slides/layouts/TeamPreview";
import { TimelinePreview } from "@/components/slides/layouts/TimelinePreview";
import { TitleBulletsPreview } from "@/components/slides/layouts/TitleBulletsPreview";
import { TwoColumnsPreview } from "@/components/slides/layouts/TwoColumnsPreview";
import { SLIDE_LAYOUT_LABELS } from "@/lib/constants/slideLayouts";
import { getTextValue } from "@/lib/slideComponentAccessors";
import type { SlideViewModel } from "@/lib/types/slide";

type SlidePreviewProps = {
  slide: SlideViewModel;
};

export function SlidePreview({ slide }: SlidePreviewProps) {
  const subtitle = getTextValue(slide, "subtitle");

  return (
    <div className="aspect-video overflow-hidden rounded-md border border-white/90 bg-[#fffdf8] p-8 shadow-[0_28px_80px_rgba(64,58,50,0.13)] transition-all duration-700 hover:-translate-y-1 hover:shadow-[0_34px_92px_rgba(64,58,50,0.16)]">
      <div className="flex h-full flex-col">
        <p className="text-xs font-semibold uppercase text-primary/85">
          {SLIDE_LAYOUT_LABELS[slide.layout]}
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-normal text-foreground">
          {slide.title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-base text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
        <div className="mt-8 flex-1">
          <LayoutPreview slide={slide} />
        </div>
      </div>
    </div>
  );
}

function LayoutPreview({ slide }: SlidePreviewProps) {
  switch (slide.layout) {
    case "cover":
      return <CoverPreview slide={slide} />;
    case "section":
      return <SectionPreview slide={slide} />;
    case "title_bullets":
      return <TitleBulletsPreview slide={slide} />;
    case "two_columns":
      return <TwoColumnsPreview slide={slide} />;
    case "table":
      return <TablePreview slide={slide} />;
    case "chart":
      return <ChartPreview slide={slide} />;
    case "timeline":
      return <TimelinePreview slide={slide} />;
    case "team":
      return <TeamPreview slide={slide} />;
    case "conclusion":
      return <ConclusionPreview slide={slide} />;
    case "qna":
      return <QnaPreview slide={slide} />;
    default:
      return <TitleBulletsPreview slide={slide} />;
  }
}
