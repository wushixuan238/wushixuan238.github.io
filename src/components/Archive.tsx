import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo, useEffect, type WheelEvent } from "react";
import {
  getPosts,
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="bg-white p-6 aspect-square shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 flex flex-col justify-between group hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden"
    >
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:opacity-[0.04] transition-opacity" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="font-mono text-[9px] tracking-widest text-[#324A49] font-bold uppercase">
            {item.category}
          </span>
          <span className="font-mono text-[9px] text-neutral-400">
            {item.date}
          </span>
        </div>

        <h2 className="text-xl font-headline leading-tight mb-3 text-[#1A1C19] group-hover:text-[#324A49] transition-colors line-clamp-2">
          {item.title}
        </h2>

        <p className="text-neutral-500 text-[12px] leading-relaxed font-body line-clamp-3 italic opacity-70 group-hover:opacity-100 transition-opacity mb-4">
          "{item.excerpt}"
        </p>

        <div className="mt-auto pt-4 border-t border-neutral-50 flex justify-between items-center">
          <div className="font-mono text-[8px] text-neutral-300 tracking-tighter">
            {item.slug.toUpperCase()}
          </div>
          <button
            onClick={() => navigate(`/article/${item.slug}`)}
            className="text-[10px] font-mono font-bold text-[#1A1C19] flex items-center gap-1 group/btn"
          >
            <span className="group-hover/btn:mr-1 transition-all">VIEW</span>
            <span className="transition-transform group-hover/btn:translate-x-1">→</span>
          </button>
        </div>
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
  const [showInitialNav, setShowInitialNav] = useState(true);

  // Fetch posts from local data on component mount
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

  useEffect(() => {
    const timer = setTimeout(() => setShowInitialNav(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show loading state
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#FAF9F6] text-[#1A1C19] flex items-center justify-center"
      >
        <div className="font-mono text-[11px] text-neutral-500 animate-pulse">
          LOADING ARCHIVE_INDEX...
        </div>
      </motion.div>
    );
  }

  // Show error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#FAF9F6] text-[#1A1C19] flex flex-col items-center justify-center gap-6"
      >
        <div className="font-mono text-[11px] text-red-500">{error}</div>
        <button
          onClick={() => navigate("/")}
          className="text-[11px] font-mono font-bold text-[#324A49] hover:underline underline-offset-8 transition-all"
        >
          RETURN_TO_HOME
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FAF9F6] text-[#1A1C19] pb-32"
    >
      {/* HEADER BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 px-8 flex justify-between items-center bg-[#FAF9F6]/80 backdrop-blur-md border-b border-neutral-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-mono text-[12px] font-bold tracking-[0.2em] uppercase">
            Archive / <span className="text-neutral-400">{selectedCategory}</span>
          </h1>
        </div>
        <div className="font-mono text-[10px] text-neutral-400">
          COUNT: {posts.length} ITEM(S)
        </div>
      </header>

      {/* CATEGORY TILES (STAGGERED GLASS) */}
      <motion.div
        className="fixed bottom-8 left-8 z-50 flex items-end h-40 group pr-12"
        onHoverStart={() => setIsHoveringCategories(true)}
        onHoverEnd={() => setIsHoveringCategories(false)}
      >
        <div className="relative flex items-end ml-16">
          {categories.map((cat, index) => {
            const isSelected = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variants={{
                  rest: {
                    x: index * 10,
                    y: -index * 5,
                    rotate: -index * 2,
                    zIndex: categories.length - index,
                  },
                  hover: {
                    x: index * 130,
                    y: 0,
                    rotate: 0,
                    zIndex: categories.length - index,
                  },
                }}
                animate={isHoveringCategories ? "hover" : "rest"}
                transition={SPRING_PRESETS.smooth}
                whileHover={{
                  y: -15,
                  scale: 1.05,
                  zIndex: 60,
                  transition: { duration: 0.2 },
                }}
                className={`absolute bottom-0 left-0 p-6 pt-8 rounded-xl backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between items-start min-w-[120px] aspect-[4/5] shadow-2xl ${
                  isSelected
                    ? "bg-white/40 border-white/60 ring-1 ring-white/20"
                    : "bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30"
                }`}
              >
                <div className="flex flex-col gap-1 items-start w-full">
                  <span
                    className={`font-mono text-[8px] tracking-widest ${isSelected ? "text-[#324A49]" : "text-[#1A1C19]/40"}`}
                  >
                    TAG_0{index + 1}
                  </span>
                  <div
                    className={`h-px w-full mt-2 ${isSelected ? "bg-[#324A49]/30" : "bg-[#1A1C19]/10"}`}
                  />
                </div>

                <span
                  className={`font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-left leading-tight ${
                    isSelected ? "text-[#1A1C19]" : "text-[#1A1C19]/60"
                  }`}
                >
                  {cat}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* GRID CONTENT */}
      <main className="max-w-7xl mx-auto px-8 pt-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {posts.map((item: PostMeta) => (
              <ArchiveCard key={item.id} item={item} navigate={navigate} />
            ))}
          </AnimatePresence>
        </div>

        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40">
            <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
              No entries found in this category
            </p>
          </div>
        )}
      </main>

      {/* NAVIGATION CONTROLS */}
      <div className="fixed bottom-0 left-0 right-0 h-32 z-40 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto pb-8">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: showInitialNav || !isHoveringCategories ? 0 : 100,
              opacity: showInitialNav || !isHoveringCategories ? 1 : 0,
            }}
            transition={SPRING_PRESETS.smooth}
            className="flex items-center p-1 bg-[#1A1C19]/90 backdrop-blur-md rounded-full shadow-lg border border-white/10"
          >
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-6 py-3 text-[#FAF9F6] hover:bg-white/10 rounded-full transition-all group"
            >
              <ArrowLeft size={18} />
              <span className="font-mono text-[10px] tracking-widest uppercase font-bold">
                RETURN
              </span>
            </button>

            <div className="h-6 w-px bg-white/20 mx-2" />

            <div className="flex items-center gap-1 px-4 text-[#FAF9F6] font-mono text-[11px] font-bold">
              <span className="text-[#324A49] tracking-widest">ARCHIVE_INDEX</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Archive;
