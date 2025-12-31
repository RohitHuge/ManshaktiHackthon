const axios = require('axios');

// Using OpenAI for "Wisdom-on-Demand" as a proxy if needed, or direct call.
// Prompt says: "OPENAI_API_KEY (for /api/chat LLM response)"
// We will use standard OpenAI completion.

// However, user banned LangChain. We use axios.

const generateAnswer = async (query, contextChunks, language = 'en') => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY not defined');

    // Construct prompt
    const contextText = contextChunks.map(c => `[Source: Page ${c.payload.page}] ${c.payload.text}`).join('\n\n');

    const systemPrompt = `You are a helpful, calm, and wise assistant. 
  Answer the user's question based ONLY on the provided context. 
  If the answer is not in the context, politely say you don't know based on the available documents.
  Provide a summary and a list of actionable steps if applicable.
  Respond in the same language as the user's query (${language}).
  Format your response as a JSON object with keys: "summary" (string), "steps" (array of strings).`;

    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Context:\n${contextText}\n\nQuestion: ${query}` }
    ];

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo", // or gpt-4
            messages: messages,
            temperature: 0.3,
            response_format: { type: "json_object" } // Ensure JSON output
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        const content = response.data.choices[0].message.content;
        try {
            return JSON.parse(content);
        } catch (parseError) {
            console.error("LLM JSON Parse Error", parseError);
            // Fallback if model didn't output JSON perfectly
            return { summary: content, steps: [] };
        }

    } catch (error) {
        console.error("LLM Service Error", error.response ? error.response.data : error.message);
        throw new Error("Failed to generate answer from LLM");
    }
};

module.exports = { generateAnswer };
