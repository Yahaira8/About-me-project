import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  Scissors,
  Gift,
  Maximize2,
  X,
  Tag,
  Clock,
  Layers,
  Filter,
  CheckCircle2,
  Clock3
} from 'lucide-react';
import { AmbientHeaderBokeh } from '../components/AmbientHeaderBokeh';

interface CrochetProject {
  id: string;
  title: string;
  category: 'Amigurumi' | 'Sea Life' | 'Keychains' | 'In Progress';
  status: 'Completed' | 'In Progress';
  time: string;
  yarn: string;
  technique: string;
  defaultImage: string;
  isPlaceholder?: boolean;
  description: string;
  story: string;
  tags: string[];
}

export const ChoiceCrochetPage = () => {
  const initialProjects: CrochetProject[] = [
    {
      id: 'crochet-pug-squad',
      title: 'Handmade Velvet Pug Puppy Squad',
      category: 'Amigurumi',
      status: 'Completed',
      time: '12.0 Hours',
      yarn: 'Plush Chenille & Blanket Velvet Yarn in Cream, Dark Espresso & Soft Pink',
      technique: 'Continuous single crochet rounds, 3D snout sculpting, folded puppy ears & coiled tails',
      defaultImage: 'https://i.imgur.com/J12hGB3.jpeg',
      isPlaceholder: false,
      description: 'An adorable squad of six chubby amigurumi pugs hand-crocheted with super plush chenille yarn, featuring dark flat snouts, folded ears, little pink tongues, and glossy safety eyes.',
      story: 'One of my proudest amigurumi creations! I wanted to make a whole litter of squishy velvet pugs. Working with chunky chenille yarn gave them an incredibly soft, cloud-like feel. Each pug has its own personality, from the tiny pink tongues peeking out of their snouts to their little curled tails. Lining all six of them up together on the mat was the most satisfying feeling!',
      tags: ['PugLovers', 'Amigurumi', 'ChenilleYarn', 'PlushPuppies', 'HandmadePugs']
    },
    {
      id: 'crochet-jellyfishes',
      title: 'Handmade Crochet Jellyfishes',
      category: 'Sea Life',
      status: 'Completed',
      time: '5.5 Hours',
      yarn: 'Multi-Color Cotton & Soft Acrylic Yarn',
      technique: 'Continuous spiral rounds with curled chains for curly tentacles',
      defaultImage: 'https://i.imgur.com/jareEOL.jpeg',
      isPlaceholder: false,
      description: 'Vibrant domed bell crowns with intricate spiral-curled tentacles, textured frills, and expressive safety eyes.',
      story: 'One of my all-time favorite creative projects! Crocheting these jellyfishes allowed me to experiment with gradient color pairings and twisting tentacle tension so each jellyfish has its own distinct personality and bouncy movement.',
      tags: ['SeaLife', 'Tentacles', 'Amigurumi', 'HandmadeWithLove']
    },
    {
      id: 'crochet-turtle',
      title: 'Baby Sea Turtle Amigurumi',
      category: 'Sea Life',
      status: 'Completed',
      time: '4.5 Hours',
      yarn: 'Mint & Sage Green Cotton Blend',
      technique: 'Hexagonal dome shell with seamless flipper attachments',
      defaultImage: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
      isPlaceholder: true,
      description: 'Sculpted shell using spiral rounds with textured swimming flippers and hand-embroidered facial accents.',
      story: 'Designed with calming ocean tones. The textured back shell is shaped through increases and invisible decreases to create a gently curved profile.',
      tags: ['SeaTurtle', 'OceanVibes', 'CottonYarn', 'Amigurumi']
    },
    {
      id: 'crochet-bunny',
      title: 'Pastel Bunny with Floppy Ears',
      category: 'Amigurumi',
      status: 'Completed',
      time: '6.0 Hours',
      yarn: 'Baby Pink Chenille Velvet Yarn',
      technique: 'Fluffy chenille single crochet with lavender ear linings',
      defaultImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      isPlaceholder: true,
      description: 'Ultra-soft plushie crafted with safety eyes, a fluffy pompom tail, and long poseable floppy ears.',
      story: 'Chenille yarn is famously tricky to maintain tension with, but the resulting cloud-like softness is unmatched. A cozy companion piece for study breaks.',
      tags: ['Bunny', 'ChenilleYarn', 'PastelAesthetic', 'SoftToys']
    },
    {
      id: 'crochet-cat',
      title: 'Mini Calico Cat & Kitten',
      category: 'Amigurumi',
      status: 'Completed',
      time: '5.0 Hours',
      yarn: 'Tri-Color Cream, Peach & Charcoal Yarn',
      technique: 'Intarsia color-blocking and curved tail armature',
      defaultImage: 'https://images.unsplash.com/photo-1607453998774-d533f65adc99?auto=format&fit=crop&w=800&q=80',
      isPlaceholder: true,
      description: 'Patchwork color-blocking technique creating distinctive markings, pointed kitten ears, and a resting posture.',
      story: 'Features seamless color changes mid-round so the calico spots appear organic and lively across the body and forehead.',
      tags: ['CalicoCat', 'KittenPlushie', 'ColorWork', 'Amigurumi']
    },
    {
      id: 'crochet-frog-keychain',
      title: 'Strawberry Froggy Pocket Pal',
      category: 'Keychains',
      status: 'Completed',
      time: '3.0 Hours',
      yarn: 'Sage Green & Strawberry Red Cotton Yarn',
      technique: 'Micro-crochet rounds with mini bobble stitch eyes',
      defaultImage: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=800&q=80',
      isPlaceholder: true,
      description: 'Miniature palm-sized frog wearing a sculpted strawberry beret with yellow seed stitches and silver key ring.',
      story: 'A cheerful everyday accessory designed to clip onto backpacks and tote bags. Quick to make and a great scrap-yarn project!',
      tags: ['Keychain', 'Froggy', 'StrawberryBeret', 'PocketPal']
    },
    {
      id: 'crochet-whale-shark',
      title: 'Whale Shark Cuddle Cushion',
      category: 'In Progress',
      status: 'In Progress',
      time: '8+ Hours (Est.)',
      yarn: 'Denim Heather Chunky Blanket Yarn',
      technique: 'Wide-mouth continuous body with French knot dorsal spots',
      defaultImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      isPlaceholder: true,
      description: 'Large aquatic gentle giant currently in progress with wide pectoral fins and embroidered starry spots.',
      story: 'Currently on my crafting hook! Crafting a full body pillow size requires multiple skeins of blanket yarn and precise increase pacing.',
      tags: ['InTheWorks', 'WhaleShark', 'ChunkyYarn', 'PillowPlush']
    }
  ];

  // Active filter category and modal state
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<CrochetProject | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = ['All', 'Sea Life', 'Amigurumi', 'Keychains', 'In Progress'];

  const filteredProjects = initialProjects.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const getProjectImage = (project: CrochetProject) => {
    return project.defaultImage;
  };

  return (
    <div id="crochet-page" className="relative pt-28 pb-24 bg-stone-50 min-h-screen overflow-hidden">
      <AmbientHeaderBokeh variant="hero" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffdef5] border border-[#f7a6df]/60 text-[#831859] text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-[#831859]" />
            <span>Choice Page 2 • Project Gallery & Craft Showcase</span>
          </div>
          <h1
            id="crochet-heading"
            className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-4"
          >
            <span className="neon-flowing-glow">Handmade Crochet Creations</span>
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            A dedicated project gallery documenting yarn creations, custom amigurumi plushies, work-in-progress pieces, and creative design notes.
          </p>
        </div>

        {/* Gallery Overview & Highlights Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="neon-card bg-white p-4 rounded-xl text-center">
            <p className="text-2xl font-bold font-serif text-[#831859]">{initialProjects.length}+</p>
            <p className="text-xs text-stone-500 font-medium">Documented Projects</p>
          </div>
          <div className="neon-card bg-white p-4 rounded-xl text-center">
            <p className="text-2xl font-bold font-serif text-[#831859]">Amigurumi</p>
            <p className="text-xs text-stone-500 font-medium">Core Specialty</p>
          </div>
          <div className="neon-card bg-white p-4 rounded-xl text-center">
            <p className="text-2xl font-bold font-serif text-[#831859]">Magic Ring</p>
            <p className="text-xs text-stone-500 font-medium">Favorite Technique</p>
          </div>
          <div className="neon-card bg-white p-4 rounded-xl text-center">
            <p className="text-2xl font-bold font-serif text-[#831859]">Pediatrics</p>
            <p className="text-xs text-stone-500 font-medium">Gifting Aspiration</p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <div className="flex items-center gap-1 text-xs font-bold text-stone-500 mr-2 px-2">
              <Filter className="w-3.5 h-3.5 text-[#831859]" />
              <span>Filter:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#831859] text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-[#ffdef5]/60 text-stone-600 hover:text-[#831859]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-medium text-stone-500 px-2 hidden sm:block">
            Showing <strong className="text-stone-900">{filteredProjects.length}</strong> creations
          </div>
        </div>

        {/* Gallery Grid */}
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filteredProjects.map((project) => {
            const currentImg = getProjectImage(project);
            const isActualUserPhoto = !project.isPlaceholder;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="neon-card group bg-white rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={currentImg}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-white text-xs font-medium flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Click to view project details</span>
                      </span>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#ffdef5]/95 text-[#831859] border border-[#f7a6df]/70 shadow-2xs backdrop-blur-xs">
                        {project.category}
                      </span>
                      {isActualUserPhoto ? (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                          Authentic Photo
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-900/80 text-white backdrop-blur-xs">
                          Placeholder
                        </span>
                      )}
                    </div>

                    {/* Status Pill */}
                    <div className="absolute bottom-3 left-3">
                      {project.status === 'Completed' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 text-emerald-800 shadow-xs backdrop-blur-xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Finished Piece</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 text-amber-800 shadow-xs backdrop-blur-xs">
                          <Clock3 className="w-3 h-3 text-amber-600 animate-spin" />
                          <span>In Progress</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="text-base font-bold text-stone-900 group-hover:text-[#831859] transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                      <span className="text-[11px] font-semibold text-[#831859] bg-[#ffdef5] px-2 py-0.5 rounded shrink-0">
                        {project.time}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Quick Specs */}
                    <div className="pt-2 border-t border-stone-100 space-y-1.5 text-[11px] text-stone-500">
                      <div className="flex items-center gap-1.5 truncate">
                        <Layers className="w-3.5 h-3.5 text-[#831859] shrink-0" />
                        <span className="truncate"><strong>Yarn:</strong> {project.yarn}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Scissors className="w-3.5 h-3.5 text-[#831859] shrink-0" />
                        <span className="truncate"><strong>Stitch:</strong> {project.technique}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-medium">
                    {project.status === 'Completed' ? 'Completed Piece' : 'In Progress'}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#ffdef5] hover:bg-[#f7a6df] text-[#831859] transition-colors"
                  >
                    <span>View Details</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Future Pediatric Gifting Banner */}
        <div className="neon-card-gradient p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#f7a6df] text-stone-950 flex items-center justify-center shrink-0 shadow-xs">
            <Gift className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[#831859] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Compassion & Creativity in Healthcare</span>
            </div>
            <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900">
              Future Goal: Plushies for Pediatric Hospital Patients
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              When I begin clinical nursing rotations, I plan to hand-crochet soft animal plushies to gift to young patients in pediatric wards to bring them warmth, comfort, and cheerful smiles during recovery.
            </p>
          </div>
        </div>
      </div>

      {/* Pop-up Modal: Expanded Project Inspection */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
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
                    {selectedProject.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 truncate">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Image Box */}
              <div className="flex-1 overflow-auto bg-stone-950 flex items-center justify-center p-3 sm:p-4 min-h-[280px] max-h-[460px]">
                <img
                  src={getProjectImage(selectedProject)}
                  alt={selectedProject.title}
                  className="max-h-[420px] max-w-full object-contain rounded-lg shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Body & Specs */}
              <div className="p-5 bg-white border-t border-stone-100 space-y-3.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#831859]" />
                    <span>{selectedProject.title}</span>
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#831859]" />
                      <span>{selectedProject.time}</span>
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {selectedProject.story}
                </p>

                {/* Specs Box */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-stone-900">Yarn Material:</span>{' '}
                    <span className="text-stone-600">{selectedProject.yarn}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-900">Technique:</span>{' '}
                    <span className="text-stone-600">{selectedProject.technique}</span>
                  </div>
                </div>

                {/* Tags and Close button */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100 flex-wrap gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[11px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md"
                      >
                        <Tag className="w-2.5 h-2.5 text-[#831859]" />
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
