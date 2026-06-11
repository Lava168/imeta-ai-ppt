"use client";

import { useEffect, useMemo, useState } from "react";

import { ComponentEditorPanel } from "@/components/project/component-editor/ComponentEditorPanel";
import { SlideComponentList } from "@/components/project/component-editor/SlideComponentList";
import { ProjectToolbar } from "@/components/project/ProjectToolbar";
import { SlideList } from "@/components/project/SlideList";
import { SlidePreview } from "@/components/project/SlidePreview";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMockProject } from "@/lib/api/projects";
import type { ProjectDetailMock } from "@/lib/api/projects";
import { patchComponentById } from "@/lib/slideComponentAccessors";
import type { ProjectStatus } from "@/lib/types/project";
import type { SlideComponent, SlideViewModel } from "@/lib/types/slide";

type ProjectWorkspaceProps = {
  projectId: string;
  initialDetail?: ProjectDetailMock;
};

export function ProjectWorkspace({
  projectId,
  initialDetail,
}: ProjectWorkspaceProps) {
  const detail = useMemo(
    () => initialDetail ?? getMockProject(projectId),
    [initialDetail, projectId],
  );
  const [slides, setSlides] = useState<SlideViewModel[]>(detail.slides);
  const [selectedId, setSelectedId] = useState(detail.slides[0].id);
  const [selectedComponentId, setSelectedComponentId] = useState(
    detail.slides[0].components[0]?.id ?? "",
  );
  const [status, setStatus] = useState<ProjectStatus>(detail.project.status);
  const [isSaving, setIsSaving] = useState(false);
  const selectedSlide = useMemo(
    () => slides.find((slide) => slide.id === selectedId) ?? slides[0],
    [selectedId, slides],
  );
  const selectedComponent = useMemo(
    () =>
      selectedSlide.components.find(
        (component) => component.id === selectedComponentId,
      ) ?? selectedSlide.components[0],
    [selectedComponentId, selectedSlide],
  );
  const exported = status === "pptx_ready";

  useEffect(() => {
    if (
      selectedSlide.components.length > 0 &&
      !selectedSlide.components.some(
        (component) => component.id === selectedComponentId,
      )
    ) {
      setSelectedComponentId(selectedSlide.components[0].id);
    }
  }, [selectedComponentId, selectedSlide]);

  function patchSelectedSlide(patch: Partial<SlideViewModel>) {
    setSlides((current) =>
      current.map((slide) =>
        slide.id === selectedSlide.id ? { ...slide, ...patch } : slide,
      ),
    );
  }

  function patchSelectedComponent(
    componentId: string,
    patch: Partial<SlideComponent>,
  ) {
    setSlides((current) =>
      current.map((slide) => {
        if (slide.id !== selectedSlide.id) {
          return slide;
        }

        const nextComponents = patchComponentById(
          slide.components,
          componentId,
          patch,
        );
        const patchedComponent = nextComponents.find(
          (component) => component.id === componentId,
        );
        const title =
          patchedComponent?.type === "text" && patchedComponent.role === "title"
            ? patchedComponent.data.text
            : slide.title;

        return {
          ...slide,
          title,
          components: nextComponents,
        };
      }),
    );

    void fetch(`/api/components/${componentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patch),
    }).catch(() => undefined);
  }

  async function persistProject(nextStatus: ProjectStatus = status) {
    setIsSaving(true);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slides,
          status: nextStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("保存失败");
      }

      setStatus(nextStatus);
    } catch {
      setStatus(nextStatus);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-screen">
      <ProjectToolbar
        projectId={projectId}
        title={selectedSlide.title}
        status={status}
        exported={exported}
        onGenerateOutline={() => setStatus("outline_ready")}
        onSave={() => void persistProject("outline_ready")}
        onExport={() => void persistProject("pptx_ready")}
        busy={isSaving}
      />

      <div className="relative mx-auto grid w-full max-w-[1500px] gap-5 px-6 py-6 lg:grid-cols-[230px_minmax(0,1fr)_390px]">
        <div className="atelier-grid pointer-events-none absolute inset-x-6 top-0 -z-10 h-[520px] rounded-md opacity-70" />

        <div className="order-2 lg:order-1">
          <SlideList
            slides={slides}
            selectedId={selectedId}
            onSelect={(slideId) => {
              setSelectedId(slideId);
              const nextSlide = slides.find((slide) => slide.id === slideId);
              setSelectedComponentId(nextSlide?.components[0]?.id ?? "");
            }}
          />
        </div>

        <section className="order-1 lg:order-2">
          <Card className="surface-panel premium-lift overflow-hidden">
            <CardHeader className="border-b border-white/70 bg-white/[0.38]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-primary">
                    Canvas
                  </p>
                  <CardTitle className="mt-1 text-lg">
                    可编辑幻灯片画布
                  </CardTitle>
                </div>
                <span className="rounded-full border border-white/75 bg-white/[0.58] px-3 py-1 text-xs text-muted-foreground shadow-sm">
                  16:9 editable
                </span>
              </div>
            </CardHeader>
            <CardContent className="slow-pan bg-[linear-gradient(135deg,rgba(255,255,255,0.52),rgba(221,229,221,0.58),rgba(215,219,225,0.38),rgba(234,216,207,0.34))] p-5 sm:p-6">
              <SlidePreview slide={selectedSlide} />
            </CardContent>
          </Card>
        </section>

        <aside className="order-3">
          <Card className="surface-panel premium-lift overflow-hidden">
            <CardHeader className="border-b border-white/70 bg-white/[0.38]">
              <p className="text-xs font-semibold uppercase text-primary">
                Inspector
              </p>
              <CardTitle className="mt-1 text-lg">组件级编辑</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="mb-2 text-sm font-medium">本页组件</p>
                <SlideComponentList
                  components={selectedSlide.components}
                  selectedComponentId={selectedComponent?.id ?? ""}
                  onSelect={setSelectedComponentId}
                />
              </div>
              <ComponentEditorPanel
                slide={selectedSlide}
                component={selectedComponent}
                onSlideChange={patchSelectedSlide}
                onComponentChange={patchSelectedComponent}
              />
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
