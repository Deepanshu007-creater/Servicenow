import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma/client";
import { signUpSchema } from "@/lib/validations/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.data.email }
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

    await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: hashedPassword
      }
    });

    return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create account" }, { status: 500 });
  }
}
