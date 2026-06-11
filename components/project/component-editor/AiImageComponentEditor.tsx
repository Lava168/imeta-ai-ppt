"use client";

import { ImageOff, RefreshCcw, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  AiImageAspectRatio,
  AiImageSlideComponent,
  AiImageStatus,
  AiImageStylePreset,
  SlideComponent,
} from "@/lib/types/slide";

const stylePresetOptions: Array<{
  value: AiImageStylePreset;
  label: string;
}> = [
  { value: "academic_clean", label: "学术清爽" },
  { value: "academic_minimal", label: "学术极简" },
  { value: "business_clean", label: "商业干净" },
  { value: "business_dark", label: "商业深色" },
  { value: "concept_line", label: "概念线稿" },
  { value: "product_mockup", label: "产品样机" },
  { value: "icon_style", label: "图标插画" },
];

const aspectRatioOptions: AiImageAspectRatio[] = ["16:9", "4:3", "1:1", "3:2"];

const aiStatusLabels: Record<AiImageStatus, string> = {
  idle: "待生成",
  generating: "生成中",
  ready: "已生成",
  failed: "失败",
};

type AiImageComponentEditorProps = {
  component: AiImageSlideComponent;
  onDataChange: (data: Partial<AiImageSlideComponent["data"]>) => void;
  onComponentReplace?: (component: SlideComponent) => void;
};

export function AiImageComponentEditor({
  component,
  onDataChange,
  onComponentReplace,
}: AiImageComponentEditorProps) {
  const hasImage = Boolean(component.data.imageUrl);
  const [error, setError] = useState("");

  async function generateImage() {
    setError("");
    onDataChange({ status: "generating" });

    const response = await fetch(`/api/components/${component.id}/generate-image`, {
      method: "POST",
    });
    const result = (await response.json()) as {
      component?: SlideComponent;
      error?: string;
    };

    if (result.component) {
      onComponentReplace?.(result.component);
    }

    if (!response.ok) {
      setError(result.error ?? "图片生成失败");
    }
  }

  async function clearImage() {
    setError("");
    onDataChange({ imageUrl: "", revisedPrompt: "", status: "idle" });

    const response = await fetch(`/api/components/${component.id}/image`, {
      method: "DELETE",
    });
    const result = (await response.json()) as {
      component?: SlideComponent;
      error?: string;
    };

    if (result.component) {
      onComponentReplace?.(result.component);
    }

    if (!response.ok) {
      setError(result.error ?? "清空失败");
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-primary/15 bg-white/[0.48] p-3 shadow-sm transition-all duration-500 hover:bg-white/[0.66]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">局部视觉</p>
            <p className="mt-1 text-xs text-muted-foreground">
              只填充当前组件，标题、正文和图表仍保持可编辑。
            </p>
          </div>
          <span className="rounded-md border border-white/75 bg-white/[0.72] px-2.5 py-1 text-xs font-medium text-primary shadow-sm">
            {aiStatusLabels[component.data.status]}
          </span>
        </div>
      </div>

      <div className="space-y-2 rounded-md border border-white/70 bg-white/[0.45] p-3">
        <Label htmlFor="ai-image-prompt">视觉描述</Label>
        <Textarea
          id="ai-image-prompt"
          value={component.data.prompt}
          onChange={(event) => onDataChange({ prompt: event.target.value })}
          rows={5}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        <div className="space-y-2">
          <Label>风格预设</Label>
          <Select
            value={component.data.stylePreset}
            onValueChange={(value) =>
              onDataChange({ stylePreset: value as AiImageStylePreset })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="选择风格" />
            </SelectTrigger>
            <SelectContent>
              {stylePresetOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>图片比例</Label>
          <Select
            value={component.data.aspectRatio}
            onValueChange={(value) =>
              onDataChange({ aspectRatio: value as AiImageAspectRatio })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="选择比例" />
            </SelectTrigger>
            <SelectContent>
              {aspectRatioOptions.map((ratio) => (
                <SelectItem key={ratio} value={ratio}>
                  {ratio}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ai-image-alt">替代说明</Label>
        <Input
          id="ai-image-alt"
          value={component.data.alt}
          onChange={(event) => onDataChange({ alt: event.target.value })}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          onClick={generateImage}
          disabled={component.data.status === "generating"}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {component.data.status === "generating" ? "生成中" : "生成图片"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={generateImage}
          disabled={component.data.status === "generating"}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          重新生成
        </Button>
        <Button type="button" variant="outline" onClick={clearImage}>
          <Trash2 className="mr-2 h-4 w-4" />
          清空
        </Button>
      </div>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}

      <div className="atelier-glow rounded-md border border-white/70 bg-[#f4efe5] p-3 transition-all duration-700 hover:-translate-y-0.5">
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={component.data.imageUrl}
            alt={component.data.alt}
            className="aspect-video w-full rounded-sm object-cover"
          />
        ) : (
          <div className="soft-shimmer grid aspect-video place-items-center rounded-sm border border-dashed border-primary/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.62),rgba(221,229,221,0.42),rgba(234,216,207,0.42))] text-center">
            <div>
              <ImageOff className="mx-auto h-6 w-6 text-primary/45" />
              <p className="mt-2 text-sm font-medium">等待生成局部视觉</p>
              <p className="mt-1 text-xs text-muted-foreground">
                生成后会作为局部图片元素进入 PPT。
              </p>
            </div>
          </div>
        )}
      </div>

      {component.data.revisedPrompt ? (
        <div className="space-y-2">
          <Label>优化后的提示词</Label>
          <p className="rounded-md border border-white/70 bg-white/[0.52] p-3 text-xs leading-5 text-muted-foreground">
            {component.data.revisedPrompt}
          </p>
        </div>
      ) : null}
    </div>
  );
}
