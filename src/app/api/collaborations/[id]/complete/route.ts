async function getAuthUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  return prisma.user.findUnique({
    where: { email: session.user.email },
  });
}

async function getFullCollaboration(id: string) {
  return prisma.collaboration.findUnique({
    where: { id },
    include: {
      requester: { select: { id: true, name: true, image: true } },
      receiver: { select: { id: true, name: true, image: true } },
    },
  });
}
// /api/collaborations/[id]/complete/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const collab = await prisma.collaboration.findUnique({ where: { id: params.id } });

  if (!collab)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (![collab.requesterId, collab.receiverId].includes(user.id))
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });

  if (!["accepted", "in_progress"].includes(collab.status))
    return NextResponse.json({ error: "Cannot complete now" }, { status: 400 });

  const updated = await prisma.collaboration.update({
    where: { id: params.id },
    data: { status: "completed" },
    include: {
      requester: true,
      receiver: true,
    },
  });

  return NextResponse.json(updated);
}
