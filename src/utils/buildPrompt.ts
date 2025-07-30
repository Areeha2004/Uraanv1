// utils/buildPrompt.ts

export function buildPrompt(parsed: any) {
  return `
You are a business mentor for women in Pakistan. Based on the user's preferences, suggest ONE business idea + a realistic roadmap. Use the following profile:

USER PROFILE:
- Personality/Work Style: ${parsed.personality}
- Time Available: ${parsed.time}
- Investment Comfort: ${parsed.investment}
- Passion Areas: ${parsed.interests}
- Life Goals: ${parsed.goals}
- Past Experience: ${parsed.experience}
- Life Constraints: ${parsed.constraints}
- Reflection 1: ${parsed.reflections[0] || 'N/A'}
- Reflection 2: ${parsed.reflections[1] || 'N/A'}

Return in this format:
1. BUSINESS RESULT CARD
- Title:
- Description:
- Timeline:
- Investment:
- Potential:
- Key Platforms:
- Why This Works for You:
- Keywords (for image search): [3-5 terms]

2. BUSINESS ROADMAP
- Headline:
- Timeline:
- Investment:
- Difficulty:
- Success Rate:
Steps (4-6), each with:
  - Step Title
  - Description
  - Duration
  - Tasks (bullets)
  - Downloadables (if any)
  - Video Tutorial (if any)
`;
}
