"use server";

import { generatePDFSummaryFromGemini } from "@/lib/gemini-ai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generatePDFSummaryFromOpenAI } from "@/lib/open-ai";

export const generatePDFSummary = async (
  uploadResponse: {
    serverData: {
      userId: string;
      file: {
        url: string;
        name: string;
      };
    };
  }[]
) => {
  if (!uploadResponse) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  const {
    serverData: {
      userId,
      file: { url: pdfUrl, name: pdfName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return {
      success: false,
      message: "File upload failed",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log(pdfText);

    let summary;

    try {
      summary = await generatePDFSummaryFromGemini(pdfText);
      console.log(summary);
    } catch (error) {
      if (error instanceof Error && error.message === "RATE_LIMI_EXCEEDED") {
        try {
            summary = await generatePDFSummaryFromOpenAI(pdfText);
            console.log("Response from Open AI");
            console.log(summary);
            
        } catch (openAIerror) {
          console.error("Gemini API failed after OpenAI quota exceeded");
        }
      }
      throw new Error("Failed to generate summary with available AI providers");
    }
  } catch (err) {
    return {
      success: false,
      message: "File upload failed",
      data: err,
    };
  }
};
