// Notion API service using direct fetch calls through Vite proxy
// This avoids CORS issues in development

const NOTION_API_VERSION = "2022-06-28";

// Get Notion API key from environment
function getApiKey(): string {
  const key =
    import.meta.env.VITE_NOTION_API_KEY || import.meta.env.NOTION_API_KEY;
  if (!key) {
    throw new Error(
      "Notion API key not found. Set VITE_NOTION_API_KEY in .env",
    );
  }
  return key;
}

// Get Database ID from environment
function getDatabaseId(): string {
  const id =
    import.meta.env.VITE_NOTION_DATABASE_ID ||
    import.meta.env.NOTION_DATABASE_ID;
  if (!id) {
    throw new Error(
      "Notion Database ID not found. Set VITE_NOTION_DATABASE_ID in .env",
    );
  }
  return id;
}

// Generic fetch wrapper for Notion API
// Uses /api/notion proxy in development to avoid CORS
async function notionFetch(
  endpoint: string,
  options: RequestInit = {},
): Promise<any> {
  const apiKey = getApiKey();
  const databaseId = getDatabaseId();

  // In development, use Vite proxy to avoid CORS
  // In production, you'll need a backend server to proxy these requests
  const baseUrl = import.meta.env.DEV
    ? "/api/notion"
    : "https://api.notion.com/v1";

  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": NOTION_API_VERSION,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Notion API error ${response.status}: ${errorData.message || response.statusText}`,
    );
  }

  return response.json();
}

// Parse rich text from Notion
function parseRichText(richText: any[]): string {
  return richText?.map((item: any) => item.plain_text).join("") || "";
}

// Types
export interface PostMeta {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  slug: string;
}

export interface Post extends PostMeta {
  content: string;
}

// Parse Notion page to PostMeta
function pageToMeta(page: any): PostMeta {
  const props = page.properties;

  return {
    id: page.id,
    title: parseRichText(props.Title?.title || []),
    slug: parseRichText(props.slug?.rich_text || []),
    date: props.date?.date?.start || new Date().toISOString().split("T")[0],
    category: props.category?.select?.name || "Uncategorized",
    excerpt: parseRichText(props.excerpt?.rich_text || []),
  };
}

// Convert Notion blocks to Markdown
function blocksToMarkdown(blocks: any[]): string {
  return blocks
    .map((block) => blockToMarkdown(block))
    .filter((text) => text !== null)
    .join("\n\n");
}

function blockToMarkdown(block: any): string | null {
  if (!block) return null;

  const type = block.type;
  const content = block[type];

  switch (type) {
    case "paragraph": {
      const text = content.rich_text
        .map((item: any) => item.plain_text)
        .join("");
      return text || null;
    }

    case "heading_1": {
      const text = content.rich_text
        .map((item: any) => item.plain_text)
        .join("");
      return `# ${text}`;
    }

    case "heading_2": {
      const text = content.rich_text
        .map((item: any) => item.plain_text)
        .join("");
      return `## ${text}`;
    }

    case "heading_3": {
      const text = content.rich_text
        .map((item: any) => item.plain_text)
        .join("");
      return `### ${text}`;
    }

    case "bulleted_list_item": {
      const text = content.rich_text
        .map((item: any) => item.plain_text)
        .join("");
      return `- ${text}`;
    }

    case "numbered_list_item": {
      const text = content.rich_text
        .map((item: any) => item.plain_text)
        .join("");
      return `1. ${text}`;
    }

    case "to_do": {
      const text = content.rich_text
        .map((item: any) => item.plain_text)
        .join("");
      const checked = content.checked ? "[x]" : "[ ]";
      return `${checked} ${text}`;
    }

    case "code": {
      const text = content.rich_text
        .map((item: any) => item.plain_text)
        .join("");
      const language = content.language || "";
      return `\`\`\`${language}\n${text}\n\`\`\``;
    }

    case "quote": {
      const text = content.rich_text
        .map((item: any) => item.plain_text)
        .join("");
      return `> ${text}`;
    }

    case "divider": {
      return "---";
    }

    case "callout": {
      const text = content.rich_text
        .map((item: any) => item.plain_text)
        .join("");
      const emoji = content.icon?.emoji || "💡";
      return `> ${emoji} ${text}`;
    }

    case "image": {
      if (content.type === "external") {
        return `![image](${content.external.url})`;
      }
      return null;
    }

    case "bookmark": {
      if (content.url) {
        return `[Bookmark](${content.url})`;
      }
      return null;
    }

    case "child_page": {
      return `> *Child page: ${content.title}*`;
    }

    default:
      // Ignore unsupported block types
      return null;
  }
}

// Fetch all published posts
export async function getAllPosts(): Promise<PostMeta[]> {
  const databaseId = getDatabaseId();

  try {
    const response = await notionFetch(`/databases/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: {
          property: "published",
          checkbox: { equals: true },
        },
        sorts: [
          {
            property: "date",
            direction: "descending",
          },
        ],
      }),
    });

    return response.results.map((page: any) => pageToMeta(page));
  } catch (error) {
    console.error("Error fetching posts from Notion:", error);
    return [];
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const databaseId = getDatabaseId();

  try {
    // First, find the page by slug
    const response = await notionFetch(`/databases/${databaseId}/query`, {
      method: "POST",
      body: JSON.stringify({
        filter: {
          and: [
            {
              property: "published",
              checkbox: { equals: true },
            },
            {
              property: "slug",
              rich_text: { equals: slug },
            },
          ],
        },
      }),
    });

    if (response.results.length === 0) {
      return null;
    }

    const page = response.results[0];

    // Fetch blocks (content)
    const blocksResponse = await notionFetch(`/blocks/${page.id}/children`, {
      method: "GET",
    });

    const content = blocksToMarkdown(blocksResponse.results);

    return {
      id: page.id,
      title: parseRichText(page.properties.Title?.title || []),
      slug: parseRichText(page.properties.slug?.rich_text || []),
      date:
        page.properties.date?.date?.start ||
        new Date().toISOString().split("T")[0],
      category: page.properties.category?.select?.name || "Uncategorized",
      excerpt: parseRichText(page.properties.excerpt?.rich_text || []),
      content,
    };
  } catch (error) {
    console.error("Error fetching post from Notion:", error);
    return null;
  }
}

// Helper: get posts by category
export async function getPostsByCategory(
  category: string,
): Promise<PostMeta[]> {
  const allPosts = await getAllPosts();
  if (category === "ALL") {
    return allPosts;
  }
  return allPosts.filter((post) => post.category === category);
}
