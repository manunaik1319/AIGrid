import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export const metadata = {
  title: "Dashboard | AIGrid",
  description: "Your AI toolkit dashboard",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth?callbackUrl=/dashboard");
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <DashboardContent user={session.user} />
      </main>
      <Footer />
    </>
  );
}
