export const OLLAMA_CONFIG = {
  baseUrl: import.meta.env.VITE_OLLAMA_API_URL || 'http://localhost:11434',
  model: import.meta.env.VITE_OLLAMA_MODEL || 'llama2',
  temperature: 0.7,
  maxTokens: 500
};

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_CONFIG.baseUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: OLLAMA_CONFIG.model,
        prompt,
        temperature: OLLAMA_CONFIG.temperature,
        max_tokens: OLLAMA_CONFIG.maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error generating response:', error);
    return 'I apologize, but I am unable to generate a response at the moment.';
  }
}