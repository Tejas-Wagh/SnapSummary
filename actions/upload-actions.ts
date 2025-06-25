"use server";

import { getDBConnection } from "@/lib/db";
import { generatePDFSummaryFromGemini } from "@/lib/gemini-ai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generatePDFSummaryFromOpenAI } from "@/lib/open-ai";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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
      return {
        success: true,
        data: summary,
        message: "Summary Generated!",
      };
    } catch (error) {
      if (error instanceof Error && error.message === "RATE_LIMI_EXCEEDED") {
        try {
          summary = await generatePDFSummaryFromOpenAI(pdfText);
          console.log("Response from Open AI");
          console.log(summary);
          return {
            success: true,
            data: summary,
            message: "Summary Generated!",
          };
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

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: {
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  let savedSummary: any;
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "user not found",
      };
    }

    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Error saving PDF!",
      };
    }
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      message: error?.message ?? "Error saving PDF!",
    };
  }

  revalidatePath(`/summaries/${savedSummary}`);

  return {
    success: true,
    message: "PDF saved!",
    data: {
      id: savedSummary,
    },
  };
}

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  try {
    const sql = await getDBConnection();
    const res =
      await sql`Insert INTO pdf_summaries (user_id, original_file_url, summary_text, title, file_name)
    VALUES (${userId}, ${fileUrl}, ${summary}, ${title}, ${fileName}) RETURNING id`;
    return res[0].id;
  } catch (error) {
    console.error("Error saving pdf", error);
    throw error;
  }
}
