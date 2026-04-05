import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect, type WheelEvent } from 'react';
import { archiveData, type ArchiveItem } from '../data/archive-data';
import { SPRING_PRESETS } from '../lib/animation';

const ArchiveSlab = ({ item, index, activeIndex, total }: { item: ArchiveItem, index: number, activeIndex: number, total: number }) => {
  const isSelected = index === activeIndex;
  const isPast = index < activeIndex;
  const isFuture = index > activeIndex;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: isSelected ? 1 : isPast ? 0 : 0.2,
        x: isSelected ? 0 : isPast ? -500 : (index - activeIndex) * 40,
        scale: isSelected ? 1 : 0.9,
        rotateY: isSelected ? 0 : isFuture ? -15 : 0,
        zIndex: total - index,
      }}
      transition={SPRING_PRESETS.smooth}
      className={`absolute inset-0 flex items-center justify-center p-8 pointer-events-none ${isSelected ? 'pointer-events-auto' : ''}`}
    >
      <div className="bg-white p-12 w-full max-w-2xl aspect-[4/5] shadow-[0_40px_80px_rgba(0,0,0,0.12)] border border-neutral-100 flex flex-col justify-between group">
        <div>
          <div className="flex justify-between items-start mb-12">
            <span className="font-mono text-[10px] tracking-widest text-[#324A49] font-bold">
              ID_{item.id}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-neutral-400">
              {item.category}
            </span>
          </div>
          <h2 className="text-4xl font-headline leading-tight mb-8 text-[#1A1C19]">
            {item.title}
          </h2>
          <p className="text-neutral-500 leading-relaxed font-body line-clamp-6 italic opacity-80 group-hover:opacity-100 transition-opacity">
            "{item.fragment}"
          </p>
        </div>
        
        <div className="flex justify-between items-end border-t border-neutral-100 pt-8 mt-auto">
          <div className="font-mono text-[10px] text-neutral-400">
            TIMESTAMP // {item.date}
          </div>
          <button className="text-[11px] font-mono font-bold text-[#1A1C19] hover:underline underline-offset-8 transition-all">
            READ_ARTIFACT -{">"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Archive = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const [isHoveringCategories, setIsHoveringCategories] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [showInitialNav, setShowInitialNav] = useState(true);

  const categories = useMemo<string[]>(() => {
    const cats = ['ALL', ...new Set(archiveData.map(item => item.category))];
    return cats;
  }, []);

  const filteredData = useMemo<ArchiveItem[]>(() => {
    return selectedCategory === 'ALL' 
      ? archiveData 
      : archiveData.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => setShowInitialNav(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const nextSlab = () => {
    if (activeIndex < filteredData.length - 1) setActiveIndex(prev => prev + 1);
  };

  const prevSlab = () => {
    if (activeIndex > 0) setActiveIndex(prev => prev - 1);
  };

  const isNavVisible = showInitialNav || (isNearBottom && !isHoveringCategories);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={SPRING_PRESETS.smooth}
      className="min-h-screen bg-[#FAF9F6] text-[#1A1C19] overflow-hidden"
      onWheel={(e: WheelEvent) => {
        if (e.deltaY > 50) nextSlab();
        if (e.deltaY < -50) prevSlab();
      }}
    >

      {/* CATEGORY TILES (STAGGERED GLASS) */}
      <motion.div 
        className="fixed bottom-8 left-8 z-50 flex items-end h-40 group pr-12"
        initial="rest"
        whileHover="hover"
        animate="rest"
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
                    zIndex: categories.length - index 
                  },
                  hover: { 
                    x: index * 130, 
                    y: 0, 
                    rotate: 0,
                    zIndex: categories.length - index 
                  }
                }}
                transition={SPRING_PRESETS.smooth}
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  zIndex: 60,
                  transition: { duration: 0.2 }
                }}
                className={`absolute bottom-0 left-0 p-6 pt-8 rounded-xl backdrop-blur-2xl border transition-all duration-300 flex flex-col justify-between items-start min-w-[120px] aspect-[4/5] shadow-2xl ${
                  isSelected 
                    ? 'bg-white/25 border-white/40 ring-1 ring-white/10' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex flex-col gap-1 items-start w-full">
                  <span className={`font-mono text-[8px] tracking-widest ${isSelected ? 'text-[#324A49]' : 'text-[#1A1C19]/40'}`}>
                    TAG_0{index + 1}
                  </span>
                  <div className={`h-px w-full mt-2 ${isSelected ? 'bg-[#324A49]/30' : 'bg-[#1A1C19]/10'}`} />
                </div>
                
                <span className={`font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-left leading-tight ${
                  isSelected ? 'text-[#1A1C19]' : 'text-[#1A1C19]/60'
                }`}>
                  {cat}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <div className="relative h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <AnimatePresence mode="popLayout">
              {filteredData.map((item: ArchiveItem, index: number) => (
                <ArchiveSlab 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  activeIndex={activeIndex} 
                  total={filteredData.length}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* NAVIGATION CONTROLS & TRIGGER ZONE */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-32 z-50 flex items-center justify-center pointer-events-none"
        onMouseEnter={() => setIsNearBottom(true)}
        onMouseLeave={() => setIsNearBottom(false)}
      >
        <div className="flex items-center gap-4 pointer-events-auto pb-8">
          <motion.div
            initial={{ y: 0, opacity: 1 }}
            animate={{ 
              y: isNavVisible ? 0 : 100, 
              opacity: isNavVisible ? 1 : 0 
            }}
            transition={SPRING_PRESETS.smooth}
            className="flex items-center p-1 bg-[#1A1C19]/90 backdrop-blur-md rounded-full shadow-lg border border-white/10"
          >
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 pl-6 pr-4 py-3 text-[#FAF9F6] hover:bg-white/10 rounded-full transition-all group"
              aria-label="Back to home"
            >
              <ArrowLeft size={18} />
              <span className="font-mono text-[10px] tracking-widest uppercase font-bold">
                RETURN
              </span>
            </button>
            
            <div className="h-6 w-px bg-white/20" />
            
            <div className="flex items-center gap-1 px-4 text-[#FAF9F6] font-mono text-[11px] font-bold">
              <span className="text-[#324A49]">{activeIndex + 1}</span>
              <span className="opacity-30">/</span>
              <span>{filteredData.length}</span>
            </div>

            <div className="h-6 w-px bg-white/20" />

            <div className="flex items-center p-1">
              <button 
                onClick={prevSlab}
                className="p-3 text-white hover:text-[#79AEAD] disabled:opacity-20 transition-colors"
                disabled={activeIndex === 0}
              >
                {"<"}
              </button>
              <button 
                onClick={nextSlab}
                className="p-3 text-white hover:text-[#79AEAD] disabled:opacity-20 transition-colors"
                disabled={activeIndex === filteredData.length - 1}
              >
                {">"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Archive;
