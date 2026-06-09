import Link from "next/link";
import { BookOpenText, Building2 } from "lucide-react";

import { AppShell } from "@/components/app/AppShell";
import { ExamplePreview } from "@/components/marketing/ExamplePreview";
import { Button } from "@/components/ui/button";

const examples = [
  {
    title: "生成式 AI 医学影像论文汇报",
    scenario: "科研论文汇报 PPT",
    description: "包含研究背景、方法、实验结果、稳健性分析和 Q&A。",
    sections: ["研究背景", "数据与方法", "实验结果", "结论与展望"],
    icon: BookOpenText,
    href: "/projects/example-research-medical-ai",
  },
  {
    title: "AI 销售助手商业计划书",
    scenario: "商业计划书 PPT",
    description: "包含痛点、解决方案、市场规模、商业模式和融资计划。",
    sections: ["痛点与机会", "产品展示", "商业模式", "里程碑"],
    icon: Building2,
    href: "/projects/example-business-sales-ai",
  },
];

export default function ExamplesPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Gallery</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal">
              两种演示的成稿气质
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              当前是静态 mock，用来展示 iMeta 生成后的结构、节奏和视觉方向。
            </p>
          </div>
          <Button asChild>
            <Link href="/projects/new">开始生成</Link>
          </Button>
        </div>

        <section className="grid gap-5 md:grid-cols-2">
          {examples.map((example) => (
            <ExamplePreview key={example.title} {...example} />
          ))}
        </section>
      </div>
    </AppShell>
  );
}
