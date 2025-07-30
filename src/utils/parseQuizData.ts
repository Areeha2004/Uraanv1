export function parseQuizData(rawParsed: string | null) {
  if (!rawParsed) throw new Error("Missing parsed quiz data.");

  let parsed: any;
  try {
    parsed = JSON.parse(decodeURIComponent(rawParsed));
  } catch {
    throw new Error("Failed to decode or parse quiz data.");
  }

  return {
    personality: parsed.personality || '',
    time: parsed.time || '',
    investment: parsed.investment || '',
    interests: Array.isArray(parsed.interests) ? parsed.interests.join(', ') : parsed.interests || '',
    goals: Array.isArray(parsed.goals) ? parsed.goals.join(', ') : parsed.goals || '',
    experience: Array.isArray(parsed.experience) ? parsed.experience.join(', ') : parsed.experience || '',
    constraints: Array.isArray(parsed.constraints) ? parsed.constraints.join(', ') : parsed.constraints || '',
    reflections: parsed.reflections || []
  };
}
