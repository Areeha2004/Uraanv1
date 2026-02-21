// src/app/api/generateBusinessIdea/route.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id && !session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let userId: string | null = session.user.id ?? null;

    if (!userId && session.user.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      userId = user?.id ?? null;
    }

    if (!userId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const lastGeneration = await prisma.aIResponse.findUnique({
      where: { userId },
      select: { createdAt: true },
    });

    if (lastGeneration?.createdAt) {
      const now = new Date();
      const nextEligibleAt = new Date(lastGeneration.createdAt);
      nextEligibleAt.setMonth(nextEligibleAt.getMonth() + 1);

      if (now < nextEligibleAt) {
        const msLeft = nextEligibleAt.getTime() - now.getTime();
        const daysRemaining = Math.max(1, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));

        return NextResponse.json(
          {
            error: `You can generate ideas once per month. Next generation available on ${nextEligibleAt.toISOString()}.`,
            nextEligibleAt: nextEligibleAt.toISOString(),
            daysRemaining,
          },
          { status: 429 }
        );
      }
    }

    const parsed: {
      personality: string;
      time: string;
      investment: string;
      interests: string;
      goals: string;
      experience: string;
      constraints: string;
      reflections?: string[];
    } = await req.json();

    const systemPrompt: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
      role: "system",
      content:
        "You are an expert business mentor for housewives in Pakistan. " +
        "Give realistic and low budget, easy-to-do business ideas. " +
        "Generate at least one resource link per step in the roadmap with timelines. " +
        "Include a relevant image URL for the business idea in businessCard.image. " +
        "Use a direct public URL (preferably https://source.unsplash.com/featured/?<keywords>). " +
        "MUST call the function generateBusinessIdea and supply ONLY the arguments object, strictly matching the format. No extra text.",
    };

    const userPrompt: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
      role: "user",
      content: `USER PROFILE:
- Personality: ${parsed.personality}
- Time Available: ${parsed.time}
- Investment Comfort: ${parsed.investment}
- Passion Areas: ${parsed.interests}
- Life Goals: ${parsed.goals}
- Past Experience: ${parsed.experience}
- Life Constraints: ${parsed.constraints}
- Reflection 1: ${parsed.reflections?.[0] ?? "N/A"}
- Reflection 2: ${parsed.reflections?.[1] ?? "N/A"}`,
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [systemPrompt, userPrompt],
      functions: [
        {
          name: "generateBusinessIdea",
          parameters: {
            type: "object",
            properties: {
              businessCard: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  image: { type: "string" },
                  timeline: { type: "string" },
                  investment: { type: "string" },
                  potential: { type: "string" },
                  keyPlatforms: { type: "array", items: { type: "string" } },
                  whyThisWorksForYou: { type: "string" },
                  keywords: { type: "array", items: { type: "string" } },
                },
                required: [
                  "title",
                  "description",
                  "image",
                  "timeline",
                  "investment",
                  "potential",
                  "keyPlatforms",
                  "whyThisWorksForYou",
                  "keywords",
                ],
              },
              roadmap: {
                type: "object",
                properties: {
                  headline: { type: "string" },
                  timeline: { type: "string" },
                  investment: { type: "string" },
                  difficulty: { type: "string" },
                  successRate: { type: "string" },
                  steps: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        stepTitle: { type: "string" },
                        description: { type: "string" },
                        duration: { type: "string" },
                        tasks: { type: "array", items: { type: "string" } },
                        downloadables: { type: "array", items: { type: "string" } },
                        videoTutorial: { type: "string" },
                      },
                      required: [
                        "stepTitle",
                        "description",
                        "duration",
                        "tasks",
                        "downloadables",
                        "videoTutorial",
                      ],
                    },
                  },
                },
                required: [
                  "headline",
                  "timeline",
                  "investment",
                  "difficulty",
                  "successRate",
                  "steps",
                ],
              },
            },
            required: ["businessCard", "roadmap"],
          },
        },
      ],
      function_call: { name: "generateBusinessIdea" },
    });

    const functionCall = response.choices?.[0]?.message?.function_call;
    const args = functionCall?.arguments ?? "{}";
    const result = JSON.parse(args);

    const keywordFromModel =
      result?.businessCard?.keywords?.[0] ||
      result?.businessCard?.title ||
      "business-idea";
    const fallbackImage = `https://source.unsplash.com/featured/?${encodeURIComponent(
      String(keywordFromModel)
    )}`;

    if (!result?.businessCard) {
      result.businessCard = {};
    }
    result.businessCard.image = result?.businessCard?.image || fallbackImage;

    await prisma.aIResponse.upsert({
      where: { userId },
      create: {
        userId,
        content: result,
      },
      update: {
        content: result,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("OpenAI Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
