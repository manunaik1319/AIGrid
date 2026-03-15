import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { MyWorkflowsPage } from "@/components/workflows/MyWorkflowsPage";

export const metadata = {
  title: "My Workflows | AIGrid",
  description: "Manage your AI workflows",
};

export default async function WorkflowsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth?callbackUrl=/dashboard/workflows");
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <MyWorkflowsPage />
      </main>
      <Footer />
    </>
  );
}
