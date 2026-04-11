import { type } from 'os';

// Define types
export interface PostMeta {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

export interface Post extends PostMeta {
  content: string;
}

// Vite's import.meta.glob to import all markdown files as raw strings
const postsModules = import.meta.glob('../posts/*.md', { as: 'raw', eager: true });

// Parse YAML frontmatter (simple implementation)
function parseFrontmatter(content: string): { meta: Record<string, string>; body: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { meta: {}, body: content };
  }

  const metaString = match[1];
  const body = match[2];

  const meta: Record<string, string> = {};
  metaString.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      // Remove surrounding quotes (both single and double)
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      meta[key.toLowerCase()] = value;
    }
  });

  return { meta, body };
}

// Extract ID from filename (e.g., "001-some-title.md" -> "001")
function extractId(filename: string): string {
  const match = filename.match(/^(\d+)-/);
  return match ? match[1] : '';
}

// Build posts array from modules
const posts: Post[] = Object.entries(postsModules).map(([filepath, content]) => {
  const contentStr = content as string;
  const { meta, body } = parseFrontmatter(contentStr);

  // Extract just the filename from path
  const filename = filepath.split('/').pop() || filepath;
  const id = extractId(filename);

  return {
    id,
    title: meta.title || 'Untitled',
    date: meta.date || new Date().toISOString().split('T')[0],
    category: meta.category || 'Uncategorized',
    excerpt: meta.excerpt || '',
    content: body.trim()
  };
});

// Sort by date (newest first)
posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

// Export functions
export function getPosts(): Post[] {
  return posts;
}

export function getPostById(id: string): Post | undefined {
  return posts.find(post => post.id === id);
}

export function getPostsByCategory(category: string): Post[] {
  if (category === 'ALL') {
    return posts;
  }
  return posts.filter(post => post.category === category);
}
