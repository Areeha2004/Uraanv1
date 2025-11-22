import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const parsed = await req.json();

  const systemPrompt: OpenAI.Chat.Completions.ChatCompletionMessageParam = {
    role: "system",
    content: "You are an expert business mentor for housewives in Pakistan.Give realistic and low budget easy to do bussiness ideas.Also generate atleast one link of resource in every step in the roadmap and try to mention timelines.You MUST call the function generateBusinessIdea and supply ONLY the arguments object, strictly matching the format. No extra text.",
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
    - Reflection 1: ${parsed.reflections?.[0] || "N/A"}
    - Reflection 2: ${parsed.reflections?.[1] || "N/A"}`
  };

  try {
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
                  timeline: { type: "string" },
                  investment: { type: "string" },
                  potential: { type: "string" },
                  keyPlatforms: {
                    type: "array",
                    items: { type: "string" },
                  },
                  whyThisWorksForYou: { type: "string" },
                  keywords: {
                    type: "array",
                    items: { type: "string" },
                  }
                },
                required: [
                  "title",
                  "description",
                  "timeline",
                  "investment",
                  "potential",
                  "keyPlatforms",
                  "whyThisWorksForYou",
                  "keywords"
                ]
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
                        tasks: {
                          type: "array",
                          items: { type: "string" }
                        },
                        downloadables: {
                          type: "array",
                          items: { type: "string" }
                        },
                        videoTutorial: { type: "string" }
                      },
                      required: [
                        "stepTitle",
                        "description",
                        "duration",
                        "tasks",
                        "downloadables",
                        "videoTutorial"
                      ]
                    }
                  }
                },
                required: [
                  "headline",
                  "timeline",
                  "investment",
                  "difficulty",
                  "successRate",
                  "steps"
                ]
              }
            },
            required: ["businessCard", "roadmap"]
          }
        }
      ],
      function_call: { name: "generateBusinessIdea" }
    });

    const functionCall = response.choices?.[0]?.message?.function_call;
    const args = functionCall && functionCall.arguments ? functionCall.arguments : "{}";
    const result = JSON.parse(args);
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("OpenAI Error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
