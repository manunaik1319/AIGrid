import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

const ADMIN_SECRET = new TextEncoder().encode(
  process.env.ADMIN_SECRET ?? "fallback-secret"
);

export const metadata = { title: "Admin Dashboard | AIGrid" };

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) redirect("/admin/login");

  try {
    const { payload } = await jwtVerify(token, ADMIN_SECRET);
    const username = payload.username as string;
    return <AdminDashboard username={username} />;
  } catch {
    redirect("/admin/login");
  }
}
