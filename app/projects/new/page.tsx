import { Suspense } from "react";
import { ArrowDownRight, Sparkles } from "lucide-react";

import { AppShell } from "@/components/app/AppShell";
import { LoadingState } from "@/components/app/LoadingState";
import { NewProjectForm } from "@/components/project/NewProjectForm";

export default function NewProjectPage() {
  return (
    <AppShell>
      <div className="relative mx-auto w-full max-w-7xl px-6 py-10">
        <div className="atelier-grid pointer-events-none absolute inset-x-6 top-0 -z-10 h-[520px] opacity-70" />

        <div className="mb-8 overflow-hidden rounded-md border border-white/70 bg-white/[0.48] p-6 shadow-[0_22px_70px_rgba(64,58,50,0.08)] backdrop-blur-xl md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/[0.58] px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Start with a brief
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-normal md:text-5xl">
                先把资料交给 iMeta，再进入可编辑演示工作台
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
                选择场景、主题和资料，iMeta 会先整理成结构化大纲，再逐页生成可编辑内容、备注和局部视觉。
              </p>
              <div className="mt-5 grid max-w-xl grid-cols-3 gap-2 text-xs">
                {["资料理解", "结构大纲", "可编辑 PPTX"].map((item, index) => (
                  <div
                    key={item}
                    className="stagger-rise rounded-md border border-white/70 bg-white/[0.52] px-3 py-2 shadow-sm"
                    style={{ animationDelay: `${index * 110}ms` }}
                  >
                    <div className="mb-2 h-1 overflow-hidden rounded-full bg-white/70">
                      <div className="soft-shimmer h-full rounded-full bg-[linear-gradient(90deg,#758b7f,#c9b7a8,#d7dbe1)]" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden min-w-64 rounded-md border border-white/70 bg-white/[0.46] p-4 text-sm shadow-sm lg:block">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Next step</span>
                <ArrowDownRight className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-3 font-semibold">生成结构化大纲</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/70">
                <div className="soft-shimmer h-full w-2/3 rounded-full bg-[linear-gradient(90deg,#758b7f,#c9b7a8,#d7dbe1)]" />
              </div>
            </div>
          </div>
        </div>

        <Suspense fallback={<LoadingState />}>
          <NewProjectForm />
        </Suspense>
      </div>
    </AppShell>
  );
}
