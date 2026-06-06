import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SCENARIOS } from "@/lib/constants/scenarios";

const cardMeta = {
  research_presentation: {
    eyebrow: "Research deck",
    items: ["研究背景", "方法与数据", "实证/实验结果", "结论与启示"],
    tone: "from-[#d7dbe1]/70 via-[#dde5dd]/70 to-[#ead8cf]/60",
  },
  business_plan: {
    eyebrow: "Pitch deck",
    items: ["痛点机会", "产品方案", "商业模式", "里程碑"],
    tone: "from-[#c9b7a8]/55 via-[#d9d0c4]/70 to-[#c8d3ca]/65",
  },
};

export function ScenarioCards() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Two ateliers</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal">
            两种演示，都需要被认真设计
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          不做万能生成器。我们把结构、语气、视觉组件和可编辑导出，都收敛到科研汇报与商业计划书。
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {SCENARIOS.map((scenario) => {
          const Icon = scenario.icon;
          const meta = cardMeta[scenario.value];

          return (
            <Card key={scenario.value} className="morandi-card group overflow-hidden">
              <CardContent className="grid gap-6 p-6 lg:grid-cols-[1fr_220px]">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    {meta.eyebrow}
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold tracking-normal">
                    {scenario.label}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {scenario.description}
                  </p>
                  <Button asChild className="mt-6" variant="outline">
                    <Link href={scenario.href}>
                      {scenario.ctaLabel}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div
                  className={`soft-shimmer rounded-md border border-white/75 bg-gradient-to-br ${meta.tone} p-4 transition-all duration-700 group-hover:-translate-y-1`}
                >
                  <div className="rounded-md border border-white/70 bg-white/[0.65] p-3 shadow-sm">
                    <div className="h-2 w-16 rounded-sm bg-primary" />
                    <div className="mt-4 space-y-2">
                      {meta.items.map((item, index) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 rounded-sm bg-white/70 px-2 py-1.5 text-xs"
                        >
                          <span className="text-primary">{index + 1}</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
