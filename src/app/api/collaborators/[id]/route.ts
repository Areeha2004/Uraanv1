// src/app/api/collaborations/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ------------------ GET — Fetch collaborator profile by userId ------------------
export async function GET(req: Request, { params }: { params: any }) {
  try {
    const collaborator = await prisma.collaboratorProfile.findUnique({
      where: { userId: params.id },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            bio: true,
            location: true,
          },
        },
      },
    });

    if (!collaborator) {
      return NextResponse.json({ error: "Collaborator not found" }, { status: 404 });
    }

    return NextResponse.json(collaborator);
  } catch (error) {
    console.error("Error fetching collaborator:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ------------------ PATCH — Update collaborator profile ------------------
export async function PATCH(req: Request, { params }: { params: any }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.id !== params.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const updated = await prisma.collaboratorProfile.update({
      where: { userId: params.id },
      data: {
        title: data.title,
        skills: data.skills,
        portfolio: data.portfolio,
        startingPrice: data.startingPrice,
        responseTime: data.responseTime,
        location: data.location,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating collaborator:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ------------------ POST — Create a collaboration request ------------------


export async function POST(req: Request, context: any) {
  const { params } = context as { params: { id: string } };

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requester = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!requester) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const collaborator = await prisma.collaboratorProfile.findUnique({
      where: { userId: params.id },
    });
    if (!collaborator) {
      return NextResponse.json({ error: "Collaborator not found" }, { status: 404 });
    }

    if (collaborator.userId === requester.id) {
      return NextResponse.json(
        { error: "You cannot collaborate with yourself" },
        { status: 400 }
      );
    }

    const body: {
      projectDescription?: string;
      budget?: number | string;
      deadline?: string;
    } = await req.json();

    const collab = await prisma.collaboration.create({
      data: {
        requesterId: requester.id,
        receiverId: collaborator.userId,
        projectDescription: body.projectDescription,
        budget: body.budget ? body.budget.toString() : undefined,
        deadline: body.deadline ? new Date(body.deadline) : undefined,
      },
    });

    return NextResponse.json(collab, { status: 201 });
  } catch (error) {
    console.error("Error creating collaboration:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
