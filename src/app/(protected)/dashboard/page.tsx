import { CreditCard, Shield, UserCircle2 } from "lucide-react";

import { SignOutButton } from "@/components/dashboard/signout-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth/session";

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session?.user) {
    return null;
  }

  const cards = [
    {
      title: "Account",
      value: session.user.name || "No name set",
      icon: UserCircle2
    },
    {
      title: "Role",
      value: session.user.role,
      icon: Shield
    },
    {
      title: "Subscription",
      value: session.user.subscription,
      icon: CreditCard
    }
  ];

  return (
    <section className="mx-auto min-h-[calc(100vh-73px)] w-full max-w-6xl space-y-8 px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your account and workspace context.</p>
        </div>
        <SignOutButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Session Information</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Badge>{session.user.email}</Badge>
          <Badge variant="secondary">Role: {session.user.role}</Badge>
          <Badge variant="outline">Plan: {session.user.subscription}</Badge>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map(({ title, value, icon: Icon }) => (
          <Card key={title}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-xl font-medium">{value}</p>
              <Icon className="h-5 w-5 text-primary" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
