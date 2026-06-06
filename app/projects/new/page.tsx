import { Suspense } from "react";

import { AppShell } from "@/components/app/AppShell";
import { LoadingState } from "@/components/app/LoadingState";
import { NewProjectForm } from "@/components/project/NewProjectForm";

export default function NewProjectPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-3">
          <p className="eyebrow">Start with a brief</p>
          <div>
            <h1 className="text-4xl font-semibold tracking-normal">
              先写下这份演示的方向
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              选择场景、主题和资料，iMeta 会先整理成结构化大纲，再进入工作台逐页打磨。
            </p>
          </div>
        </div>

        <Suspense fallback={<LoadingState />}>
          <NewProjectForm />
        </Suspense>
      </div>
    </AppShell>
  );
}
