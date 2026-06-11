import { NextResponse } from "next/server";

import { patchStoredComponent } from "@/lib/server/projectStore";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ componentId: string }> },
) {
  const { componentId } = await params;
  const patch = await request.json();
  const updated = patchStoredComponent(componentId, patch);

  if (!updated) {
    return NextResponse.json({ error: "组件不存在" }, { status: 404 });
  }

  return NextResponse.json({ component: updated.component });
}
