"use client";

import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { OutlineSection } from "@/lib/sample-outlines";

type OutlineEditorProps = {
  initialSections: OutlineSection[];
};

export function OutlineEditor({ initialSections }: OutlineEditorProps) {
  const [sections, setSections] = useState<OutlineSection[]>(initialSections);

  const totalBullets = useMemo(
    () => sections.reduce((sum, section) => sum + section.bullets.length, 0),
    [sections],
  );

  function updateSectionTitle(sectionId: string, title: string) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              title,
            }
          : section,
      ),
    );
  }

  function updateSpeakerNotes(sectionId: string, speakerNotes: string) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              speakerNotes,
            }
          : section,
      ),
    );
  }

  function updateBullet(sectionId: string, bulletIndex: number, value: string) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              bullets: section.bullets.map((bullet, index) =>
                index === bulletIndex ? value : bullet,
              ),
            }
          : section,
      ),
    );
  }

  function addBullet(sectionId: string) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              bullets: [...section.bullets, "新增要点"],
            }
          : section,
      ),
    );
  }

  function removeBullet(sectionId: string, bulletIndex: number) {
    setSections((current) =>
      current.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              bullets: section.bullets.filter(
                (_, index) => index !== bulletIndex,
              ),
            }
          : section,
      ),
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col justify-between gap-3 rounded-md border bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div>
          <h2 className="text-base font-semibold">大纲结构</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {sections.length} 个部分，{totalBullets} 个正文要点，支持逐部分演讲备注
          </p>
        </div>
        <Button type="button" variant="outline" disabled>
          保存修改
        </Button>
      </div>

      {sections.map((section, sectionIndex) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle className="text-lg">
              第 {sectionIndex + 1} 部分
            </CardTitle>
            <CardDescription>编辑标题、正文要点和该部分演讲备注。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor={`${section.id}-title`}>部分标题</Label>
              <Input
                id={`${section.id}-title`}
                value={section.title}
                onChange={(event) =>
                  updateSectionTitle(section.id, event.target.value)
                }
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <Label>正文要点</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => addBullet(section.id)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  添加要点
                </Button>
              </div>

              <div className="space-y-2">
                {section.bullets.map((bullet, bulletIndex) => (
                  <div
                    key={`${section.id}-${bulletIndex}`}
                    className="grid grid-cols-[1fr_40px] gap-2"
                  >
                    <Input
                      value={bullet}
                      aria-label={`第 ${sectionIndex + 1} 部分要点 ${
                        bulletIndex + 1
                      }`}
                      onChange={(event) =>
                        updateBullet(
                          section.id,
                          bulletIndex,
                          event.target.value,
                        )
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBullet(section.id, bulletIndex)}
                      disabled={section.bullets.length <= 1}
                      aria-label="删除要点"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${section.id}-note`}>演讲备注</Label>
              <Textarea
                id={`${section.id}-note`}
                value={section.speakerNotes}
                onChange={(event) =>
                  updateSpeakerNotes(section.id, event.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
