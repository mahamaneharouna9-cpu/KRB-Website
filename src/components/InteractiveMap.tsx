import React, { useState, useMemo, useRef, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl/maplibre';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Leaf, HardHat, Tractor, Lightbulb, X as CloseIcon } from 'lucide-react';
import baseMapStyle from '../lib/map-style.json';
import { useTranslation } from 'react-i18next';

// --- DATA: EXTRACTED FROM KRB REFERENCE DOCS ---
const KRB_PROJECTS = [
  { id: 1, refId: "p1", title: "PRRIA", location: "Tahoua, Niger", category: "Agricole", lat: 14.8888, lng: 5.2692, description: "Renforcement de la Résilience afin de lutter contre l’Insécurité Alimentaire", value: "651.9M FCFA", lecons: "Nécessité d'impliquer les autorités locales très en amont pour faciliter l'accès au foncier.", recommandations: "Prévoir une composante de maintenance post-projet d'au moins 2 ans." },
  { id: 2, refId: "p2", title: "PRESIBALT", location: "Diffa, Niger", category: "Environnement", lat: 13.3154, lng: 12.6113, description: "Programme de Réhabilitation et de Renforcement de la Résilience des Systèmes Socio-Ecologiques du Bassin du lac Tchad.", value: "473M FCFA", lecons: "La logistique en zone d'insécurité nécessite une planification budgétaire flexible.", recommandations: "Renforcer les capacités de stockage d'énergie solaire pour les bases de vie." },
  { id: 3, refId: "p3", title: "PARCA", location: "Tillabéry, Niger", category: "Agricole", lat: 14.2071, lng: 1.4535, description: "Appui aux Réfugiés et aux Communautés d’Accueil", value: "78.1M FCFA", lecons: "Le ciblage communautaire a considérablement réduit les conflits liés au partage des ressources.", recommandations: "Étendre l'approche participative à la sélection des espèces végétales." },
  { id: 4, refId: "p4", title: "PDERLG", location: "Liptako Gourma, Niger", category: "Agricole", lat: 13.5116, lng: 2.1254, description: "Développement de l’Elevage dans le Liptako Gourma", value: "462M FCFA", lecons: "La transhumance exige des infrastructures de santé animale mobiles.", recommandations: "Développer la connectivité mobile pour le suivi des couloirs de passage." },
  { id: 5, refId: "p5", title: "Abattoir Niamey", location: "Niamey, Niger", category: "Infrastructures", lat: 13.5116, lng: 2.1254, description: "Réhabilitation et Mise aux Normes de l'Abattoir Frigorifique", value: "$115,000", lecons: "Le traitement des effluents doit être dimensionné avec une marge capacitaire de sécurité.", recommandations: "Anticiper l'intégration d'unités de production de biogaz." },
  { id: 6, refId: "p6", title: "AEP Multi-Villages", location: "Dosso, Niger", category: "Eau", lat: 13.0490, lng: 3.1937, description: "Adduction d'Eau Potable pour 15 villages de la région de Dosso", value: "310M FCFA", lecons: "Les comités de gestion de l'eau nécessitent une formation continue sur 12 mois.", recommandations: "Privilégier les compteurs prépayés volumétriques pour assurer le recouvrement." },
  { id: 7, refId: "p7", title: "Reboisement Tahoua", location: "Tahoua, Niger", category: "Environnement", lat: 14.8888, lng: 5.2692, description: "Création de ceintures vertes forestières autour des axes routiers", value: "185M FCFA", lecons: "Le choix des essences (Acacia Senegal vs autres) modifie drastiquement le taux de survie.", recommandations: "Garantir un approvisionnement en eau pour les 6 premiers mois vitaux." },
  { id: 8, refId: "p8", title: "PASEC", location: "Zinder, Niger", category: "Infrastructures", lat: 13.8018, lng: 8.9881, description: "Programme d’Appui au Secteur de l’Éducation (Infrastructures)", value: "850M FCFA", lecons: "La standardisation des plans de classe accélère les délais de construction de 20%.", recommandations: "Intégrer systématiquement des rampes PMR dès la phase d'esquisse." },
  { id: 9, refId: "p9", title: "Schéma Directeur Maradi", location: "Maradi, Niger", category: "Agricole", lat: 13.5000, lng: 7.1017, description: "Plan de Développement Urbain de la ville de Maradi horizon 2040", value: "120M FCFA", lecons: "L'anticipation de l'étalement urbain doit tenir compte de la spéculation foncière périurbaine.", recommandations: "Mettre en place des réserves foncières stratégiques rapidement." },
  { id: 10, refId: "p10", title: "Étude d'Impact Mine d'Or", location: "Téra, Niger", category: "Environnement", lat: 14.0115, lng: 0.7531, description: "Étude d'Impact Environnemental et Social d'une exploitation aurifère", value: "450M FCFA", lecons: "Le dialogue régulier et l'audit environnemental partagé limitent considérablement l'hostilité.", recommandations: "Digitaliser le suivi des plaintes des communautés riveraines." },
  { id: 11, refId: "p11", title: "Barrages Agadez", location: "Agadez, Niger", category: "Eau", lat: 16.9733, lng: 7.9911, description: "Conception de barrages collinaires et micro-barrages", value: "390M FCFA", lecons: "Le taux d'évaporation demande de concevoir des réservoirs plus profonds qu'étendus.", recommandations: "Inclure le reboisement en amont pour limiter l'envasement." },
  { id: 12, refId: "p12", title: "Route Rurale Kollo", location: "Kollo, Niger", category: "Infrastructures", lat: 13.3043, lng: 2.3390, description: "Aménagement d'une route rurale en terre moderne (55km)", value: "720M FCFA", lecons: "Le recours à la main d'œuvre locale sous format HIMO améliore le respect de l'infrastructure.", recommandations: "Prévoir des ralentisseurs près des zones de marchés hebdomadaires." },
];

const CATEGORIES = ["Tous", "Eau", "Agricole", "Environnement", "Infrastructures", "Expertise"];

const CategoryIcon = ({ category, className = "w-5 h-5" }: { category: string, className?: string }) => {
  switch (category) {
    case 'Eau': return <Droplet className={className} />;
    case 'Environnement': return <Leaf className={className} />;
    case 'Infrastructures': return <HardHat className={className} />;
    case 'Agricole': return <Tractor className={className} />;
    case 'Expertise': return <Lightbulb className={className} />;
    default: return <HardHat className={className} />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Eau': return 'text-cyan-600 bg-cyan-100 border-cyan-200';
    case 'Agricole': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
    case 'Environnement': return 'text-lime-600 bg-lime-100 border-lime-200';
    case 'Infrastructures': return 'text-amber-600 bg-amber-100 border-amber-200';
    case 'Expertise': return 'text-purple-600 bg-purple-100 border-purple-200';
    default: return 'text-blue-600 bg-blue-100 border-blue-200';
  }
};

const customMapStyle = { ...(baseMapStyle as any) };
customMapStyle.layers = customMapStyle.layers.map((layer: any) => {
    if (layer.id === 'background' || layer.id === 'landcover' || layer.id.startsWith('landuse') || layer.id.startsWith('park')) {
        const colorKey = layer.type === 'background' ? 'background-color' : 'fill-color';
        return { ...layer, paint: { ...layer.paint, [colorKey]: "#1e3a8a" } }; // Dark blue continent
    }
    if (layer.id === 'water' || layer.id === 'waterway' || layer.id === 'water_name') {
        const colorKey = layer.type === 'line' ? 'line-color' : 'fill-color';
        return { ...layer, paint: { ...layer.paint, [colorKey]: "#ffffff" } }; // White oceans
    }
    if (layer.id.startsWith('boundary')) {
        return { ...layer, paint: { ...layer.paint, "line-color": "#ffffff", "line-opacity": 0.2 } }; // White borders
    }
    return layer;
});

export default function InteractiveMap({ wrapperClass = "relative w-full h-[600px] bg-white overflow-hidden font-sans text-slate-800 rounded-2xl shadow-xl border border-outline-variant" }: { wrapperClass?: string }) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [kbExpanded, setKbExpanded] = useState(false);
  const mapRef = useRef<any>(null);

  // Inject MapLibre CSS required for the map engine to render correctly
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
        document.head.removeChild(link);
    };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") return KRB_PROJECTS;
    return KRB_PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleMarkerClick = (project: any, e: any) => {
    e.originalEvent.stopPropagation();
    setSelectedProject(project);
    
    // Smooth cinematic pan to the selected project
    mapRef.current?.flyTo({
      center: [project.lng, project.lat],
      zoom: 6,
      pitch: 45,
      duration: 1500,
      essential: true
    });

    // Dispatch event to sync with Projects list
    if (project.refId) {
      const event = new CustomEvent('projectSelected', { detail: project.refId });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className={wrapperClass}>
      
      {/* MAP ENGINE: MapLibre via react-map-gl. Custom dynamically loaded style */}
      <Map
        ref={mapRef}
        initialViewState={{
          bounds: [
            [-22, -35], // Southwest coordinates of Africa
            [55, 38]   // Northeast coordinates of Africa
          ],
          fitBoundsOptions: { padding: 40 }
        }}
        mapStyle={customMapStyle as any}
        style={{ width: '100%', height: '100%' }}
        onClick={() => {
          if (selectedProject) {
            setSelectedProject(null);
            mapRef.current?.fitBounds([
              [-22, -35], // Southwest coordinates of Africa
              [55, 38]   // Northeast coordinates of Africa
            ], { padding: 40, duration: 1500 });
          }
        }}
        scrollZoom={false}
        dragPan={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
        keyboard={false}
        cooperativeGestures={false}
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <Marker
              key={project.id}
              longitude={project.lng}
              latitude={project.lat}
              anchor="bottom"
              onClick={(e) => handleMarkerClick(project, e)}
            >
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
                aria-label={t(`Projet: ${project.title} à ${project.location}`)}
              >
                {/* Subtle Pulse Animation layer underneath */}
                <div className={`absolute -inset-2 rounded-full transition-all duration-300 ${getCategoryColor(project.category).split(' ')[1]} ${
                  selectedProject?.id === project.id 
                    ? 'opacity-80 animate-ping' 
                    : 'opacity-0 group-hover:opacity-60 group-hover:animate-ping'
                }`}></div>
                
                {/* Marker Pin */}
                <div className={`relative w-10 h-10 rounded-full border border-black/5 flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 ${
                  selectedProject?.id === project.id 
                    ? 'bg-primary text-white border-primary shadow-[0_0_20px_rgba(0,65,107,0.5)] scale-110' 
                    : 'bg-white text-slate-800 shadow-[0_4px_15px_rgba(0,0,0,0.1)] backdrop-blur-md'
                }`}>
                  <div className={selectedProject?.id === project.id ? 'text-white' : getCategoryColor(project.category).split(' ')[0]}>
                    <CategoryIcon category={project.category} />
                  </div>
                </div>
              </motion.button>
            </Marker>
          ))}
        </AnimatePresence>
      </Map>

      {/* Map Reset Button */}
      {selectedProject && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={() => {
            setSelectedProject(null);
            mapRef.current?.fitBounds([
              [-22, -35], // Southwest coordinates of Africa
              [55, 38]   // Northeast coordinates of Africa
            ], { padding: 40, duration: 1500 });
          }}
          className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-md border border-outline-variant text-primary hover:text-secondary hover:bg-surface-variant transition-colors focus:outline-none focus:ring-2 focus:ring-primary flex items-center gap-2"
          aria-label={t("Réinitialiser la vue globale de la carte")}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          <span className="font-label-sm text-sm font-bold hidden md:inline">{t('Vue Globale')}</span>
        </motion.button>
      )}

      {/* --- FLOATING RIGHT PANEL: PROJECT DETAILS OVERLAY --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute top-6 right-6 z-20 w-96 max-h-[calc(100vh-3rem)] overflow-y-auto hidden sm:block pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-2xl border border-outline-variant/50 rounded-3xl p-1 shadow-2xl pointer-events-auto">
              
              <div className="bg-surface/40 rounded-2xl p-6 relative overflow-hidden">
                {/* Abstract Background Glow */}
                <div className={`absolute -top-10 -right-10 w-40 h-40 blur-3xl rounded-full opacity-40 ${getCategoryColor(selectedProject.category).split(' ')[1]}`}></div>

                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    mapRef.current?.fitBounds([
                      [-22, -35], // Southwest coordinates of Africa
                      [55, 38]   // Northeast coordinates of Africa
                    ], { padding: 40, duration: 1500 });
                  }}
                  className="absolute top-4 right-4 p-2 bg-surface rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant hover:text-on-surface border border-outline-variant/50 z-10"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>

                <div className="relative z-10">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4 border ${getCategoryColor(selectedProject.category)}`}>
                    <CategoryIcon category={selectedProject.category} />
                    {t(selectedProject.category).toUpperCase()}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-on-surface leading-tight mb-2">{selectedProject.title}</h2>
                  
                  <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6 pb-6 border-b border-outline-variant/50">
                    <svg className="w-4 h-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    {selectedProject.location}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-primary/70 font-bold mb-2">{t('Description du Projet')}</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        {t(selectedProject.description)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-surface rounded-xl p-4 border border-outline-variant/30">
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70 font-bold mb-1">{t('Financement')}</p>
                        <p className="text-sm font-mono text-on-surface font-semibold">{t(selectedProject.value)}</p>
                      </div>
                      <div className="bg-surface rounded-xl p-4 border border-outline-variant/30">
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70 font-bold mb-1">{t('Coordonnées')}</p>
                        <p className="text-xs font-mono text-on-surface-variant">{selectedProject.lat.toFixed(3)}°N</p>
                        <p className="text-xs font-mono text-on-surface-variant">{selectedProject.lng.toFixed(3)}°E</p>
                      </div>
                    </div>

                    {/* Knowledge Base Section */}
                    {selectedProject.lecons && (
                      <div className="border border-outline-variant/50 rounded-xl overflow-hidden bg-surface-container-lowest">
                        <button
                          onClick={() => setKbExpanded(!kbExpanded)}
                          aria-expanded={kbExpanded}
                          className="w-full flex items-center justify-between p-4 bg-primary/5 hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">lightbulb</span>
                            <span className="font-label-md text-sm font-bold text-primary">{t('Base de Connaissances IA')}</span>
                          </div>
                          <span className={`material-symbols-outlined text-primary transition-transform duration-300 ${kbExpanded ? 'rotate-180' : ''}`}>
                            expand_more
                          </span>
                        </button>
                        <AnimatePresence>
                          {kbExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="p-4 space-y-4">
                                <div>
                                  <h4 className="font-label-sm text-xs uppercase tracking-widest text-secondary font-bold mb-1">{t('Leçons Apprises')}</h4>
                                  <p className="text-sm text-on-surface-variant">
                                    {t(selectedProject.lecons)}
                                  </p>
                                </div>
                                <div>
                                  <h4 className="font-label-sm text-xs uppercase tracking-widest text-secondary font-bold mb-1">{t('Recommandations Futures')}</h4>
                                  <p className="text-sm text-on-surface-variant">
                                    {t(selectedProject.recommandations)}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE POPUP OVERLAY (Shows up on smaller screens instead of side panel) */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedProject(null);
                mapRef.current?.fitBounds([
                  [-22, -35], // Southwest coordinates of Africa
                  [55, 38]   // Northeast coordinates of Africa
                ], { padding: 40, duration: 1500 });
              }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-30 sm:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="absolute bottom-4 left-4 right-4 z-40 sm:hidden pointer-events-none"
            >
               <div className="bg-white/95 backdrop-blur-xl border border-outline-variant/50 rounded-2xl p-5 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] relative pointer-events-auto max-h-[85vh] overflow-y-auto no-scrollbar">
                
                {/* Drag pill for visual cue */}
                <div className="w-12 h-1.5 bg-outline-variant rounded-full mx-auto mb-4" />

                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    mapRef.current?.fitBounds([
                      [-22, -35], // Southwest coordinates of Africa
                      [55, 38]   // Northeast coordinates of Africa
                    ], { padding: 40, duration: 1500 });
                  }}
                  className="absolute top-4 right-4 p-2 bg-surface rounded-full text-on-surface-variant z-10 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
                <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold mb-2 border ${getCategoryColor(selectedProject.category)}`}>
                  {t(selectedProject.category).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-on-surface mb-1">{selectedProject.title}</h2>
                <p className="text-sm text-on-surface-variant mb-3">{selectedProject.location}</p>
                <p className="text-xs text-on-surface-variant line-clamp-2 mb-4">{t(selectedProject.description)}</p>
                
                {/* Mobile KB Section */}
                {selectedProject.lecons && (
                  <div className="border border-outline-variant/50 rounded-xl overflow-hidden bg-surface-container-lowest mt-2">
                    <button
                      onClick={() => setKbExpanded(!kbExpanded)}
                      aria-expanded={kbExpanded}
                      className="w-full flex items-center justify-between p-3 bg-primary/5 hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-sm">lightbulb</span>
                        <span className="font-label-sm text-xs font-bold text-primary">{t('Connaissances IA')}</span>
                      </div>
                      <span className={`material-symbols-outlined text-primary text-sm transition-transform duration-300 ${kbExpanded ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    <AnimatePresence>
                      {kbExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="p-3 space-y-3">
                            <div>
                              <h4 className="font-label-sm text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">{t('Leçons Apprises')}</h4>
                              <p className="text-xs text-on-surface-variant line-clamp-2">
                                {t(selectedProject.lecons)}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-label-sm text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">{t('Recommandations')}</h4>
                              <p className="text-xs text-on-surface-variant line-clamp-2">
                                {t(selectedProject.recommandations)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
             </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
