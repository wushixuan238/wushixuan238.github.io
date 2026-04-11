// Local posts data loader
// This reads from the static JSON file generated during build time
// In development, it falls back to empty array if file doesn't exist

import { type Post, type PostMeta } from '../lib/notion';

import postsData from '../data/posts.json';

let cachedPosts: Post[] = (postsData as any) || [];

// Load posts from JSON file
function loadPosts(): Post[] {
  return cachedPosts;
}

// Get all posts (sorted by date descending)
export function getPosts(): PostMeta[] {
  const posts = loadPosts();
  return posts.map(post => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    date: post.date,
    category: post.category,
    excerpt: post.excerpt,
  }));
}

// Get single post by slug
export function getPostBySlug(slug: string): Post | undefined {
  const posts = loadPosts();
  return posts.find(post => post.slug === slug);
}

// Get posts by category
export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getPosts();
  if (category === 'ALL') {
    return allPosts;
  }
  return allPosts.filter(post => post.category === category);
}

// Get all unique categories
export function getCategories(): string[] {
  const posts = loadPosts();
  const categories = new Set(posts.map(post => post.category));
  return ['ALL', ...Array.from(categories)];
}

// Get single post by ID
export function getPostById(id: string): Post | undefined {
  const posts = loadPosts();
  return posts.find(post => post.id === id);
}
