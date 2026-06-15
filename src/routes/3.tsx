import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/3")({
  component: Page3,
});

function Page3() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Página /3</p>
    </div>
  );
}
