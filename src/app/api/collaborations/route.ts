// src/app/api/collaborations/route.ts
import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ------------------ GET ALL COLLABS ------------------
export async function GET(req: Request) {
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

    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const role = url.searchParams.get("role");

    const whereClause: Prisma.CollaborationWhereInput = {};

    if (role === "requester") {
      whereClause.requesterId = user.id;
    } else if (role === "receiver") {
      whereClause.receiverId = user.id;
    } else {
      whereClause.OR = [{ requesterId: user.id }, { receiverId: user.id }];
    }

    if (status) {
      whereClause.status = status as Prisma.CollaborationWhereInput["status"];
    }

    const collaborations = await prisma.collaboration.findMany({
      where: whereClause,
      include: {
        requester: { select: { id: true, name: true, image: true } },
        receiver: { select: { id: true, name: true, image: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(collaborations);
  } catch (error) {
    console.error("GET /collaborations error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ------------------ CREATE NEW COLLAB ------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("POST payload:", body);

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

    const {
      id: collaboratorId,
      role,
      projectTitle,
      projectDescription,
      budget,
      deadline,
      contactMethod,
      additionalInfo,
    } = body;

    if (!role || !collaboratorId) {
      return NextResponse.json(
        { error: "Missing required fields: role or collaborator id" },
        { status: 400 }
      );
    }

    const requesterId = role === "requester" ? user.id : collaboratorId;
    const receiverId = role === "requester" ? collaboratorId : user.id;

    const collaboration = await prisma.collaboration.create({
      data: {
        requesterId,
        receiverId,
        role,
        title: projectTitle ?? null,
        projectDescription: projectDescription ?? null,
        budget: budget ? String(budget) : null,
        deadline: deadline ? new Date(deadline) : null,
        contactMethod: contactMethod ?? null,
        additionalInfo: additionalInfo ?? null,
      },
    });

    return NextResponse.json(collaboration, { status: 201 });
  } catch (error) {
    console.error("POST /collaborations error:", error);
    return NextResponse.json(
      { error: "Failed to create collaboration" },
      { status: 500 }
    );
  }
}
