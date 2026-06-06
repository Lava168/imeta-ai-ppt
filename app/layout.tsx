import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 科研与商业汇报 PPT 生成器",
  description: "生成科研论文汇报和商业计划书 PPT，支持大纲编辑与可编辑 PPTX 导出。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
