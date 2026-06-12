import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import MobileApp from "@/components/MobileApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BePresent — Focus & Screen Time" },
      { name: "description", content: "Calm screen-time control, focus sessions, and gentle rewards for staying present." },
      { property: "og:title", content: "BePresent — Focus & Screen Time" },
      { property: "og:description", content: "Calm screen-time control, focus sessions, and gentle rewards for staying present." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <MobileApp />
      <Toaster position="top-center" richColors closeButton theme="light" />
    </>
  );
}
