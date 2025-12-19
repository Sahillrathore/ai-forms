// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: "" });
// const ai = new GoogleGenAI({ apiKey: "" });

// const PROMPT = 'on the basis of description please give form in json format with formTitle, formSubheading, formFields fieldName, fieldType, fieldLabel, placeholder, required in json format give only json data no extra text.';

// const generateAi = async (userInput : string) => {
//   console.log(userInput)
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: `Description: ${userInput}. ${PROMPT}`,
//   });
//   console.log('Description',userInput,PROMPT)
//   return (response.text);
// }

// export default generateAi;

import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API;

if (typeof apiKey !== "string" || apiKey.length === 0) {
  throw new Error("GEMINI_API is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

const PROMPT = `
Generate a form JSON based on the description. 
STRICT RULES:
1. "fieldType" MUST be one of: ["text", "number", "email", "password", "select", "radio", "checkbox", "textarea", "date", "file", "range" ].
2. If fieldType is "select", "radio", or "checkbox", the "options" array is MANDATORY.
3. Each option must be an object with "label" and "value" keys.
4. Do NOT use "selectGroup" or "radioGroup"; use "select" or "radio" only.

JSON Structure:
{
  "formTitle": "string",
  "formSubheading": "string",
  "formFields": [
    {
      "fieldName": "string",
      "fieldType": "string",
      "fieldLabel": "string",
      "placeholder": "string",
      "required": boolean,
      "options": [{ "label": "string", "value": "string" }]
    }
  ]
}
`;

export default async function generateAi(userInput: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const result = await model.generateContent(
    `Description: ${userInput}. ${PROMPT}`
  );

  return result.response.text();
}
