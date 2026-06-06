import Link from "next/link";

import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TEMPLATES } from "@/lib/constants/templates";

export default function TemplatesPage() {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Visual language</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-normal">
              四套起步视觉语言
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              模板决定字体、配色、形状风格和基础版式，但导出时仍保持 PPTX 可编辑。
            </p>
          </div>
          <Button asChild>
            <Link href="/projects/new">选择模板生成</Link>
          </Button>
        </div>

        <section className="grid gap-5 md:grid-cols-2">
          {TEMPLATES.map((template, index) => (
            <Card key={template.key} className="morandi-card overflow-hidden">
              <CardContent className="grid gap-0 p-0 lg:grid-cols-[1fr_260px]">
                <div className="p-6">
                  <p className="text-sm font-medium text-primary">
                    {template.scenarioLabel}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold">
                    {template.name}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {template.key}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                <TemplateMiniature index={index} />
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </AppShell>
  );
}

function TemplateMiniature({ index }: { index: number }) {
  const palettes = [
    "bg-[linear-gradient(135deg,#fbfaf7,#dde5dd,#d7dbe1)]",
    "bg-[linear-gradient(135deg,#f6f1e9,#d9d0c4,#d7dbe1)]",
    "bg-[linear-gradient(135deg,#fbfaf7,#c8d3ca,#ead8cf)]",
    "bg-[linear-gradient(135deg,#5f676d,#758b7f,#a88f82)]",
  ];
  const dark = index === 3;

  return (
    <div className="border-t bg-[#f7f3eb] p-4 lg:border-l lg:border-t-0">
      <div className={`aspect-video rounded-md p-4 ${palettes[index]}`}>
        <div className={dark ? "h-2 w-20 rounded-sm bg-[#d9d0c4]" : "h-2 w-20 rounded-sm bg-primary"} />
        <div className={dark ? "mt-7 h-5 w-3/4 rounded-sm bg-white" : "mt-7 h-5 w-3/4 rounded-sm bg-slate-900"} />
        <div className={dark ? "mt-4 h-3 w-2/3 rounded-sm bg-white/45" : "mt-4 h-3 w-2/3 rounded-sm bg-[#d9d0c4]"} />
        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className={dark ? "h-12 rounded-sm bg-white/10" : "h-12 rounded-sm bg-white/80"} />
          <div className={dark ? "h-12 rounded-sm bg-[#d9d0c4]/25" : "h-12 rounded-sm bg-[#d7dbe1]"} />
          <div className={dark ? "h-12 rounded-sm bg-[#ead8cf]/25" : "h-12 rounded-sm bg-[#ead8cf]"} />
        </div>
      </div>
    </div>
  );
}
