export default async function handler(req, res) {
    const userMsg = req.body.message;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "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",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "mistralai/mistral-7b-instruct",
            messages: [
                {
                    role: "system",
                    content: "You are an English trainer. Correct grammar, suggest improvements, and ask questions."
                },
                {
                    role: "user",
                    content: userMsg
                }
            ]
        })
    });

    const data = await response.json();
    res.status(200).json({
        reply: data.choices[0].message.content
    });
}