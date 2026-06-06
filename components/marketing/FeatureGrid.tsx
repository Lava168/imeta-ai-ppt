import {
  BadgeCheck,
  FileText,
  Image,
  MessageSquareText,
  PencilRuler,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const valueProps = [
  {
    title: "可编辑 PPTX",
    description: "标题、正文、形状和图表优先使用 PowerPoint 可编辑元素。",
    icon: FileText,
  },
  {
    title: "结构化大纲",
    description: "先生成汇报结构，再进入逐页内容编辑。",
    icon: PencilRuler,
  },
  {
    title: "组件级生图",
    description: "仅为封面视觉、概念插图、产品 mockup 等局部组件生成图片。",
    icon: Image,
  },
  {
    title: "支持演讲备注",
    description: "每页可维护 speaker notes，方便答辩、路演和组会。",
    icon: MessageSquareText,
  },
  {
    title: "缺失标记待补充",
    description: "不编造数据，缺少事实、数字和结果时标记为待补充。",
    icon: BadgeCheck,
  },
];

export function FeatureGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-16">
      <div className="surface-panel rounded-md p-4 md:p-6">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {valueProps.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title} className="morandi-card border-white/70 bg-white/50">
                <CardContent className="p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-foreground/90 text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
