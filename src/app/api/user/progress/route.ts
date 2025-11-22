// src/app/api/user/progress/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { stepId, status } = (await req.json()) as {
    stepId: string;
    status: "pending" | "done";
  };

  if (!stepId || !status) {
    return NextResponse.json(
      { error: "Missing stepId or status" },
      { status: 400 }
    );
  }

  try {
    const progress = await prisma.userProgress.upsert({
      where: {
        userId_stepId: {
          userId: session.user.id,
          stepId,
        },
      },
      update: { status },
      create: {
        userId: session.user.id,
        stepId,
        status,
      },
    });

    return NextResponse.json(progress);
  } catch (err) {
    console.error("Failed to upsert progress:", err);
    return NextResponse.json(
      { error: "Could not update progress" },
      { status: 500 }
    );
  }
}
