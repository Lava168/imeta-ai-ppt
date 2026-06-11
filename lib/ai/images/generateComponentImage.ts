import OpenAI from "openai";

import { buildImagePrompt } from "@/lib/ai/images/buildImagePrompt";
import type {
  ComponentImageInput,
  ComponentImageResult,
} from "@/lib/ai/images/types";

export async function generateComponentImage(
  input: ComponentImageInput,
): Promise<ComponentImageResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey.includes("your-api-key")) {
    throw new Error("未配置 OPENAI_API_KEY，暂不能生成 AI 图片。");
  }

  const client = new OpenAI({ apiKey });
  const prompt = buildImagePrompt(input);
  const response = await client.images.generate({
    model: process.env.OPENAI_IMAGE_MODEL || "gpt-image-1",
    prompt,
    size: toImageSize(input.aspectRatio),
  });
  const image = response.data?.[0];

  if (!image?.b64_json) {
    throw new Error("图片生成失败，请稍后重试。");
  }

  return {
    imageUrl: `data:image/png;base64,${image.b64_json}`,
    revisedPrompt: prompt,
  };
}

function toImageSize(aspectRatio: ComponentImageInput["aspectRatio"]) {
  if (aspectRatio === "1:1") {
    return "1024x1024" as const;
  }

  if (aspectRatio === "3:2" || aspectRatio === "4:3") {
    return "1536x1024" as const;
  }

  return "1792x1024" as const;
}
