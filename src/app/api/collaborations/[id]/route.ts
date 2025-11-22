// src/app/api/collaborations/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const collab = await prisma.collaboration.findUnique({
    where: { id: params.id },
  });
  if (!collab) {
    return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
  }

  if (collab.requesterId !== user.id && collab.receiverId !== user.id) {
    return NextResponse.json(
      { error: "Not authorized to start this collaboration" },
      { status: 403 }
    );
  }

  if (collab.status !== "accepted") {
    return NextResponse.json(
      { error: "Collaboration must be accepted before starting" },
      { status: 400 }
    );
  }

  const updated = await prisma.collaboration.update({
    where: { id: params.id },
    data: { status: "in_progress" },
    include: {
      requester: true,
      receiver: true,
    },
  });

  return NextResponse.json(updated);
}
