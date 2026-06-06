"use client";

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
      <div className="space-y-2 rounded-md border border-white/70 bg-white/[0.45] p-4">
        <Label htmlFor="topic">主题</Label>
        <Input id="topic" placeholder={topicPlaceholder} {...topicProps} />
        {topicError ? <p className="text-xs text-red-600">{topicError}</p> : null}
      </div>

      <div className="space-y-2 rounded-md border border-white/70 bg-white/[0.45] p-4">
        <Label htmlFor="sourceText">资料文本</Label>
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

      <div className="space-y-2 rounded-md border border-dashed border-primary/20 bg-white/[0.36] p-4">
        <Label htmlFor="uploadFile">上传文件</Label>
        <Input id="uploadFile" type="file" accept=".txt,.md" {...uploadFileProps} />
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
