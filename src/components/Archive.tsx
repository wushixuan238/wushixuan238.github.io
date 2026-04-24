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
      className="bg-card px-8 py-7 shadow-sm border border-border rounded-2xl flex flex-col items-center text-center group hover:shadow-lg hover:border-primary/40 transition-all cursor-pointer mx-auto w-full"
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
      {/* GRID */}
      <main className="max-w-7xl mx-auto px-12 pt-16 pb-48">
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

      {/* CATEGORY FILTER PILLS — centered above back button */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
        {categories.map((cat) => (
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

      {/* FLOATING BACK BUTTON — same style as Resume */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 p-1 bg-foreground/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-full shadow-lg border border-white/10"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 text-background dark:text-foreground hover:bg-white/10 rounded-full transition-all group"
            aria-label="Back to home"
          >
            <ArrowLeft size={18} className="group-active:scale-90 transition-transform" />
            <span className="font-mono text-[10px] tracking-widest uppercase font-bold">
              Return
            </span>
          </button>
        </motion.div>
      </div>

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
