"use server";

import { getDBConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummary(summaryId: string) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const sql = await getDBConnection();

    const res =
      await sql`DELETE FROM pdf_summaries WHERE id = ${summaryId} AND user_id=${userId} RETURNING id`;

    if (res.length > 0) {
      revalidatePath("/dashboard");
      return { success: true };
    }
    return { success: false };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
