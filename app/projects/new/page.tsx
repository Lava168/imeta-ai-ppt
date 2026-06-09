import { Suspense } from "react";
import { Sparkles } from "lucide-react";

import { AppShell } from "@/components/app/AppShell";
import { LoadingState } from "@/components/app/LoadingState";
import { NewProjectForm } from "@/components/project/NewProjectForm";

export default function NewProjectPage() {
  return (
    <AppShell>
      <div className="relative mx-auto w-full max-w-7xl px-6 py-8">
        <div className="atelier-grid pointer-events-none absolute inset-x-6 top-0 -z-10 h-[520px] opacity-70" />

        <div className="mb-7 overflow-hidden rounded-md border border-white/70 bg-white/[0.48] p-6 shadow-[0_22px_70px_rgba(64,58,50,0.08)] backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
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
              <MobileHeroDeckPreview />
            </div>
            <HeroDeckStack />
          </div>
        </div>

        <Suspense fallback={<LoadingState />}>
          <NewProjectForm />
        </Suspense>
      </div>
    </AppShell>
  );
}

function MobileHeroDeckPreview() {
  return (
    <div className="deck-stack mt-6 lg:hidden">
      <div className="motion-border kinetic-surface rounded-md bg-white/[0.58] p-3 shadow-[0_20px_58px_rgba(64,58,50,0.1)]">
        <div className="slow-pan rounded-md border border-white/75 bg-[linear-gradient(135deg,#fbfaf7,#dde5dd_45%,#d7dbe1_70%,#ead8cf)] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full border border-white/80 bg-white/[0.62] px-2.5 py-1 text-[11px] text-primary">
              editable preview
            </span>
            <span className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <div className="grid grid-cols-[1fr_88px] gap-4">
            <div>
              <div className="h-2 w-14 rounded-sm bg-primary" />
              <div className="mt-5 h-5 w-40 max-w-full rounded-sm bg-foreground/85" />
              <div className="mt-4 space-y-2">
                <div className="h-2.5 w-32 max-w-full rounded-sm bg-[#c9b7a8]" />
                <div className="h-2.5 w-24 rounded-sm bg-[#d7dbe1]" />
              </div>
            </div>
            <div className="soft-shimmer rounded-md border border-white/75 bg-[linear-gradient(135deg,#758b7f,#c9b7a8,#d7dbe1,#ede7dc)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroDeckStack() {
  return (
    <div className="deck-stack hidden lg:block">
      <div className="relative h-[250px]">
        <div className="deck-card absolute left-4 top-8 h-40 w-64 rotate-[-7deg] rounded-md border border-white/70 bg-[#d9d0c4]/70 shadow-[0_24px_70px_rgba(64,58,50,0.1)]" />
        <div className="deck-card absolute left-10 top-3 h-44 w-[17rem] rotate-[4deg] rounded-md border border-white/70 bg-[#d7dbe1]/80 shadow-[0_24px_70px_rgba(64,58,50,0.12)]" />
        <div className="deck-card motion-border absolute right-0 top-9 h-44 w-72 rounded-md bg-white/[0.72] p-4 shadow-[0_28px_80px_rgba(64,58,50,0.16)] backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full border border-white/80 bg-white/[0.62] px-2.5 py-1 text-[11px] text-primary">
              editable deck
            </span>
            <span className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <div className="slow-pan rounded-md border border-white/80 bg-[linear-gradient(135deg,#fbfaf7,#dde5dd_48%,#ead8cf)] p-4">
            <div className="h-2 w-16 rounded-sm bg-primary" />
            <div className="mt-5 h-5 w-44 rounded-sm bg-foreground/85" />
            <div className="mt-4 space-y-2">
              <div className="h-2.5 w-36 rounded-sm bg-[#c9b7a8]" />
              <div className="h-2.5 w-28 rounded-sm bg-[#d7dbe1]" />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="h-10 rounded-sm bg-white/70" />
              <div className="h-10 rounded-sm bg-[#d7dbe1]/70" />
              <div className="h-10 rounded-sm bg-[#ead8cf]/70" />
            </div>
          </div>
          <div className="mt-3 flex gap-2 text-[10px] text-muted-foreground">
            {["title", "bullets", "notes"].map((item) => (
              <span
                key={item}
                className="rounded-sm border border-white/75 bg-white/[0.62] px-2 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
