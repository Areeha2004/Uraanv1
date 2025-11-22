// src/app/api/collaborators/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ======================= GET ALL COLLABORATORS (FILTERS) =======================
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const skill = url.searchParams.get("skill");
    const location = url.searchParams.get("location");
    const minRating = parseFloat(url.searchParams.get("minRating") || "0");

    interface WhereClause {
      skills?: { has: string };
      location?: string;
      rating?: { gte: number };
    }

    const where: WhereClause = {};

    if (skill) {
      where.skills = { has: skill };
    }

    if (location) {
      where.location = location;
    }

    if (!isNaN(minRating)) {
      where.rating = { gte: minRating };
    }

    const collaborators = await prisma.collaboratorProfile.findMany({
      where,
      orderBy: { rating: "desc" },
      take: 20,
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

    return NextResponse.json(collaborators);
  } catch (error) {
    console.error("Error fetching collaborators:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ======================= CREATE COLLABORATOR PROFILE =======================
export async function POST(req: Request) {
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

    // Check if profile already exists
    const existing = await prisma.collaboratorProfile.findUnique({
      where: { userId: user.id },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Collaborator profile already exists" },
        { status: 400 }
      );
    }

    const data = await req.json();

    const requiredFields = [
      "title",
      "skills",
      "portfolio",
      "startingPrice",
      "responseTime",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const collaborator = await prisma.collaboratorProfile.create({
      data: {
        userId: user.id,
        title: data.title,
        skills: data.skills,
        portfolio: data.portfolio,
        startingPrice: data.startingPrice,
        responseTime: data.responseTime,
        location: data.location || user.location || "",
        avatar: data.avatar || null,
        verified: false,
        topRated: false,
        rating: 0,
        reviewsCount: 0,
      },
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

    return NextResponse.json(collaborator);
  } catch (error) {
    console.error("Error creating collaborator:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
