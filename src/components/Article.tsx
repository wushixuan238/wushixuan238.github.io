import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, type Post } from "../data/posts";
import { SPRING_PRESETS } from "../lib/animation";

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = () => {
      if (!slug) {
        setError("Invalid article slug");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = getPostBySlug(slug);
        if (data) {
          setPost(data);
        } else {
          setError("Article not found");
        }
      } catch (err: any) {
        console.error("Failed to fetch article:", err);
        setError(err.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-background text-foreground flex items-center justify-center"
      >
        <div className="font-mono text-[11px] text-muted-foreground">
          LOADING ARTICLE_DATA...
        </div>
      </motion.div>
    );
  }

  if (error || !post) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6"
      >
        <div className="font-mono text-[11px] text-red-500">
          {error || "Article not found"}
        </div>
        <button
          onClick={() => navigate("/archive")}
          className="text-[11px] font-mono font-bold text-primary hover:underline underline-offset-8 transition-all"
        >
          ← BACK_TO_ARCHIVE
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={SPRING_PRESETS.smooth}
      className="min-h-screen bg-background text-foreground overflow-y-auto selection:bg-primary/15"
    >
      {/* Article Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-prose mx-auto px-8 py-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary hover:text-foreground transition-colors font-mono text-[10px] tracking-widest uppercase font-bold"
          >
            <ArrowLeft size={16} />
            <span>BACK</span>
          </button>
          <div className="font-mono text-[9px] text-muted-foreground tracking-wider">
            {post.category} // {post.date}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-prose mx-auto px-8 py-16 text-center">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl lg:text-6xl font-headline leading-tight mb-6 text-foreground">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-body italic">
            {post.excerpt}
          </p>
        </motion.div>

        {/* Markdown Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg w-full"
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-headline mt-12 mb-6 text-foreground mx-auto w-fit">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-headline mt-10 mb-4 text-foreground mx-auto w-fit">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-headline mt-8 mb-3 text-foreground mx-auto w-fit">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-6 leading-relaxed text-foreground/80 font-body mx-auto w-fit max-w-full">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/80">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-6 space-y-2 text-foreground/80">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li>{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground bg-primary/5 rounded-r-lg mx-auto w-fit max-w-full text-left">
                  {children}
                </blockquote>
              ),
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                const isInline = !match;
                return isInline ? (
                  <code
                    className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-destructive"
                    {...props}
                  >
                    {children}
                  </code>
                ) : (
                  <code
                    className={`block bg-neutral-900 text-neutral-100 p-6 rounded-lg overflow-x-auto my-6 font-mono text-sm ${className}`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => <pre className="mb-6">{children}</pre>,
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-primary hover:underline underline-offset-4"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-foreground">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-muted-foreground">{children}</em>
              ),
              hr: () => <hr className="my-12 border-border" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* Article Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 pt-12 border-t border-border/50"
        >
          <div className="flex items-center justify-center">
            <button
              onClick={() => navigate("/archive")}
              className="text-[11px] font-mono font-bold text-primary hover:underline underline-offset-8 transition-all"
            >
              ← BACK_TO_ARCHIVE
            </button>
          </div>
        </motion.footer>
      </article>
    </motion.div>
  );
};

export default Article;
