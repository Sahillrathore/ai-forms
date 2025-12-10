

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!); 

const PROMPT = 'on the basis of description please give form in json format with formTitle, formSubheading, formFields fieldName, fieldType, fieldLabel, placeholder, required in json format give only json data no extra text.';


const generateAi = async (userInput: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `Description: ${userInput}. ${PROMPT}`;

    const result = await model.generateContent(prompt);
    
    return result.response.text();

  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

export default generateAi;