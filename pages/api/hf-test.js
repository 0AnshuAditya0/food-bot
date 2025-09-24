// pages/api/groq-test.js
export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'user', content: 'Hello! Write a short poem about coding.' }
        ],
        max_tokens: 100
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: 'Groq API Error',
        status: response.status,
        message: errorText
      });
    }
    
    const data = await response.json();
    res.status(200).json(data);
    
  } catch (error) {
    res.status(500).json({
      error: 'Network error',
      message: error.message
    });
  }
}