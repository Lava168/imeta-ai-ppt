"use client";

import { AiImageComponentEditor } from "@/components/project/component-editor/AiImageComponentEditor";
import { BulletEditor } from "@/components/project/BulletEditor";
import { SpeakerNotesEditor } from "@/components/project/SpeakerNotesEditor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type {
  AiImageSlideComponent,
  BulletsSlideComponent,
  SlideComponent,
  SlideViewModel,
  TextSlideComponent,
} from "@/lib/types/slide";
import { isAiImageComponent } from "@/lib/types/slide";

type ComponentEditorPanelProps = {
  slide: SlideViewModel;
  component?: SlideComponent;
  onSlideChange: (patch: Partial<SlideViewModel>) => void;
  onComponentChange: (componentId: string, patch: Partial<SlideComponent>) => void;
};

export function ComponentEditorPanel({
  slide,
  component,
  onSlideChange,
  onComponentChange,
}: ComponentEditorPanelProps) {
  if (!component) {
    return (
      <p className="text-sm text-muted-foreground">
        请选择一个 slide component 进行编辑。
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <ComponentMetaEditor
        component={component}
        onChange={(patch) => onComponentChange(component.id, patch)}
      />
      <ComponentSpecificEditor
        component={component}
        onChange={(patch) => onComponentChange(component.id, patch)}
      />
      <SpeakerNotesEditor
        value={slide.speakerNotes}
        onChange={(speakerNotes) => onSlideChange({ speakerNotes })}
      />
    </div>
  );
}

function ComponentMetaEditor({
  component,
  onChange,
}: {
  component: SlideComponent;
  onChange: (patch: Partial<SlideComponent>) => void;
}) {
  return (
    <div className="space-y-3 rounded-md border border-white/70 bg-white/[0.52] p-3 shadow-sm transition-all duration-500 hover:bg-white/[0.68]">
      <div className="space-y-2">
        <Label htmlFor="component-name">组件名称</Label>
        <Input
          id="component-name"
          value={component.name}
          onChange={(event) => onChange({ name: event.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <ReadOnlyField label="类型" value={component.type} />
        <ReadOnlyField label="角色" value={component.role ?? "未设置"} />
      </div>
    </div>
  );
}

function ComponentSpecificEditor({
  component,
  onChange,
}: {
  component: SlideComponent;
  onChange: (patch: Partial<SlideComponent>) => void;
}) {
  if (isAiImageComponent(component)) {
    return (
      <AiImageComponentEditor
        component={component}
        onDataChange={(data) =>
          onChange({
            data: {
              ...component.data,
              ...data,
            },
          } as Partial<AiImageSlideComponent>)
        }
        onComponentReplace={(nextComponent) =>
          onChange(nextComponent as Partial<AiImageSlideComponent>)
        }
      />
    );
  }

  if (component.type === "text") {
    return (
      <div className="space-y-2 rounded-md border border-white/70 bg-white/[0.45] p-3">
        <Label htmlFor="component-text">文字内容</Label>
        <Textarea
          id="component-text"
          value={component.data.text}
          onChange={(event) =>
            onChange({
              data: {
                ...component.data,
                text: event.target.value,
              },
            } as Partial<TextSlideComponent>)
          }
          rows={4}
        />
      </div>
    );
  }

  if (component.type === "bullets") {
    return (
      <BulletEditor
        id="component-bullets"
        label="页面要点"
        value={component.data.items}
        onChange={(items) =>
          onChange({
            data: {
              ...component.data,
              items,
            },
          } as Partial<BulletsSlideComponent>)
        }
      />
    );
  }

  return (
    <div className="rounded-md border border-white/70 bg-white/[0.52] p-3 text-sm text-muted-foreground">
      {component.type} 组件编辑器将在后续阶段细化；当前先保留组件选择和展示骨架。
    </div>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 rounded-md border border-white/75 bg-white/[0.68] px-2 py-1 text-xs">
        {value}
      </p>
    </div>
  );
}
