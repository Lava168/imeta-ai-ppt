export type ProjectScenario = "research_presentation" | "business_plan";

export type ProjectStatus =
  | "draft"
  | "outline_ready"
  | "generating"
  | "pptx_ready"
  | "failed";

export type TemplateKey =
  | "research_classic"
  | "research_modern"
  | "business_clean"
  | "business_dark";

export type NewProjectFormValues = {
  scenario: ProjectScenario;
  topic: string;
  sourceText?: string;
  uploadFile?: FileList;
  slideCount: string;
  templateKey: TemplateKey;
};

export type ProjectViewModel = {
  id: string;
  title: string;
  scenario: ProjectScenario;
  topic: string;
  sourceText?: string;
  slideCount: number;
  templateKey: TemplateKey;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};
