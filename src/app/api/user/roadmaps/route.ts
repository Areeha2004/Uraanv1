// src/app/api/user/roadmaps/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(_req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const userRoadmaps = await prisma.userRoadmap.findMany({
    where: { userId: session.user.id },
    orderBy: { startedAt: "desc" },
    include: {
      roadmap: {
        include: {
          steps: {
            include: {
              userProgress: { where: { userId: session.user.id } },
            },
          },
        },
      },
    },
  });

  return NextResponse.json(userRoadmaps);
}
