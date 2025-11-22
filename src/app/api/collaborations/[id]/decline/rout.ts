// /api/collaborations/[id]/decline/route.ts

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

  if (collab.receiverId !== user.id)
    return NextResponse.json({ error: "Only receiver can decline" }, { status: 403 });

  if (collab.status !== "pending")
    return NextResponse.json({ error: "Cannot decline now" }, { status: 400 });

  const updated = await prisma.collaboration.update({
    where: { id: params.id },
    data: { status: "declined" },
    include: {
      requester: true,
      receiver: true,
    },
  });
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

  return NextResponse.json(updated);
}
