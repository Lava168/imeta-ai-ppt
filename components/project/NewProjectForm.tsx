"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  BrainCircuit,
  BadgeCheck,
  FileText,
  Layers3,
  MessageSquareText,
  WandSparkles,
} from "lucide-react";
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
  const topic = watch("topic");
  const sourceText = watch("sourceText");

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
  const previewSections =
    scenario === "research_presentation"
      ? ["研究背景", "方法与数据", "实验结果", "结论与展望"]
      : ["痛点机会", "解决方案", "商业模式", "增长里程碑"];

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
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_430px]">
      <Card className="surface-panel kinetic-surface motion-border">
        <CardHeader className="border-b border-white/70 bg-white/[0.36]">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="eyebrow">Brief Studio</p>
              <CardTitle className="mt-2 text-2xl">演示 brief</CardTitle>
              <CardDescription className="mt-2">
                像给设计师的一页说明：主题、资料、篇幅和视觉方向。
              </CardDescription>
            </div>
            <div className="rounded-full border border-white/75 bg-white/[0.56] px-3 py-1.5 text-xs text-muted-foreground shadow-sm">
              Outline first · Editable PPTX
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="xl:hidden">
              <CompactDeckPreview
                scenarioLabel={selectedScenarioLabel}
                topic={topic}
                slideCount={slideCount}
                templateName={selectedTemplate?.name ?? templateKey}
              />
            </div>

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

            <div className="sticky bottom-4 z-10 rounded-md border border-white/75 bg-white/[0.72] p-3 shadow-[0_18px_55px_rgba(64,58,50,0.12)] backdrop-blur-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold">准备生成结构化大纲</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    先进入工作台预览和编辑，再导出可编辑 PPTX。
                  </p>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="kinetic-surface shrink-0 overflow-hidden"
                >
                  <WandSparkles className="mr-2 h-4 w-4" />
                  生成大纲
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
        <LiveDeckPreview
          scenarioLabel={selectedScenarioLabel}
          topic={topic}
          slideCount={slideCount}
          templateName={selectedTemplate?.name ?? templateKey}
          sourceText={sourceText ?? ""}
          previewSections={previewSections}
        />

        <GenerationTrack scenario={scenario} />

        <Card className="surface-panel overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg">可信生成原则</CardTitle>
            <CardDescription>iMeta 优先保证可编辑和事实边界。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "缺失事实标记待补充",
              "标题正文保持可编辑",
              "图片只作为局部组件",
            ].map((item, index) => (
              <div
                key={item}
                className="stagger-rise flex items-center gap-3 rounded-md border border-white/70 bg-white/[0.46] p-3 text-sm"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary text-primary">
                  <BadgeCheck className="h-4 w-4" />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

function LiveDeckPreview({
  scenarioLabel,
  topic,
  slideCount,
  templateName,
  sourceText,
  previewSections,
}: {
  scenarioLabel: string;
  topic: string;
  slideCount: string;
  templateName: string;
  sourceText: string;
  previewSections: string[];
}) {
  const filledSource = sourceText.trim().length > 0;

  return (
    <Card className="surface-panel kinetic-surface overflow-hidden">
      <CardHeader className="border-b border-white/70 bg-white/[0.36]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Live preview</p>
            <CardTitle className="mt-2 text-lg">生成预览</CardTitle>
          </div>
          <span className="rounded-full border border-white/75 bg-white/[0.58] px-3 py-1 text-xs text-muted-foreground shadow-sm">
            {slideCount} pages
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="slow-pan rounded-md border border-white/75 bg-[linear-gradient(135deg,#fbfaf7,#dde5dd_42%,#d7dbe1_70%,#ead8cf)] p-4">
          <div className="rounded-md border border-white/75 bg-white/[0.66] p-4 shadow-sm backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground text-white">
                  <Layers3 className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold">{scenarioLabel}</span>
              </div>
              <span className="rounded-full border bg-white/[0.66] px-2.5 py-1 text-[11px] text-muted-foreground">
                {templateName}
              </span>
            </div>

            <div className="mb-3 flex gap-2">
              {previewSections.map((section, index) => (
                <div
                  key={section}
                  className="stagger-rise flex-1 rounded-sm border border-white/70 bg-white/[0.54] px-2 py-1.5 text-[10px] text-muted-foreground"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <span className="font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="ml-1 hidden sm:inline xl:hidden 2xl:inline">
                    {section}
                  </span>
                </div>
              ))}
            </div>

            <div className="aspect-video rounded-md border border-white/80 bg-[#fffdf8] p-5 shadow-[0_18px_44px_rgba(64,58,50,0.08)]">
              <p className="text-xs font-semibold uppercase text-primary">
                cover
              </p>
              <h3 className="mt-4 line-clamp-2 text-2xl font-semibold tracking-normal">
                {topic.trim() || "输入主题后，预览会同步更新"}
              </h3>
              <div className="mt-5 grid grid-cols-[1fr_110px] gap-4">
                <div className="space-y-2">
                  {previewSections.slice(0, 3).map((section, index) => (
                    <div key={section} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{section}</span>
                      <span
                        className="stagger-rise h-px flex-1 bg-border/70"
                        style={{ animationDelay: `${index * 120}ms` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="soft-shimmer rounded-md border border-white/75 bg-[linear-gradient(135deg,#758b7f,#c9b7a8,#d7dbe1,#ede7dc)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <Metric label="资料" value={filledSource ? "已补充" : "可选"} />
          <Metric label="备注" value="自动生成" />
          <Metric label="导出" value="可编辑" />
        </div>
      </CardContent>
    </Card>
  );
}

function CompactDeckPreview({
  scenarioLabel,
  topic,
  slideCount,
  templateName,
}: {
  scenarioLabel: string;
  topic: string;
  slideCount: string;
  templateName: string;
}) {
  return (
    <div className="kinetic-surface rounded-md border border-white/70 bg-white/[0.46] p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-primary">{scenarioLabel}</span>
        <span className="rounded-full border border-white/70 bg-white/[0.58] px-2.5 py-1 text-muted-foreground">
          {slideCount} 页 · {templateName}
        </span>
      </div>
      <div className="slow-pan rounded-md border border-white/75 bg-[linear-gradient(135deg,#fbfaf7,#dde5dd_45%,#d7dbe1_72%,#ead8cf)] p-4">
        <p className="text-[11px] font-semibold uppercase text-primary">
          preview
        </p>
        <h3 className="mt-3 line-clamp-2 text-lg font-semibold">
          {topic.trim() || "输入主题后，预览会同步更新"}
        </h3>
        <div className="mt-4 grid grid-cols-[1fr_92px] gap-3">
          <div className="space-y-2">
            <div className="h-2 w-2/3 rounded-sm bg-foreground/80" />
            <div className="h-2 w-1/2 rounded-sm bg-[#c9b7a8]" />
            <div className="h-2 w-3/5 rounded-sm bg-[#d7dbe1]" />
          </div>
          <div className="soft-shimmer h-16 rounded-md border border-white/75 bg-[linear-gradient(135deg,#758b7f,#c9b7a8,#d7dbe1,#ede7dc)]" />
        </div>
      </div>
    </div>
  );
}

function GenerationTrack({ scenario }: { scenario: ProjectScenario }) {
  const steps =
    scenario === "research_presentation"
      ? [
          { title: "提炼问题", icon: BrainCircuit },
          { title: "整理方法", icon: FileText },
          { title: "补充备注", icon: MessageSquareText },
        ]
      : [
          { title: "识别痛点", icon: BrainCircuit },
          { title: "组织商业模型", icon: FileText },
          { title: "生成路演话术", icon: MessageSquareText },
        ];

  return (
    <Card className="surface-panel overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">AI 生成路径</CardTitle>
        <CardDescription>先结构，后内容，再导出可编辑 PPTX。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="pulse-thread stagger-rise flex items-center gap-3 rounded-md border border-white/70 bg-white/[0.46] p-3"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary text-primary shadow-sm">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">{step.title}</p>
                <p className="text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")} · 可编辑结构
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/70 bg-white/[0.48] p-3 shadow-sm">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-primary">{value}</p>
    </div>
  );
}
