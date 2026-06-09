import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ExamplePreviewProps = {
  title: string;
  scenario: string;
  description: string;
  sections: string[];
  icon: LucideIcon;
  href: string;
};

export function ExamplePreview({
  title,
  scenario,
  description,
  sections,
  icon: Icon,
  href,
}: ExamplePreviewProps) {
  return (
    <Card className="morandi-card overflow-hidden bg-white/[0.58]">
      <CardContent className="p-0">
        <div className="border-b border-white/70 bg-white/50 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-primary">{scenario}</p>
              <h2 className="mt-3 text-xl font-semibold">{title}</h2>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-foreground/90 text-white">
              <Icon className="h-5 w-5" />
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
          <Button asChild className="mt-5" variant="outline">
            <Link href={href}>
              打开完整示例
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="bg-[#f7f3eb] p-4">
          <div className="aspect-video rounded-md border bg-[#fffdf8] p-5 text-foreground shadow-inner shadow-white/70">
            <div className="flex h-full gap-4">
              <div className="w-24 space-y-2">
                {sections.map((section, index) => (
                  <div
                    key={section}
                    className="rounded-sm border bg-white/[0.72] px-2 py-1.5 text-[11px] shadow-sm"
                  >
                    <span className="font-semibold text-primary">
                      {index + 1}
                    </span>
                    <span className="ml-1">{section}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1 rounded-md border bg-white/90 p-5 shadow-sm">
                <div className="h-2 w-20 rounded-sm bg-primary" />
                <div className="mt-8 h-6 w-3/4 rounded-sm bg-foreground/85" />
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-2/3 rounded-sm bg-[#d9d0c4]" />
                  <div className="h-3 w-1/2 rounded-sm bg-[#e6ded3]" />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <div className="h-16 rounded-sm bg-secondary" />
                  <div className="h-16 rounded-sm bg-accent/70" />
                  <div className="h-16 rounded-sm bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
