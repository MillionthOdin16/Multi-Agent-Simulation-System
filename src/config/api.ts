export const OLLAMA_API_URL = import.meta.env.VITE_OLLAMA_API_URL || 'http://192.168.86.58:11434';

export const api = {
  async chat(model: string, prompt: string) {
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to communicate with Ollama server');
    }

    return response.json();
  },

  async listModels() {
    const response = await fetch(`${OLLAMA_API_URL}/api/tags`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch available models');
    }

    return response.json();
  },
};