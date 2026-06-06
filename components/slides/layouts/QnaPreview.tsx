import { getTextValue } from "@/lib/slideComponentAccessors";
import type { SlideViewModel } from "@/lib/types/slide";

export function QnaPreview({ slide }: { slide: SlideViewModel }) {
  const subtitle = getTextValue(slide, "subtitle");

  return (
    <div className="grid h-full place-items-center text-center">
      <div>
        <p className="text-5xl font-semibold text-primary">Q&A</p>
        {subtitle ? (
          <p className="mt-4 text-base text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
