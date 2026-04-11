import { useEffect, useState } from "react";
import { Client } from "@notionhq/client";

const NotionDebug = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testNotion = async () => {
      try {
        console.log("[Debug] Starting Notion API test...");
        console.log("[Debug] VITE_NOTION_API_KEY:", import.meta.env.VITE_NOTION_API_KEY ? "SET" : "NOT SET");
        console.log("[Debug] VITE_NOTION_DATABASE_ID:", import.meta.env.VITE_NOTION_DATABASE_ID);

        const apiKey = import.meta.env.VITE_NOTION_API_KEY;
        const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

        if (!apiKey) {
          throw new Error("VITE_NOTION_API_KEY is not set");
        }

        if (!databaseId) {
          throw new Error("VITE_NOTION_DATABASE_ID is not set");
        }

        console.log("[Debug] Creating Notion client...");
        const notion = new Client({
          auth: apiKey,
        });

        console.log("[Debug] Notion client created:", {
          hasAuth: !!apiKey,
          hasDatabases: !!notion.databases,
          hasBlocks: !!notion.blocks,
          clientKeys: Object.keys(notion),
        });

        console.log("[Debug] Calling notion.databases.query...");
        const response = await notion.databases.query({
          database_id: databaseId,
        });

        console.log("[Debug] API response:", response);
        setData(response);
      } catch (err: any) {
        console.error("[Debug] Error:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    testNotion();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "monospace", fontSize: "12px" }}>
      <h2>Notion API Debug</h2>

      {loading && <p>Loading...</p>}

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}

      {data && (
        <div>
          <h3>Response:</h3>
          <pre style={{ background: "#f0f0f0", padding: "10px", borderRadius: "4px", overflow: "auto" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default NotionDebug;
