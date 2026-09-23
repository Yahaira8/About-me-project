import { Heart, Sparkles, Scissors, Gift, Palette, Smile } from 'lucide-react';

export const ChoiceCrochetPage = () => {
  const creations = [
    {
      name: 'Pastel Bunny Plushie',
      yarn: 'Baby Pink Chenille Yarn',
      time: '6 Hours',
      description: 'Hand-stitched with safety eyes, a fluffy pompom tail, and custom lavender ear linings.'
    },
    {
      name: 'Baby Sea Turtle',
      yarn: 'Mint & Sage Cotton Blend',
      time: '4.5 Hours',
      description: 'Sculpted shell using spiral rounds with textured flippers and embroidered facial features.'
    },
    {
      name: 'Mini Calico Cat',
      yarn: 'Soft Velvet Yarn',
      time: '5 Hours',
      description: 'Patchwork color-blocking technique creating distinctive patches and a curved tail.'
    }
  ];

  return (
    <div id="crochet-page" className="pt-28 pb-24 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#ffdef5] border border-[#f7a6df]/60 text-[#831859] text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-[#831859]" />
            <span>Choice Page 2 • Creative Craft & Handiwork</span>
          </div>
          <h1
            id="crochet-heading"
            className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight mb-4"
          >
            Handmade Crochet Plushies
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Exploring color palettes, yarn textures, and sculpting tactile comfort one single stitch at a time.
          </p>
        </div>

        {/* Feature Hero Card with Media */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-14 bg-white p-6 sm:p-8 rounded-2xl border border-[#f7a6df]/50 shadow-xs">
          <div className="md:col-span-6 rounded-2xl overflow-hidden aspect-video border border-stone-200">
            <img
              src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80"
              alt="Handmade Crochet Soft Toys"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-bold text-[#831859] uppercase tracking-wider">
              Creative Sanctuary
            </span>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              The Art of Amigurumi
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              "Crocheting plushies is my primary form of artistic relaxation. Working with hook and yarn requires counting stitches, maintaining even tension, and envisioning three-dimensional shapes. Transforming a simple skein of yarn into a cheerful plushie brings endless joy."
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#ffdef5] text-[#831859] flex items-center gap-1">
                <Scissors className="w-3 h-3" />
                <span>Magic Rings</span>
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#ffdef5] text-[#831859] flex items-center gap-1">
                <Palette className="w-3 h-3" />
                <span>Pastel Aesthetics</span>
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#ffdef5] text-[#831859] flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Amigurumi</span>
              </span>
            </div>
          </div>
        </div>

        {/* Creation Showcase Cards */}
        <div className="mb-14">
          <h3 className="text-xl font-serif font-bold text-stone-900 mb-6 text-center">
            Featured Handmade Creations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creations.map((item) => (
              <div
                key={item.name}
                className="p-6 rounded-2xl bg-white border border-[#f7a6df]/50 hover:border-[#f7a6df] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#831859] bg-[#ffdef5] px-2.5 py-1 rounded-md">
                      {item.time}
                    </span>
                    <Smile className="w-4 h-4 text-[#831859]" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900 mb-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-stone-500 font-medium mb-3">
                    Material: {item.yarn}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pediatric Gifting Aspiration */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#ffdef5]/40 to-white border-2 border-[#f7a6df] shadow-xs flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#f7a6df] text-stone-950 flex items-center justify-center flex-shrink-0 shadow-xs">
            <Gift className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-bold text-stone-900">
              Future Goal: Plushies for Pediatric Hospital Patients
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              When I begin clinical nursing rotations, I plan to hand-crochet soft animal plushies to gift to young patients in pediatric wards to bring them warmth, comfort, and smiles during treatment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
