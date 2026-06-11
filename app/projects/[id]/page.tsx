import { ProjectWorkspace } from "@/components/project/ProjectWorkspace";
import { getGeneratedProject } from "@/lib/server/projectStore";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = getGeneratedProject(id);

  return <ProjectWorkspace projectId={id} initialDetail={detail} />;
}
