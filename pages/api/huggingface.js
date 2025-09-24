// pages/api/hf-test.js
export default async function handler(req, res) {
  console.log('Token from env:', process.env.HF_TOKEN);
  
  res.status(200).json({
    token_exists: !!process.env.HF_TOKEN,
    token_length: process.env.HF_TOKEN ? process.env.HF_TOKEN.length : 0,
    token_starts_with: process.env.HF_TOKEN ? process.env.HF_TOKEN.substring(0, 7) : 'none'
  });
}