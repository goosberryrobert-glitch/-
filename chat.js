export default async function handler(req, res) {
    const { message, mode } = req.body;

    const personalities = {
        coco: `
You are COCOCHAT, a Gen-Z assistant.
Use casual slang like "fr", "ngl", "bet", "lowkey", "no cap".
Be helpful and chill.
`,
        helpful: "You are a helpful assistant.",
        teacher: "You are a teacher.",
        coder: "You are a coding assistant."
    };

    const systemPrompt = personalities[mode] || personalities.helpful;

    const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4.1-mini",
            input: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ]
        })
    });

    const data = await response.json();

    res.status(200).json({
        reply: data.output_text || "error"
    });
}