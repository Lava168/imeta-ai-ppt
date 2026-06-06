import type { ReactNode } from "react";

import { AppHeader } from "@/components/app/AppHeader";

type AppShellProps = {
  children: ReactNode;
  withHeader?: boolean;
  className?: string;
};

export function AppShell({
  children,
  withHeader = true,
  className,
}: AppShellProps) {
  return (
    <main className={className ?? "min-h-screen"}>
      {withHeader ? <AppHeader /> : null}
      {children}
    </main>
  );
}
