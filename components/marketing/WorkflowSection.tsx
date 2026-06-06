import { FileText, PencilLine, Presentation } from "lucide-react";

const steps = [
  {
    title: "给资料",
    description: "输入主题，粘贴论文摘要、研究材料或项目说明，也可以上传 txt / md。",
    icon: FileText,
  },
  {
    title: "审大纲",
    description: "系统先生成结构化大纲，缺失事实会标记待补充，避免直接编造内容。",
    icon: PencilLine,
  },
  {
    title: "导出 PPTX",
    description: "文字、形状、表格和局部视觉组件分层导出，方便继续在 PowerPoint 修改。",
    icon: Presentation,
  },
];

export function WorkflowSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <div className="mb-7 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Workflow</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal">
            像请一位懂演示的助理先搭好骨架
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          借鉴主流 AI 演示平台的快速生成体验，但把重点收敛到资料理解、可编辑结构和 PPTX 交付。
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.title}
              className="morandi-card premium-lift relative overflow-hidden rounded-md p-5"
            >
              <div className="absolute right-4 top-4 text-5xl font-semibold text-primary/[0.06]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-md bg-foreground/90 text-white shadow-sm">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
