import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/login-form";
import { getAuthSession } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await getAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-12">
      <LoginForm />
    </div>
  );
}
