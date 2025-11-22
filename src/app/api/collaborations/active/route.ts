import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CollaborationStatus } from "@prisma/client";

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const activeCollabs = await prisma.collaboration.findMany({
      where: {
        OR: [{ requesterId: user.id }, { receiverId: user.id }],
        status: { in: ["accepted", "in_progress"] }, // verify exact values
      },
      include: {
        requester: { select: { id: true, name: true, image: true } },
        receiver: { select: { id: true, name: true, image: true } },
      },
      orderBy: [{ deadline: "asc" }, { createdAt: "desc" }],
    });

    const now = new Date();
    const formatted = activeCollabs.map((collab) => {
      let daysLeft: number | null = null;
      if (collab.deadline) {
        const diffTime = collab.deadline.getTime() - now.getTime();
        daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
      return { ...collab, daysLeft };
    });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching active collaborations:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
