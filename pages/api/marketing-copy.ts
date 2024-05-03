// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { genAI } from './../../utils/constants'
import { GoogleGenerativeAI } from "@google/generative-ai";

type Data = {
  result: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { input } = req.body
  console.log('input', input)

    // Use the gemini-pro model for text-only input
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are a marketing expert, and a customer approaches you to write a very short and exciting marketing copy for them. This is the topic they would like a marketing copy for: '${input}.'\n\nThis is the short marketing copy you came up with:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestion = response.text();
  
    res.status(200).json({ result: suggestion });
  }