import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Navbar } from "@/components/aigrid/Navbar";
import { Footer } from "@/components/aigrid/Footer";
import { SettingsPage } from "@/components/settings/SettingsPage";

export const metadata = {
  title: "Settings | AIGrid",
  description: "Manage your account settings",
};

export default async function Settings() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth?callbackUrl=/settings");
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <SettingsPage user={session.user} />
      </main>
      <Footer />
    </>
  );
}
