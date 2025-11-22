// src/app/api/collaborations/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ------------------ GET SINGLE COLLAB ------------------
export async function GET(req: Request, { params }: { params: any }) {
  try {
    const collaboration = await prisma.collaboration.findUnique({
      where: { id: params.id },
      include: {
        requester: { select: { id: true, name: true, image: true } },
        receiver: { select: { id: true, name: true, image: true } },
      },
    });

    if (!collaboration) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(collaboration);
  } catch (error) {
    console.error("GET /collaborations/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ------------------ DELETE COLLAB ------------------
export async function DELETE(req: Request, { params }: { params: any }) {
  try {
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

    const collaboration = await prisma.collaboration.findUnique({
      where: { id: params.id },
    });

    if (!collaboration) {
      return NextResponse.json(
        { error: "Collaboration not found" },
        { status: 404 }
      );
    }

    if (
      collaboration.requesterId !== user.id &&
      collaboration.receiverId !== user.id
    ) {
      return NextResponse.json(
        { error: "Not authorized to delete this collaboration" },
        { status: 403 }
      );
    }

    await prisma.collaboration.delete({ where: { id: params.id } });

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE /collaborations/[id] error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
