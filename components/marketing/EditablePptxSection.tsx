import { Ban, CheckCircle2, Layers3 } from "lucide-react";

const editableItems = [
  "标题与正文用 PowerPoint 文本框",
  "bullet、表格、形状保持可编辑",
  "AI 图片只作为局部视觉组件",
];

const blockedItems = [
  "不把整页 HTML 截图塞进 PPT",
  "不把整页 Canvas 渲染成图片",
  "不把研究结果和财务图伪装成图片版幻灯片",
];

export function EditablePptxSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <div className="surface-panel overflow-hidden rounded-md">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="p-6 md:p-8">
            <p className="eyebrow">Editable by design</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal">
              iMeta 的成品不是“看起来像 PPT 的图片”
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              很多 AI 演示工具擅长快速生成漂亮页面，但用户真正交付时仍需要修改标题、删改 bullet、替换图表和补充数据。iMeta 从第一版就把可编辑 PPTX 当作产品边界。
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Checklist title="会这样做" items={editableItems} positive />
              <Checklist title="不会这样做" items={blockedItems} />
            </div>
          </div>

          <div className="slow-pan border-t border-white/70 bg-[linear-gradient(135deg,#fbfaf7,#dde5dd_42%,#d7dbe1_68%,#ead8cf)] p-6 lg:border-l lg:border-t-0">
            <div className="atelier-glow mx-auto max-w-xl rounded-md border border-white/75 bg-white/[0.62] p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground text-white">
                    <Layers3 className="h-4 w-4" />
                  </span>
                  PPTX layer map
                </div>
                <span className="rounded-full border bg-white/[0.66] px-3 py-1 text-[11px] text-muted-foreground">
                  editable
                </span>
              </div>

              <div className="mt-5 aspect-video rounded-md border border-white/75 bg-[#fffdf8] p-5 shadow-sm">
                <div className="h-3 w-20 rounded-sm bg-primary" />
                <div className="mt-6 h-7 w-2/3 rounded-sm bg-foreground/85" />
                <div className="mt-5 grid grid-cols-[1fr_150px] gap-4">
                  <div className="space-y-3">
                    <div className="h-3 w-4/5 rounded-sm bg-[#d9d0c4]" />
                    <div className="h-3 w-2/3 rounded-sm bg-[#d9d0c4]/80" />
                    <div className="h-3 w-3/5 rounded-sm bg-[#d9d0c4]/70" />
                  </div>
                  <div className="soft-shimmer rounded-md border border-primary/15 bg-[linear-gradient(135deg,#758b7f,#c9b7a8,#d7dbe1,#ede7dc)]" />
                </div>
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {["text", "bullets", "shape", "image"].map((item) => (
                    <div
                      key={item}
                      className="rounded-sm border border-white/75 bg-white/[0.7] px-2 py-1 text-[11px] text-muted-foreground"
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
    </section>
  );
}

function Checklist({
  title,
  items,
  positive = false,
}: {
  title: string;
  items: string[];
  positive?: boolean;
}) {
  const Icon = positive ? CheckCircle2 : Ban;

  return (
    <div className="rounded-md border border-white/70 bg-white/[0.48] p-4">
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item} className="flex gap-2 text-sm text-muted-foreground">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
