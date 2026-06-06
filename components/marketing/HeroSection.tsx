import Link from "next/link";
import { ArrowRight, Image as ImageIcon, Layers3, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="overflow-hidden border-b border-white/70">
      <div className="mx-auto grid min-h-[650px] w-full max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/[0.58] px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/[0.76]">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            可编辑 PPTX，局部视觉组件可 AI 生成
          </div>
          <h1 className="mt-7 text-balance text-4xl font-semibold tracking-normal text-foreground sm:text-6xl">
            上传资料，生成可编辑的科研汇报与商业计划书
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            iMeta 更像一间安静的演示设计工作室：先读懂论文或项目资料，再搭好结构、备注和局部视觉。导出的 PPTX 不是整页图片，标题、正文和形状仍然可以在 PowerPoint 里直接编辑。
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/projects/new">
                开始生成
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/examples">查看示例</Link>
            </Button>
          </div>
          <div className="mt-9 flex flex-wrap gap-3 text-xs text-muted-foreground">
            {["科研论文汇报", "商业计划书", "非图片版 PPTX"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/75 bg-white/50 px-3 py-1.5 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/[0.78]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <ProductStage />
      </div>
    </section>
  );
}

function ProductStage() {
  return (
    <div className="relative min-h-[520px]">
      <div className="ambient-float-slow absolute left-8 top-0 h-28 w-44 rounded-md border border-white/[0.65] bg-[#d7d0c2]/[0.42] shadow-[0_18px_50px_rgba(64,58,50,0.06)]" />
      <div className="ambient-float absolute bottom-4 right-8 h-32 w-36 rounded-md border border-white/[0.65] bg-accent/[0.28] shadow-[0_18px_50px_rgba(64,58,50,0.06)]" />

      <div className="surface-panel ambient-float relative mx-auto max-w-2xl rounded-md p-4">
        <div className="rounded-md border border-white/75 bg-[#fbfaf7]/92 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground text-white">
                <Layers3 className="h-4 w-4" />
              </span>
              iMeta Studio
            </div>
            <span className="rounded-full border bg-white/70 px-3 py-1 text-[11px] text-muted-foreground">
              editable deck
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-[132px_1fr]">
            <div className="space-y-2">
              {["封面", "背景", "方法", "结果"].map((item, index) => (
                <div
                  key={item}
                  className="rounded-md border border-border/60 bg-white/[0.58] p-3 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/[0.78]"
                >
                  <span className="text-[11px] font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-xs text-foreground/80">{item}</p>
                </div>
              ))}
            </div>

            <div className="rounded-md border border-border/60 bg-white/[0.86] p-5 shadow-[0_22px_55px_rgba(64,58,50,0.08)] transition-all duration-700 hover:-translate-y-1">
              <div className="soft-shimmer aspect-video rounded-md border bg-[linear-gradient(135deg,#fbfaf7,#dde5dd_42%,#d8dbe1_68%,#ead8cf)] p-6">
                <p className="text-xs font-semibold uppercase text-primary">
                  cover
                </p>
                <h3 className="mt-4 max-w-sm text-2xl font-semibold tracking-normal">
                  研究问题如何被清晰讲出来
                </h3>
                <div className="mt-6 grid grid-cols-[1fr_140px] gap-5">
                  <div className="space-y-3">
                    {["研究背景", "方法设计", "关键发现"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-foreground/80">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-md border bg-white/70 p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-medium text-primary">
                      <ImageIcon className="h-3.5 w-3.5" />
                      local visual
                    </div>
                    <div className="soft-shimmer mt-3 h-20 rounded-sm bg-[linear-gradient(135deg,#758b7f,#c9b7a8,#d7dbe1,#ede7dc)]" />
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
                {["title", "bullets", "ai_image"].map((item) => (
                  <div
                    key={item}
                    className="rounded-sm border bg-white/70 px-2 py-1.5"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
