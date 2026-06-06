import { Card, CardContent } from "@/components/ui/card";

export function LoadingState() {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="h-5 w-36 rounded-sm bg-muted" />
        <div className="h-10 w-full rounded-sm bg-muted" />
        <div className="h-28 w-full rounded-sm bg-muted" />
      </CardContent>
    </Card>
  );
}
