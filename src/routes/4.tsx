import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/4")({
  component: Page4,
});

function Page4() {
  return <div></div>;
}
