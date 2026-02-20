import { redirect } from "next/navigation";

import { SignupForm } from "@/components/auth/signup-form";
import { getAuthSession } from "@/lib/auth/session";

export default async function SignupPage() {
  const session = await getAuthSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6 py-12">
      <SignupForm />
    </div>
  );
}
