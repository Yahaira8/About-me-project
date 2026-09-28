import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Image,
  Video,
  Share2,
  Sparkles,
  X,
  ExternalLink,
  Maximize2,
  Tag,
  Volume2,
  VolumeX,
  RefreshCw,
} from 'lucide-react';
import { mediaGalleryItems } from '../data';
import { MediaCardItem } from '../types';

interface VideoPlayerWithManagedAudioProps {
  mediaUrl: string;
}

const VideoPlayerWithManagedAudio = ({ mediaUrl }: VideoPlayerWithManagedAudioProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // When modal is clicked/opened, audio is active and starts up in sync
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsError(false);
    setIsLoading(true);

    // Initial audio setup: start with sound enabled
    video.muted = false;
    video.volume = 1;

    const startPlayback = async () => {
      try {
        await video.play();
        setIsPlaying(true);
        setIsAudioMuted(false);
        setIsLoading(false);
      } catch (err) {
        // If the browser blocks unmuted autoplay without prior element click,
        // fallback to muted autoplay so the video streams and loads without failing
        console.warn('Browser required initial user click for audio, playing muted:', err);
        try {
          video.muted = true;
          setIsAudioMuted(true);
          await video.play();
          setIsPlaying(true);
          setIsLoading(false);
        } catch {
          // Both autoplays blocked, user can press play control
          setIsPlaying(false);
          setIsLoading(false);
        }
      }
    };

    // Small timeout ensures DOM element is ready in modal
    const timer = setTimeout(() => {
      startPlayback();
    }, 50);

    return () => {
      clearTimeout(timer);
      // Clean up without clearing video.src so it doesn't break video lifecycle
      video.pause();
      video.currentTime = 0;
    };
  }, [mediaUrl]);

  // "and once the video ends, the audio mutes because it is done playing."
  const handleEnded = () => {
    setIsPlaying(false);
    setIsAudioMuted(true);
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  // "but if the video is played again, then the audio starts back up in accordance to the video that is actively playing"
  const handlePlay = () => {
    setIsPlaying(true);
    setIsAudioMuted(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1;
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      if (!nextMuted) {
        videoRef.current.volume = 1;
      }
      setIsAudioMuted(nextMuted);
    }
  };

  const handleRetry = () => {
    setIsError(false);
    setIsLoading(true);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center min-h-[300px]">
      <video
        ref={videoRef}
        key={mediaUrl}
        controls
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        onEnded={handleEnded}
        onPlay={handlePlay}
        onPause={handlePause}
        onWaiting={() => setIsLoading(true)}
        onPlaying={() => {
          setIsLoading(false);
          setIsPlaying(true);
        }}
        onLoadedData={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setIsError(true);
        }}
        className="max-h-[460px] max-w-full rounded-lg shadow-lg bg-black"
      >
        <source src={mediaUrl} type="video/mp4" />
        <source src={mediaUrl} />
        Your browser does not support HTML5 video playback.
      </video>

      {/* Loading Spinner */}
      {isLoading && !isError && (
        <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center rounded-lg pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-white">
            <RefreshCw className="w-6 h-6 animate-spin text-[#f7a6df]" />
            <span className="text-xs font-medium">Loading video...</span>
          </div>
        </div>
      )}

      {/* Unmute Prompt Banner if browser muted autoplay */}
      {isPlaying && isAudioMuted && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute bottom-16 px-4 py-2 rounded-full bg-[#f7a6df] text-stone-900 text-xs font-bold shadow-lg flex items-center gap-2 hover:bg-[#f28ecc] transition-transform hover:scale-105 cursor-pointer z-10 animate-bounce"
        >
          <Volume2 className="w-4 h-4" />
          <span>Click to Unmute Audio 🔊</span>
        </button>
      )}

      {/* Audio Toggle & Status Badge */}
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        <button
          type="button"
          onClick={toggleMute}
          className="px-2.5 py-1 rounded-md bg-stone-950/80 backdrop-blur-xs text-white text-[11px] font-medium flex items-center gap-1.5 hover:bg-stone-900 transition-colors cursor-pointer shadow-sm"
          title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isAudioMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              <span>Audio Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#f7a6df]" />
              <span>Audio Active</span>
            </>
          )}
        </button>
      </div>

      {/* Error state fallback */}
      {isError && (
        <div className="absolute inset-0 bg-stone-950/95 flex flex-col items-center justify-center p-6 text-center text-white space-y-3 rounded-lg z-20">
          <p className="text-sm font-semibold text-stone-200">
            Video couldn't load directly in this preview frame.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRetry}
              className="px-3.5 py-1.5 rounded-lg bg-[#f7a6df] text-stone-900 text-xs font-bold hover:bg-[#f28ecc] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
            <a
              href={mediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-stone-800 text-white text-xs font-bold hover:bg-stone-700 flex items-center gap-1.5 transition-colors"
            >
              <span>Open Video in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export const MediaPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'image' | 'video' | 'social'>('all');
  const [activeMedia, setActiveMedia] = useState<MediaCardItem | null>(null);

  // Safety: when navigating away from MediaPage, stop and mute all media
  useEffect(() => {
    return () => {
      const mediaElements = document.querySelectorAll('video, audio');
      mediaElements.forEach((el) => {
        const m = el as HTMLMediaElement;
        m.pause();
        m.muted = true;
      });
    };
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeMedia) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeMedia]);

  const handleCloseModal = () => {
    const mediaElements = document.querySelectorAll('video, audio');
    mediaElements.forEach((el) => {
      const m = el as HTMLMediaElement;
      m.pause();
      m.muted = true;
    });
    setActiveMedia(null);
  };

  const filteredItems = selectedFilter === 'all'
    ? mediaGalleryItems
    : mediaGalleryItems.filter((item) => item.type === selectedFilter);

  return (
    <div id="media-gallery-page" className="relative pt-28 pb-24 bg-transparent min-h-screen">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffdef5] border border-[#f7a6df]/60 text-[#831859] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#831859]" />
            <span>Curated Showcase • {mediaGalleryItems.length} Media Cards</span>
          </div>
          <h1
            id="media-page-heading"
            className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-4"
          >
            <span className="neon-flowing-glow">Media & Creative Gallery</span>
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            A visual documentation of somethings going on in my life, milestones, hangouts with friends, Brazilian Jiu Jitsu training discipline, and my inspiration/ role model.
          </p>
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
            <span>Social</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div id="media-card-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setActiveMedia(item)}
              className="neon-card group cursor-pointer rounded-2xl bg-white shadow-xs overflow-hidden flex flex-col"
            >
              {/* Media Container with Hover Zoom - Only image thumbnail on grid, zero audio */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone-100 border-b border-stone-100">
                {item.type === 'video' ? (
                  <div className="relative w-full h-full bg-stone-900">
                    <img
                      src={item.thumbnailUrl || 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80'}
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

                  {item.externalUrl && (
                    <div className="mt-3">
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffdef5] hover:bg-[#f7a6df] border border-[#f7a6df] text-xs font-bold text-[#831859] hover:text-stone-900 transition-colors shadow-2xs group/btn cursor-pointer"
                      >
                        <span>{item.externalUrlLabel || 'Visit Website'}</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
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

        {/* Modal: Click to Expand / Audio Lifecycle Controlled Player */}
        <AnimatePresence>
          {activeMedia && (
            <motion.div
              id="media-expanded-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            >
              <motion.div
                id="media-expanded-modal"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="neon-card w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
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
                    onClick={handleCloseModal}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Media Content */}
                <div className="flex-1 overflow-auto bg-stone-900 flex items-center justify-center p-2 min-h-[300px] max-h-[500px]">
                  {activeMedia.type === 'video' ? (
                    <VideoPlayerWithManagedAudio
                      mediaUrl={activeMedia.mediaUrl}
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
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#ffdef5] hover:bg-[#f7a6df] border border-[#f7a6df] text-xs font-bold text-[#831859] hover:text-stone-900 transition-colors shadow-2xs"
                      >
                        <span>{activeMedia.externalUrlLabel || 'Open Link'}</span>
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
