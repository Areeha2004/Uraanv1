// src/app/api/roadmaps/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Prisma, PrismaClient } from "@prisma/client"; // keep types
import prisma from "@/lib/prisma";

/** Shape of each step in the incoming request */
interface StepInput {
  stepTitle: string;
  description: string;
  tasks?: unknown[];
  downloadables?: unknown[];
  videoTutorial?: string | null;
}

/** Shape of the full payload from the client */
interface RoadmapPayload {
  title: string;
  description: string;
  tags: string[];
  steps: StepInput[];
}

/** Handy type for the created roadmap with its steps included */
type RoadmapWithSteps = Prisma.RoadmapGetPayload<{
  include: { steps: true };
}>;

export async function POST(req: NextRequest) {
  try {
    // 1. Auth check
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // 2. Parse & validate incoming JSON
    const { title, description, tags, steps }: RoadmapPayload = await req.json();

    // 3. Create the roadmap, connect via the join table by userId (string)
    const roadmap: RoadmapWithSteps = await prisma.roadmap.create({
      data: {
        title,
        description,
        tags,
        steps: {
          create: steps.map((s, i) => ({
            stepNumber: i + 1,
            title: s.stepTitle,
            content: s.description,
            resources: JSON.stringify({
              tasks: s.tasks ?? [],
              downloadables: s.downloadables ?? [],
              videoTutorial: s.videoTutorial ?? null,
            }),
          })),
        },
        userLinks: {
          create: {
            userId: session.user.id,
          },
        },
      },
      include: { steps: true },
    });

    // 4. Initialize each step's user progress
    if (roadmap.steps.length > 0) {
      await prisma.userProgress.createMany({
        data: roadmap.steps.map((st) => ({
          userId: session.user.id,
          stepId: st.id,
          status: "pending",
        })),
      });
    }

    // 5. Return the full roadmap (with steps)
    return NextResponse.json(roadmap);
  } catch (err: unknown) {
    console.error("💥 API /roadmaps error", err);
    const message = err instanceof Error ? err.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
