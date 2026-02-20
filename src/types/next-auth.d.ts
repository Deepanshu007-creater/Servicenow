import { Role, Subscription } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      subscription: Subscription;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: Role;
    subscription: Subscription;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    subscription: Subscription;
  }
}
