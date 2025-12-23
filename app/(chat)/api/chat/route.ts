import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an AI that generates professional, clean, ready-to-use code scripts for developers. Always return code only, no explanation.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return Response.json({
    result: completion.choices[0].message.content,
  });
}
