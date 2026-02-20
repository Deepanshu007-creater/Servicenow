import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, WalletCards } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Secure Auth",
    description: "Email/password authentication with JWT sessions and role-aware access.",
    icon: ShieldCheck
  },
  {
    title: "Subscription Ready",
    description: "Built-in FREE, MODERATE, and PROFESSIONAL plan architecture.",
    icon: WalletCards
  },
  {
    title: "Scalable Foundation",
    description: "App Router architecture ready for features, teams, and integrations.",
    icon: Sparkles
  }
];

export default function HomePage() {
  return (
    <section className="gradient-bg min-h-[calc(100vh-73px)] px-6 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="max-w-3xl space-y-6">
          <p className="inline-flex rounded-full border px-4 py-1 text-sm font-medium text-primary">SaaS Starter Kit</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Ship your ServiceNow SaaS faster.</h1>
          <p className="text-lg text-muted-foreground">
            Clean architecture, secure authentication, and production-ready foundations with Next.js 14,
            Prisma, MongoDB Atlas, and NextAuth.
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <Link href="/signup" className="inline-flex items-center gap-2">
                Create account
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <Card key={title}>
              <CardHeader>
                <Icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
