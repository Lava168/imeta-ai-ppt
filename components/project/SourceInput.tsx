"use client";

import { FileText, UploadCloud } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SourceInputProps = {
  topicProps: UseFormRegisterReturn<"topic">;
  sourceTextProps: UseFormRegisterReturn<"sourceText">;
  uploadFileProps: UseFormRegisterReturn<"uploadFile">;
  topicPlaceholder: string;
  sourcePlaceholder: string;
  topicError?: string;
  sourceTextError?: string;
  uploadFileError?: string;
};

export function SourceInput({
  topicProps,
  sourceTextProps,
  uploadFileProps,
  topicPlaceholder,
  sourcePlaceholder,
  topicError,
  sourceTextError,
  uploadFileError,
}: SourceInputProps) {
  return (
    <div className="space-y-5">
      <div className="focus-field space-y-2 rounded-md border border-white/70 bg-white/[0.45] p-4">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="topic">主题</Label>
          <span className="rounded-full bg-white/[0.58] px-2.5 py-1 text-[11px] text-muted-foreground">
            required
          </span>
        </div>
        <Input id="topic" placeholder={topicPlaceholder} {...topicProps} />
        {topicError ? <p className="text-xs text-red-600">{topicError}</p> : null}
      </div>

      <div className="focus-field space-y-2 rounded-md border border-white/70 bg-white/[0.45] p-4">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="sourceText">资料文本</Label>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.58] px-2.5 py-1 text-[11px] text-muted-foreground">
            <FileText className="h-3 w-3" />
            optional
          </span>
        </div>
        <Textarea
          id="sourceText"
          placeholder={sourcePlaceholder}
          rows={8}
          {...sourceTextProps}
        />
        <p className="text-xs leading-5 text-muted-foreground">
          建议粘贴摘要、方法、结果、市场信息或团队资料。缺少的事实会显示为“待补充”。
        </p>
        {sourceTextError ? (
          <p className="text-xs text-red-600">{sourceTextError}</p>
        ) : null}
      </div>

      <div className="focus-field space-y-3 rounded-md border border-dashed border-primary/25 bg-white/[0.36] p-4">
        <div className="flex items-center justify-between gap-3">
          <Label htmlFor="uploadFile">上传文件</Label>
          <UploadCloud className="h-4 w-4 text-primary" />
        </div>
        <div className="rounded-md border border-white/70 bg-white/[0.44] p-3">
          <Input id="uploadFile" type="file" accept=".txt,.md" {...uploadFileProps} />
        </div>
        <p className="text-xs text-muted-foreground">
          当前支持 txt / md。PDF 与 Word 将在后续阶段接入。
        </p>
        {uploadFileError ? (
          <p className="text-xs text-red-600">{uploadFileError}</p>
        ) : null}
      </div>
    </div>
  );
}
