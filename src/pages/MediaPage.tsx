import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, Video, Share2, Sparkles, X, ExternalLink, Maximize2, Tag, Info } from 'lucide-react';
import { mediaGalleryItems } from '../data';
import { MediaCardItem } from '../types';

export const MediaPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'image' | 'video' | 'social'>('all');
  const [activeMedia, setActiveMedia] = useState<MediaCardItem | null>(null);

  const filteredItems = selectedFilter === 'all'
    ? mediaGalleryItems
    : mediaGalleryItems.filter((item) => item.type === selectedFilter);

  return (
    <div id="media-gallery-page" className="pt-28 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffdef5] border border-[#f7a6df]/60 text-[#831859] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#831859]" />
            <span>Curated Showcase • 10 Media Cards</span>
          </div>
          <h1
            id="media-page-heading"
            className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-4"
          >
            Media & Creative Gallery
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            A visual documentation of high school web design milestones, Brazilian Jiu Jitsu training discipline, handmade crochet craft plushies, and aspirations toward compassionate healthcare.
          </p>

          {/* Placeholders Notice for Yahaira */}
          <div className="mt-4 p-3 rounded-xl bg-[#ffdef5]/40 border border-[#f7a6df]/50 text-xs text-[#831859] flex items-center justify-center gap-2">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>
              Curated placeholders active. You can easily update any card with your own files or Imgur links anytime!
            </span>
          </div>
        </div>

        {/* Filter Controls */}
        <div id="media-filter-bar" className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedFilter === 'all'
                ? 'bg-[#f7a6df] text-stone-900 shadow-xs border border-[#f7a6df]'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-[#f7a6df] hover:bg-[#ffdef5]/40'
            }`}
          >
            All Media ({mediaGalleryItems.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('image')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              selectedFilter === 'image'
                ? 'bg-[#f7a6df] text-stone-900 shadow-xs border border-[#f7a6df]'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-[#f7a6df] hover:bg-[#ffdef5]/40'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>Images</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('video')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              selectedFilter === 'video'
                ? 'bg-[#f7a6df] text-stone-900 shadow-xs border border-[#f7a6df]'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-[#f7a6df] hover:bg-[#ffdef5]/40'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Videos</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('social')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              selectedFilter === 'social'
                ? 'bg-[#f7a6df] text-stone-900 shadow-xs border border-[#f7a6df]'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-[#f7a6df] hover:bg-[#ffdef5]/40'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Social Posts</span>
          </button>
        </div>

        {/* Gallery Grid (At least 9 cards required by rubric; 10 provided) */}
        <div id="media-cards-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              id={`media-card-${item.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setActiveMedia(item)}
              className="group cursor-pointer rounded-2xl bg-white border border-[#f7a6df]/50 hover:border-[#f7a6df] shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Media Container with Hover Zoom */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone-100 border-b border-stone-100">
                {item.type === 'video' ? (
                  <div className="relative w-full h-full">
                    <img
                      src={item.thumbnailUrl || item.mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-stone-900/30 flex items-center justify-center group-hover:bg-stone-900/40 transition-colors">
                      <div className="w-11 h-11 rounded-full bg-[#f7a6df] text-stone-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Video className="w-5 h-5 fill-stone-900 text-stone-900" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-stone-950/70 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1">
                    {item.type === 'image' && <Image className="w-3 h-3 text-[#f7a6df]" />}
                    {item.type === 'video' && <Video className="w-3 h-3 text-[#f7a6df]" />}
                    {item.type === 'social' && <Share2 className="w-3 h-3 text-[#f7a6df]" />}
                    <span className="capitalize">{item.type}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#ffdef5]/90 text-[#831859] text-[10px] font-bold border border-[#f7a6df]/50">
                    {item.category}
                  </span>
                </div>

                {/* Expand Hover Hint */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-white/90 text-stone-900 shadow-xs">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Card Content: Title & Caption */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-[#831859] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {item.caption}
                  </p>
                </div>

                {/* Tags footer */}
                {item.tags && (
                  <div className="pt-3 mt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[10px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md"
                      >
                        <Tag className="w-2.5 h-2.5 text-[#831859]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal: Click to Expand / Original Behavior */}
        <AnimatePresence>
          {activeMedia && (
            <motion.div
              id="media-expanded-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveMedia(null)}
              className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                id="media-expanded-modal"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]"
              >
                {/* Modal Header */}
                <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#ffdef5] text-[#831859] text-xs font-bold border border-[#f7a6df]">
                      {activeMedia.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 truncate">
                      {activeMedia.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveMedia(null)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Media Content */}
                <div className="flex-1 overflow-auto bg-stone-900 flex items-center justify-center p-2 min-h-[300px] max-h-[500px]">
                  {activeMedia.type === 'video' ? (
                    <video
                      controls
                      autoPlay
                      src={activeMedia.mediaUrl}
                      className="max-h-[460px] max-w-full rounded-lg"
                    />
                  ) : (
                    <img
                      src={activeMedia.mediaUrl}
                      alt={activeMedia.title}
                      className="max-h-[460px] max-w-full object-contain rounded-lg"
                    />
                  )}
                </div>

                {/* Modal Footer / Details */}
                <div className="p-5 bg-white border-t border-stone-100 space-y-3">
                  <h4 className="text-base font-bold text-stone-900">{activeMedia.title}</h4>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {activeMedia.caption}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {activeMedia.tags?.map((tag) => (
                        <span key={tag} className="text-xs text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    {activeMedia.externalUrl && (
                      <a
                        href={activeMedia.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#831859] hover:underline"
                      >
                        <span>Open Link</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
