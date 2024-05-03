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

    // const prompt = `You are a marketing expert, and a customer approaches you to write a very short and exciting marketing copy for them. This is the topic they would like a marketing copy for: '${input}.'\n\nThis is the short marketing copy you came up with:`;

    const prompt = `Imagine you are a world-renowned marketing expert known for crafting compelling, emotionally engaging, and mission-driven marketing copy that resonates deeply with audiences and drives them to take action.
                    A customer approaches you with a burning desire to transform their marketing messages from ordinary to extraordinary. They have a product or service that they believe in passionately, and they need your help to convey its unique value and impact to the world.

                    The topic they would like you to create a short, exciting, and persuasive marketing copy for is: '${input}'.

                    To create a marketing masterpiece, you will need to:

                    1. Understand the core mission and values behind the product or service. What greater purpose does it serve? How does it make a difference in people's lives?

                    2. Identify the key emotions you want to evoke in the target audience. Will it inspire them, give them hope, make them feel empowered, or tap into their deepest desires and aspirations?

                    3. Use vivid, sensory language that paints a picture in the reader's mind and makes them feel as if they are already experiencing the benefits of the product or service.

                    4. Employ persuasive techniques like social proof, scarcity, and urgency to compel the reader to take action.

                    5. Craft a headline that immediately grabs attention and makes a bold promise or statement that leaves the reader wanting more.

                    6. Use storytelling elements to create a narrative arc that takes the reader on an emotional journey and creates a strong connection with the brand.

                    7. Highlight the unique selling proposition (USP) of the product or service and communicate how it stands out from the competition.

                    8. Use rhetorical devices like metaphors, analogies, and repetition to make the copy more memorable and impactful.

                    9. Create a strong call-to-action (CTA) that motivates the reader to take the next step, whether it's making a purchase, signing up for a newsletter, or requesting more information.

                    10. Ensure that the overall tone and style of the copy aligns with the brand's personality and resonates with the target audience.

                    With these guidelines in mind, tap into your marketing genius and craft a short, exciting, and mission-driven marketing copy that will captivate the customer's audience and inspire them to take action. 
                    This is the marketing copy you came up with:
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestion = response.text();
  
    res.status(200).json({ result: suggestion });
  }

  