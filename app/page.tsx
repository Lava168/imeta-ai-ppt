import { AppShell } from "@/components/app/AppShell";
import { EditablePptxSection } from "@/components/marketing/EditablePptxSection";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ScenarioCards } from "@/components/marketing/ScenarioCards";
import { WorkflowSection } from "@/components/marketing/WorkflowSection";

export default function HomePage() {
  return (
    <AppShell>
      <HeroSection />
      <WorkflowSection />
      <ScenarioCards />
      <EditablePptxSection />
      <FeatureGrid />
    </AppShell>
  );
}
