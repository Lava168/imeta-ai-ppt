"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, WandSparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ScenarioSelector } from "@/components/project/ScenarioSelector";
import { SlideCountSelector } from "@/components/project/SlideCountSelector";
import { SourceInput } from "@/components/project/SourceInput";
import { TemplateSelector } from "@/components/project/TemplateSelector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getDefaultSlideCount,
  normalizeScenario,
  PROJECT_SCENARIOS,
  SCENARIO_LABELS,
  SLIDE_COUNTS_BY_SCENARIO,
  SOURCE_PLACEHOLDERS,
  TOPIC_PLACEHOLDERS,
} from "@/lib/constants/scenarios";
import {
  getDefaultTemplateKey,
  TEMPLATE_KEYS,
  TEMPLATE_OPTIONS_BY_SCENARIO,
} from "@/lib/constants/templates";
import { createMockProject } from "@/lib/api/projects";
import type {
  NewProjectFormValues,
  ProjectScenario,
  TemplateKey,
} from "@/lib/types/project";

const newProjectSchema = z
  .object({
    scenario: z.enum(PROJECT_SCENARIOS),
    topic: z.string().min(1, "请输入 PPT 主题"),
    sourceText: z.string().optional(),
    uploadFile: z
      .any()
      .optional()
      .refine((fileList) => {
        const file = fileList?.[0] as File | undefined;

        if (!file) {
          return true;
        }

        const filename = file.name.toLowerCase();

        return filename.endsWith(".txt") || filename.endsWith(".md");
      }, "当前仅支持 txt / md 文件"),
    slideCount: z.string().min(1, "请选择页数"),
    templateKey: z.enum(TEMPLATE_KEYS),
  })
  .superRefine((values, context) => {
    const slideCounts = SLIDE_COUNTS_BY_SCENARIO[values.scenario];
    const templates = TEMPLATE_OPTIONS_BY_SCENARIO[values.scenario];

    if (!slideCounts.includes(values.slideCount)) {
      context.addIssue({
        code: "custom",
        path: ["slideCount"],
        message: "该场景不支持这个页数",
      });
    }

    if (!templates.some((template) => template.key === values.templateKey)) {
      context.addIssue({
        code: "custom",
        path: ["templateKey"],
        message: "该场景不支持这个模板",
      });
    }
  });

type NewProjectFormInput = z.infer<typeof newProjectSchema>;

export function NewProjectForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialScenario = normalizeScenario(searchParams.get("scenario"));
  const form = useForm<NewProjectFormInput>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      scenario: initialScenario,
      topic: "",
      sourceText: "",
      slideCount: getDefaultSlideCount(initialScenario),
      templateKey: getDefaultTemplateKey(initialScenario),
    },
  });
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = form;
  const scenario = watch("scenario");
  const slideCount = watch("slideCount");
  const templateKey = watch("templateKey");

  useEffect(() => {
    const currentSlideCount = getValues("slideCount");
    const currentTemplateKey = getValues("templateKey");

    if (!SLIDE_COUNTS_BY_SCENARIO[scenario].includes(currentSlideCount)) {
      setValue("slideCount", getDefaultSlideCount(scenario), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    if (
      !TEMPLATE_OPTIONS_BY_SCENARIO[scenario].some(
        (template) => template.key === currentTemplateKey,
      )
    ) {
      setValue("templateKey", getDefaultTemplateKey(scenario), {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  }, [getValues, scenario, setValue]);

  const selectedScenarioLabel = SCENARIO_LABELS[scenario];
  const selectedTemplate = useMemo(
    () =>
      TEMPLATE_OPTIONS_BY_SCENARIO[scenario].find(
        (template) => template.key === templateKey,
      ),
    [scenario, templateKey],
  );

  function updateScenario(value: ProjectScenario) {
    setValue("scenario", value, { shouldDirty: true, shouldValidate: true });
  }

  function updateSlideCount(value: string) {
    setValue("slideCount", value, { shouldDirty: true, shouldValidate: true });
  }

  function updateTemplateKey(value: TemplateKey) {
    setValue("templateKey", value, { shouldDirty: true, shouldValidate: true });
  }

  function onSubmit(values: NewProjectFormInput) {
    const project = createMockProject({
      ...values,
      topic: values.topic.trim(),
      sourceText: values.sourceText?.trim(),
    } as NewProjectFormValues);

    router.push(`/projects/${project.id}`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Card className="surface-panel">
        <CardHeader>
          <CardTitle>演示 brief</CardTitle>
          <CardDescription>
            像给设计师的一页说明：主题、资料、篇幅和视觉方向。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <ScenarioSelector
                value={scenario}
                onChange={updateScenario}
                error={errors.scenario?.message}
              />
              <SlideCountSelector
                scenario={scenario}
                value={slideCount}
                onChange={updateSlideCount}
                error={errors.slideCount?.message}
              />
            </div>

            <SourceInput
              topicProps={register("topic")}
              sourceTextProps={register("sourceText")}
              uploadFileProps={register("uploadFile")}
              topicPlaceholder={TOPIC_PLACEHOLDERS[scenario]}
              sourcePlaceholder={SOURCE_PLACEHOLDERS[scenario]}
              topicError={errors.topic?.message}
              sourceTextError={errors.sourceText?.message}
              uploadFileError={errors.uploadFile?.message?.toString()}
            />

            <TemplateSelector
              scenario={scenario}
              value={templateKey}
              onChange={updateTemplateKey}
              error={errors.templateKey?.message}
            />

            <Button type="submit" size="lg">
              <WandSparkles className="mr-2 h-4 w-4" />
              生成大纲
            </Button>
          </form>
        </CardContent>
      </Card>

      <aside className="space-y-4">
        <Card className="surface-panel overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">创作参数</CardTitle>
            <CardDescription>进入工作台后仍可继续调整内容。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">类型</span>
              <span className="font-medium">{selectedScenarioLabel}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">页数</span>
              <span className="font-medium">{slideCount} 页</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">模板</span>
              <span className="font-medium">
                {selectedTemplate?.name ?? templateKey}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="surface-panel overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">资料素材</CardTitle>
            <CardDescription>先支持 txt / md，后续再扩展 PDF 和 Word。</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-36 flex-col items-center justify-center rounded-md border border-dashed border-primary/20 bg-white/[0.42] p-5 text-center">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-primary shadow-sm">
                <FileUp className="h-5 w-5" />
              </span>
              <span className="mt-3 text-sm font-medium">资料文本可选</span>
              <span className="mt-1 text-xs text-muted-foreground">
                可先粘贴摘要、项目介绍或关键材料。
              </span>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
