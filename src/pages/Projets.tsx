import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import imageMetadataDict from '../data/image_metadata.json';

const categories = [
  "Tous",
  "Hydraulique",
  "Maîtrise & Évaluation Environnement",
  "Développement Urbain, Rural & SIG",
  "Ingénierie Sociale",
  "Mines et Énergie"
];

const localImagesGlob = import.meta.glob([
  '/src/assets/images/Krb images/*.{png,jpg,jpeg,JPG,PNG,JPEG}',
  '/src/assets/images/krb_images/*.{png,jpg,jpeg,JPG,PNG,JPEG}',
  '/src/assets/images/Krbimages/*.{png,jpg,jpeg,JPG,PNG,JPEG}'
], { eager: true, query: '?url', import: 'default' });

const imageEntries = Object.entries(localImagesGlob) as [string, string][];

const projectsData = imageEntries.map(([originalPath, url], i) => {
  // Extract filename
  const filename = originalPath.split('/').pop()?.split('?')[0] || '';
  const decodedFilename = decodeURIComponent(filename);
  
  // Lookup metadata
  const meta = (imageMetadataDict as Record<string, any>)[decodedFilename];
  
  // Override for carefully identified "clean" images
  let overrideCategory: string | null = null;
  if (filename.includes('1778110779689') || filename.includes('1778112165114') || filename.includes('1778112209209')) overrideCategory = "Hydraulique";
  if (filename.includes('1778110884007') || filename.includes('1778112222216')) overrideCategory = "Maîtrise & Évaluation Environnement";
  if (filename.includes('1778110799142') || filename.includes('1778112180879')) overrideCategory = "Développement Urbain, Rural & SIG";
  if (filename.includes('1778110789403') || filename.includes('1778112194658')) overrideCategory = "Mines et Énergie";
  
  const assignedCategory = overrideCategory || meta?.category || categories[(i % (categories.length - 1)) + 1];
  const title = meta?.title || "Projet KRB " + (i + 1);
  const size = i % 8 === 0 ? "large" : (i % 5 === 0 ? "tall" : (i % 6 === 0 ? "wide" : "square"));
  
  return {
    id: i + 1,
    title,
    category: assignedCategory,
    image: url,
    size
  }
});

export default function Projets() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [location.search]);

  const filteredProjects = activeCategory === "Tous" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory);

  return (
    <div className="bg-surface pt-32 pb-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-display-lg text-5xl md:text-6xl text-primary font-bold mb-6">Nos Projets</h1>
          <p className="font-body-lg text-xl text-on-surface-variant max-w-2xl">
            Découvrez nos interventions à travers la région, illustrant notre expertise technique et notre engagement envers le développement durable.
          </p>
        </div>

        {/* Tabs Filter */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-16 border-b border-outline-variant pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-label-lg text-lg transition-colors relative pb-2 ${
                activeCategory === cat ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeTabIndicator"
                  className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
          <AnimatePresence>
            {filteredProjects.map((project) => {
              // Determine span based on size
              let spanClass = "col-span-1 row-span-1";
              if (project.size === "large") spanClass = "md:col-span-2 md:row-span-2";
              else if (project.size === "tall") spanClass = "md:col-span-1 md:row-span-2";
              else if (project.size === "wide") spanClass = "md:col-span-2 md:row-span-1";

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`${spanClass} relative rounded-lg overflow-hidden group cursor-pointer`}
                >
                  {/* Image with zoom effect */}
                  <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Overlay that darkens on hover */}
                  <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/60" />

                  {/* Title sliding in from bottom */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <span className="font-label-sm text-secondary uppercase tracking-widest text-xs mb-2">
                      {project.category}
                    </span>
                    <h3 className="font-headline-md text-white text-2xl font-bold leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-on-surface-variant text-lg">Aucun projet trouvé dans cette catégorie.</p>
          </div>
        )}

      </div>
    </div>
  );
}
