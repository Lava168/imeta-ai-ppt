import type { ProjectDetailMock } from "@/lib/api/projects";
import type { ProjectStatus } from "@/lib/types/project";
import type { SlideComponent } from "@/lib/types/slide";
import type { SlideViewModel } from "@/lib/types/slide";

type ComponentPatch = Partial<Omit<SlideComponent, "data">> & {
  data?: Record<string, unknown>;
};

const globalForProjectStore = globalThis as typeof globalThis & {
  __imetaProjectStore?: Map<string, ProjectDetailMock>;
};

const store =
  globalForProjectStore.__imetaProjectStore ??
  (globalForProjectStore.__imetaProjectStore = new Map<string, ProjectDetailMock>());

export function saveGeneratedProject(project: ProjectDetailMock) {
  store.set(project.project.id, project);

  return project;
}

export function getGeneratedProject(projectId: string) {
  return store.get(projectId);
}

export function updateGeneratedProject(
  projectId: string,
  patch: {
    slides?: SlideViewModel[];
    status?: ProjectStatus;
  },
) {
  const detail = store.get(projectId);

  if (!detail) {
    return undefined;
  }

  const updatedAt = new Date().toISOString();

  if (patch.slides) {
    detail.slides = patch.slides.map((slide) => ({
      ...slide,
      updatedAt,
    }));
  }

  if (patch.status) {
    detail.project.status = patch.status;
  }

  detail.project.updatedAt = updatedAt;
  store.set(projectId, detail);

  return detail;
}

export function findComponent(componentId: string) {
  for (const detail of store.values()) {
    for (const slide of detail.slides) {
      const component = slide.components.find((item) => item.id === componentId);

      if (component) {
        return { detail, slide, component };
      }
    }
  }

  return undefined;
}

export function patchStoredComponent(
  componentId: string,
  patch: ComponentPatch,
) {
  const found = findComponent(componentId);

  if (!found) {
    return undefined;
  }

  found.slide.components = found.slide.components.map((component) =>
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

  found.detail.project.updatedAt = new Date().toISOString();

  return findComponent(componentId);
}
