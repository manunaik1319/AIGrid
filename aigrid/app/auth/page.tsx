import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = {
  title: "Sign In | AIGrid",
  description: "Sign in to your AIGrid account",
};

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <AuthForm />
    </div>
  );
}
