import Link from "next/link";
import { getServerSession } from "next-auth";

import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth/options";

export async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          ServiceNow SaaS
        </Link>
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <span className="text-sm text-muted-foreground">{session.user.email}</span>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
