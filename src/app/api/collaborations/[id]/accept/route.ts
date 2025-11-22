// src/app/api/collaborations/[id]/accept/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const collab = await prisma.collaboration.findUnique({ where: { id: params.id } });
  if (!collab) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (collab.receiverId !== user.id)
    return NextResponse.json({ error: "Only receiver can accept request" }, { status: 403 });

  if (collab.status !== "pending")
    return NextResponse.json({ error: "Request already processed" }, { status: 400 });

  const updated = await prisma.collaboration.update({
    where: { id: params.id },
    data: { status: "accepted" },
    include: {
      requester: true,
      receiver: true,
    },
  });

  return NextResponse.json(updated);
}
