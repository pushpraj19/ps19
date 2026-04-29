export default async function handler(req, res) {

  const userMsg = req.body.message;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "poolside/laguna-xs.2:free",
      messages: [
        {
          role: "system",
          content: "You are an English teacher. Correct grammar and explain mistakes."
        },
        {
          role: "user",
          content: userMsg
        }
      ]
    })
  });

  const data = await response.json();

  // 👇 THIS IS KEY (debugging)
  console.log("OPENROUTER RESPONSE:", data);

  return res.status(200).json({
    debug: data,
    reply: data?.choices?.[0]?.message?.content || "No response from AI"
  });
}
