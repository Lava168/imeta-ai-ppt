import Link from "next/link";
import { Layers2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/[0.62] backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lg font-semibold text-foreground"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-foreground/92 text-white shadow-sm">
            <Layers2 className="h-4 w-4" />
          </span>
          iMeta
        </Link>
        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link className="transition-colors hover:text-foreground" href="/">
            产品
          </Link>
          <Link
            className="transition-colors hover:text-foreground"
            href="/templates"
          >
            模板
          </Link>
          <Link
            className="transition-colors hover:text-foreground"
            href="/examples"
          >
            示例
          </Link>
          <Button asChild size="sm">
            <Link href="/projects/new">开始生成</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
