// app/api/generate/route.ts
import generateAi from "@/configs/AiModel";

export async function POST(req: Request) {
  const { input } = await req.json();
  const result = await generateAi(input);
  return Response.json({ result });
}