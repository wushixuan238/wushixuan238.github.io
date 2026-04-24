import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import {
  getPostsByCategory,
  getCategories,
  type PostMeta,
} from "../data/posts";
import { SPRING_PRESETS } from "../lib/animation";

const ArchiveCard = ({
  item,
  navigate,
}: {
  item: PostMeta;
  navigate: (path: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card px-8 py-7 shadow-sm border border-border flex flex-col items-center text-center group hover:shadow-lg hover:border-primary/40 transition-all cursor-pointer mx-auto w-full"
      onClick={() => navigate(`/article/${item.slug}`)}
    >
      {/* Meta row */}
      <div className="flex justify-center items-center gap-3 mb-5 w-full">
        <span className="font-mono text-[9px] tracking-[0.2em] text-primary font-bold uppercase opacity-60">
          {item.category}
        </span>
        <span className="w-px h-3 bg-border" />
        <span className="font-mono text-[9px] text-muted-foreground">
          {item.date}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-headline leading-snug text-foreground group-hover:text-primary transition-colors mb-6">
        {item.title}
      </h2>

      {/* CTA */}
      <div className="text-[9px] font-mono font-bold tracking-[0.2em] text-muted-foreground group-hover:text-foreground flex items-center gap-1.5 transition-colors mt-auto">
        EXPLORE <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
      </div>
    </motion.div>
  );
};

const Archive = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isHoveringCategories, setIsHoveringCategories] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = getPostsByCategory(selectedCategory);
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory]);

  const categories = useMemo<string[]>(() => {
    return getCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-mono text-[11px] text-muted-foreground animate-pulse tracking-widest">
          FETCHING_ARCHIVE...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* MINIMAL NAV */}
      <nav className="fixed top-0 left-0 right-0 h-20 px-12 flex justify-between items-center z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="h-4 w-px bg-border" />
          <h1 className="font-mono text-[11px] font-bold tracking-[0.3em] uppercase">
            Documents / <span className="text-primary">{selectedCategory}</span>
          </h1>
        </div>
      </nav>

      {/* CATEGORY FILTER (FLOATING PILLS) */}
      <div className="fixed bottom-12 left-12 z-50 flex items-center gap-3">
        {categories.map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-mono text-[10px] tracking-widest border transition-all ${
              selectedCategory === cat
                ? "bg-foreground text-background border-foreground shadow-lg shadow-black/10"
                : "bg-background text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <main className="max-w-7xl mx-auto px-12 pt-32 pb-40">
        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 260px))", justifyContent: "center" }}>
          <AnimatePresence mode="popLayout">
            {posts.map((item) => (
              <ArchiveCard key={item.id} item={item} navigate={navigate} />
            ))}
          </AnimatePresence>
        </div>

        {posts.length === 0 && (
          <div className="h-60 flex items-center justify-center">
            <span className="font-mono text-[11px] text-muted-foreground/40 uppercase tracking-widest">
              Void_Category
            </span>
          </div>
        )}
      </main>

      {/* BACKGROUND TEXT */}
      <div className="fixed bottom-0 right-0 p-12 pointer-events-none select-none overflow-hidden opacity-[0.03]">
        <h2 className="text-[20vw] font-headline font-bold leading-none text-foreground -rotate-12 translate-x-1/4 translate-y-1/4">
          ARCHIVE
        </h2>
      </div>
    </div>
  );
};

export default Archive;
