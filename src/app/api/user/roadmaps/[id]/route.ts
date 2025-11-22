// src/app/api/roadmaps/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Progress = { status: string };

function safeParseResources(resources: string | null): {
  tasks: string[];
  downloadables: string[];
  videoTutorial: string | null;
} {
  if (!resources) return { tasks: [], downloadables: [], videoTutorial: null };
  try {
    const data = JSON.parse(resources);
    return {
      tasks: Array.isArray(data.tasks) ? data.tasks : [],
      downloadables: Array.isArray(data.downloadables) ? data.downloadables : [],
      videoTutorial:
        typeof data.videoTutorial === "string" ? data.videoTutorial : null,
    };
  } catch {
    return { tasks: [], downloadables: [], videoTutorial: null };
  }
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const roadmap = await prisma.roadmap.findUnique({
    where: { id: params.id },
    include: {
      steps: {
        orderBy: { stepNumber: "asc" },
        include: {
          userProgress: {
            where: { userId: session.user.id },
            select: { status: true },
          },
        },
      },
    },
  });

  if (!roadmap) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Normalize to UI shape
  const normalized = {
    title: roadmap.title,
    description: roadmap.description,
    image: "",       // safe defaults
    timeline: "",
    investment: "",
    difficulty: "",
    successRate: "",
    steps: roadmap.steps.map((s) => {
      const r = safeParseResources(s.resources);
      return {
        stepId: s.id,
        stepTitle: s.title,
        description: s.content,
        duration: String(s.stepNumber), // derived from stepNumber
        tasks: r.tasks,
        downloadables: r.downloadables,
        videoTutorial: r.videoTutorial,
        userProgress: s.userProgress as Progress[],
      };
    }),
  };

  return NextResponse.json(normalized);
}
