import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { categoryImages } from '../lib/images';
import { useTranslation } from 'react-i18next';
import interventionsData from '../data/interventions.json';

const categories = [
  "Tous",
  "Hydraulique",
  "Maîtrise & Évaluation Environnement",
  "Développement Urbain, Rural & SIG",
  "Ingénierie Sociale",
  "Mines et Énergie"
];

const categoryMap = {
  "Hydraulique": categoryImages.hydraulique,
  "Maîtrise & Évaluation Environnement": categoryImages.environnement,
  "Développement Urbain, Rural & SIG": categoryImages.ruralSig,
  "Ingénierie Sociale": categoryImages.sociale,
  "Mines et Énergie": categoryImages.energie
};

const allProjectImages: { id: number, title: string, category: string, image: string, size: string }[] = [];
let imgCounter = 0;

Object.entries(categoryMap).forEach(([catName, urls]) => {
  urls.forEach((url, idx) => {
    imgCounter++;
    // Simple deterministic sizing based on index
    const size = imgCounter % 8 === 0 ? "large" : (imgCounter % 5 === 0 ? "tall" : (imgCounter % 6 === 0 ? "wide" : "square"));
    
    // Attempt to extract string between slashes for a nice title
    let title = `Intervention ${catName.split(' ')[0]} ${idx + 1}`;
    
    allProjectImages.push({
      id: imgCounter,
      title,
      category: catName,
      image: url,
      size
    });
  });
});

// Since the array order is purely by category right now, let's shuffle it deterministically 
// so "Tous" looks like a nice mix
const projectsData = [...allProjectImages].sort((a, b) => {
  const aIsNew = a.image.includes('/New/') ? -1 : 1;
  const bIsNew = b.image.includes('/New/') ? -1 : 1;
  
  if (aIsNew !== bIsNew) {
    return aIsNew - bIsNew;
  }
  
  // simple deterministic pseudo-random hash off the id
  return ((a.id * 7) % 10) - ((b.id * 7) % 10);
});

export default function Projets() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [failedImageIds, setFailedImageIds] = useState<Set<number>>(new Set());
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [location.search]);

  const filteredProjects = (activeCategory === "Tous" 
    ? projectsData 
    : projectsData.filter(p => p.category === activeCategory)
  ).filter(p => !failedImageIds.has(p.id));

  return (
    <div className="bg-surface pt-32 pb-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="font-display-lg text-5xl md:text-6xl text-primary font-bold mb-6">{t('Liste des Interventions')}</h1>
          <p className="font-body-lg text-xl text-on-surface-variant max-w-2xl">
            {t('Découvrez nos interventions à travers la région, illustrant notre expertise technique et notre engagement envers le développement durable.')}
          </p>
        </div>

        {/* Tabs Filter */}
        <div className="flex overflow-x-auto no-scrollbar gap-x-8 gap-y-2 mb-10 md:mb-16 border-b border-outline-variant pb-2 w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-label-lg text-lg transition-colors relative pb-2 whitespace-nowrap ${
                activeCategory === cat ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {t(cat)}
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
                    <img loading="lazy" 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={() => {
                        setFailedImageIds(prev => new Set(prev).add(project.id));
                      }}
                    />
                  </div>
                  
                  {/* Overlay that darkens on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:bg-black/20 transition-colors duration-500 sm:group-hover:bg-black/60" />

                  {/* Title sliding in from bottom */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-0 opacity-100 sm:translate-y-8 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 ease-out">
                    <span className="font-label-sm text-secondary uppercase tracking-widest text-xs mb-2">
                      {t(project.category)}
                    </span>
                    <h3 className="font-headline-md text-white text-2xl font-bold leading-tight">
                      {t(project.title)}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-on-surface-variant text-lg">{t('Aucun projet trouvé dans cette catégorie.')}</p>
          </div>
        )}

        {/* Detailed Interventions Table */}
        <div className="mt-32">
          <h2 className="font-display-md text-4xl text-primary font-bold mb-8">{t('Liste Détaillée des Interventions')}</h2>
          <div className="bg-white rounded-lg border border-outline-variant overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm whitespace-nowrap">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th className="px-6 py-4 font-bold text-primary">{t('Période')}</th>
                    <th className="px-6 py-4 font-bold text-primary">{t('Projet')}</th>
                    <th className="px-6 py-4 font-bold text-primary">{t('Description')}</th>
                    <th className="px-6 py-4 font-bold text-primary">{t('Lieu')}</th>
                    <th className="px-6 py-4 font-bold text-primary">{t('Client')}</th>
                    <th className="px-6 py-4 font-bold text-primary">{t('Financement')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {interventionsData.map((item, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-lowest transition-colors">
                      <td className="px-6 py-4 text-on-surface-variant font-medium">{item.date}</td>
                      <td className="px-6 py-4 text-primary font-semibold">{item.nom}</td>
                      <td className="px-6 py-4 text-on-surface max-w-xs truncate" title={item.description}>{item.description}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{item.lieu}</td>
                      <td className="px-6 py-4 text-on-surface">{item.client}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{item.financement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
