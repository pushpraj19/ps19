export default async function handler(req, res) {

  const userMsg = req.body.message;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openchat/openchat-7b:free",
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
