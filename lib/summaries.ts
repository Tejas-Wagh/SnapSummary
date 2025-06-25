import { getDBConnection } from "./db";

export async function getSummaries(userId: string) {
  try {
    const sql = await getDBConnection();
    const summaries = sql`SELECT * from pdf_summaries where user_id = ${userId} ORDER BY created_at DESC`;
    return summaries;
  } catch (error) {
    console.error("Error fetching summaries", error);
  }
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDBConnection();

    const summary = await sql`SELECT id,
      user_id,
      title,
      original_file_url,
      summary_text,
      status,
     created_at,
     updated_at,
      file_name,
        LENGTH(summary_text) - LENGTH(REPLACE(summary_text,' ','')) +1 as word_count 
          FROM pdf_summaries WHERE id = ${id}`;

    return summary;
  } catch (error) {
    console.error("Error fetching summary", error);
  }
}

export async function getUserUploadCount(userId: string) {
  const sql = await getDBConnection();

  try {
    const result =
      await sql`SELECT COUNT(*) as count FROM pdf_summaries WHERE user_id = ${userId}`;
    return result[0]?.count;
  } catch (error) {
    console.log(error);
  }
}
