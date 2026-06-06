import type {
  BulletsSlideComponent,
  ChartSlideComponent,
  SlideComponent,
  SlideComponentRole,
  SlideViewModel,
  TableSlideComponent,
  TeamSlideComponent,
  TextSlideComponent,
  TimelineSlideComponent,
} from "@/lib/types/slide";

export function getTextComponent(
  slide: SlideViewModel,
  role: SlideComponentRole,
): TextSlideComponent | undefined {
  return slide.components.find(
    (component): component is TextSlideComponent =>
      component.type === "text" && component.role === role,
  );
}

export function getTextValue(slide: SlideViewModel, role: SlideComponentRole) {
  return getTextComponent(slide, role)?.data.text ?? "";
}

export function getBulletsComponent(
  slide: SlideViewModel,
  role: SlideComponentRole,
): BulletsSlideComponent | undefined {
  return slide.components.find(
    (component): component is BulletsSlideComponent =>
      component.type === "bullets" && component.role === role,
  );
}

export function getBulletItems(
  slide: SlideViewModel,
  role: SlideComponentRole,
) {
  return getBulletsComponent(slide, role)?.data.items ?? [];
}

export function getTableComponent(
  slide: SlideViewModel,
): TableSlideComponent | undefined {
  return slide.components.find(
    (component): component is TableSlideComponent =>
      component.type === "table",
  );
}

export function getChartComponent(
  slide: SlideViewModel,
): ChartSlideComponent | undefined {
  return slide.components.find(
    (component): component is ChartSlideComponent =>
      component.type === "chart",
  );
}

export function getTimelineComponent(
  slide: SlideViewModel,
): TimelineSlideComponent | undefined {
  return slide.components.find(
    (component): component is TimelineSlideComponent =>
      component.type === "timeline",
  );
}

export function getTeamComponent(
  slide: SlideViewModel,
): TeamSlideComponent | undefined {
  return slide.components.find(
    (component): component is TeamSlideComponent => component.type === "team",
  );
}

export function patchComponentById(
  components: SlideComponent[],
  componentId: string,
  patch: Partial<SlideComponent>,
) {
  return components.map((component) =>
    component.id === componentId
      ? ({
          ...component,
          ...patch,
          data: {
            ...component.data,
            ...patch.data,
          },
        } as SlideComponent)
      : component,
  );
}
