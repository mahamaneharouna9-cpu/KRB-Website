import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, Leaf, Map as MapIcon, Users, Pickaxe, Building2, Phone, Mail, MapPin, CheckCircle2, X } from 'lucide-react';

export const ServicesPage = () => (
  <div className="max-w-5xl mx-auto py-12 px-6 fade-in">
    <h1 className="text-4xl md:text-5xl font-bold text-[#0A1629] mb-4">Nos Domaines d'Expertise</h1>
    <p className="text-[#4A5568] text-lg mb-12 max-w-3xl">
      KRB Ingénieurs Conseils offre une gamme complète de services professionnels allant de la conception à la gestion et à la réalisation des projets dans plusieurs secteurs clés.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ServiceCard 
        index={0}
        icon={<Droplets className="text-blue-500" size={32} />}
        title="Génie Hydraulique"
        desc="Maîtrise totale du cycle de l'eau. Hydraulique villageoise, agricole et pastorale."
        items={[
          "Prospection géophysique et recherche d'eau",
          "Forages, puits et mini adductions d'eau",
          "Aménagements hydro-agricoles et barrages",
          "Modélisation numérique de nappes"
        ]}
      />
      <ServiceCard 
        index={1}
        icon={<Leaf className="text-green-500" size={32} />}
        title="Environnement"
        desc="Sécurisation de la conformité environnementale de vos projets."
        items={[
          "Études d'impact sur l'environnement",
          "Traitement des bassins versants",
          "Défense et restauration des sols",
          "Protection des berges et reboisement"
        ]}
      />
      <ServiceCard 
        index={2}
        icon={<MapIcon className="text-indigo-500" size={32} />}
        title="Développement Urbain & Rural"
        desc="Architecture des territoires résilients et aménagement."
        items={[
          "Urbanisme et génie civil",
          "Gestion des eaux usées et déchets",
          "Systèmes d'Information Géographique (SIG)",
          "Recherche action développement"
        ]}
      />
      <ServiceCard 
        index={3}
        icon={<Users className="text-amber-500" size={32} />}
        title="Intermédiation Sociale"
        desc="L'ingénierie technique couplée à l'intégration sociale."
        items={[
          "Évaluation de l'impact sociologique",
          "Formation des agents et comités",
          "Animation et sensibilisation",
          "Organisation communautaire"
        ]}
      />
      <ServiceCard 
        index={4}
        icon={<Pickaxe className="text-slate-500" size={32} />}
        title="Développement Minier"
        desc="Études et prospections pour le secteur minier."
        items={[
          "Levés géophysiques pour la prospection",
          "Cartographie géologique",
          "Études d'impacts sur l'environnement"
        ]}
      />
    </div>
  </div>
);

const ServiceCard = ({ title, desc, items, icon, index }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white rounded-3xl p-8 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col h-full hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow"
  >
    <div className="w-16 h-16 rounded-2xl bg-[#EEF2F6] flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-[#0A1629] mb-3">{title}</h3>
    <p className="text-[#4A5568] mb-6">{desc}</p>
    <ul className="space-y-3 mt-auto">
      {items.map((item: string, idx: number) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-[#2D3A4B] font-medium">
          <CheckCircle2 className="text-[#8FB1D0] shrink-0 mt-0.5" size={16} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export const ReferencesPage = () => {
  const [filter, setFilter] = React.useState('Tous');
  const [sort, setSort] = React.useState('date-desc');
  const [selectedRef, setSelectedRef] = React.useState<any>(null);

  const refs = [
    {
      name: "PRRIA",
      desc: "Projet de Renforcement de la Résilience face à l'Insécurité Alimentaire",
      client: "HAUT COMMISSARIAT à L'INITIATIVE 3N (Financement: BID)",
      valeur: "651 950 000 FCFA",
      details: "Études, contrôle et supervision pour la réhabilitation de 250 ha de périmètres irrigués, 300 puits, barrages d'irrigation et infrastructures pastorales dans les régions de Diffa, Tahoua et Tillabéry.",
      sector: "Hydraulique",
      numericValue: 651950000,
      completionYear: 2022,
      achievements: [
        'Réhabilitation de 250 ha de périmètres irrigués',
        'Construction de 300 puits de surface équipés',
        'Construction de 6 barrages pour l\'irrigation',
        'Construction de 18 forages solaires'
      ],
      specs: [
        'Études socio-économiques et d\'impact environnemental',
        'Études topographiques, hydrologiques et géotechniques',
        'Avants Projets Détaillés (APD) et Dossiers d\'Appels d\'Offres (DAO)',
        'Déploiement de contrôleurs permanents de chantier'
      ]
    },
    {
      name: "PRESIBALT",
      desc: "Programme de Réhabilitation et de Renforcement de la Résilience du Bassin du Lac Tchad",
      client: "Commission du Bassin du Lac Tchad (Financement: FAD)",
      valeur: "473 060 000 FCFA",
      details: "Dragage de 640 km de voies, aménagement de 4000 ha antiérosifs, restauration d'écosystèmes, et réalisation d'infrastructures agro-pastorales au Niger.",
      sector: "Environnement",
      numericValue: 473060000,
      completionYear: 2020,
      achievements: [
        'Dragage de 640 km de voies navigables',
        'Aménagement antiérosif sur 4000 hectares',
        'Restauration de 2000 ha d\'écosystèmes fragiles'
      ],
      specs: [
        'Maîtrise d\'œuvre complète et ingénierie de l\'eau',
        'Interventions SIG et études d\'impacts massives',
        'Déploiement d\'équipes hydrologues et électromécaniques'
      ]
    },
    {
      name: "PDELG",
      desc: "Projet de Développement de l'Elevage dans le Liptako Gourma",
      client: "Projet de Développement de l'Elevage dans le Liptako Gourma",
      valeur: "925 000 USD",
      details: "60 mois de contrôle et supervision d'aménagements pastoraux dans le Liptako Gourma, incluant barrages, pistes rurales et abattoirs.",
      sector: "Développement Rural",
      numericValue: 925000 * 600,
      completionYear: 2012,
      achievements: [
        'Aménagement de 1800 ha de bourgoutières',
        'Récupération de 5000 ha de parcours dégradés',
        'Construction de 102 km de pistes rurales',
        'Réalisation de divers abattoirs et puits'
      ],
      specs: [
        'Conception d\'ouvrages de Conservation des Eaux et des Sols (CES)',
        'Études d\'impact et supervision des travaux',
        'Gestion et transfert de compétences aux acteurs locaux'
      ]
    },
    {
      name: "PARCA",
      desc: "Projet d'Appui aux Réfugiés et aux Communautés d'Accueil",
      client: "Projet d'Appui aux Réfugiés et aux Communautés d'Accueil (Banque Mondiale)",
      valeur: "78 093 750 FCFA",
      details: "Études de faisabilité technique et environnementale pour des infrastructures agricoles dans de multiples communes de la région de Diffa.",
      sector: "Hydraulique",
      numericValue: 78093750,
      completionYear: 2021,
      achievements: [
        'Identification et évaluation de sites pour jardins irrigués',
        'Planification de systèmes d\'eau pour le bétail',
        'Conception d\'installations de stockage'
      ],
      specs: [
        'Études hydrogéologiques et agro-pédologiques',
        'Relevés topographiques détaillés',
        'Évaluations de la sauvegarde sociale et environnementale'
      ]
    },
    {
      name: "Abattoir Niamey",
      desc: "Réhabilitation de l'Abattoir Frigorifique de Niamey",
      client: "Projet d'Appui à la Compétitivité et à la Croissance (BADEA)",
      valeur: "115 000 USD",
      details: "Étude de faisabilité technico-économique, études APS/APD/DAO et contrôle des travaux pour la mise aux normes internationales de l'abattoir.",
      sector: "Génie Civil & Industriel",
      numericValue: 115000 * 600,
      completionYear: 2015,
      achievements: [
        'Mise aux normes internationales d\'hygiène',
        'Station d\'épuration intégrée',
        'Amélioration de la sécurité sanitaire'
      ],
      specs: [
        'Étude de faisabilité technico-économique',
        'Études APS/APD/DAO',
        'Contrôle complet des travaux'
      ]
    }
  ];

  const sectors = ['Tous', 'Hydraulique', 'Environnement', 'Développement Rural', 'Génie Civil & Industriel'];

  const filteredAndSortedRefs = React.useMemo(() => {
    let result = [...refs];
    
    if (filter !== 'Tous') {
      result = result.filter(r => r.sector === filter);
    }
    
    result.sort((a, b) => {
      if (sort === 'date-desc') return b.completionYear - a.completionYear;
      if (sort === 'date-asc') return a.completionYear - b.completionYear;
      if (sort === 'val-desc') return b.numericValue - a.numericValue;
      if (sort === 'val-asc') return a.numericValue - b.numericValue;
      return 0;
    });

    return result;
  }, [filter, sort]);

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 fade-in">
      <h1 className="text-4xl md:text-5xl font-bold text-[#0A1629] mb-4">Références Majeures</h1>
      <p className="text-[#4A5568] text-lg mb-8 max-w-3xl">
        Une sélection de nos projets d'ingénierie et de maîtrise d'œuvre les plus stratégiques en Afrique de l'Ouest.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center bg-[#EEF2F6] p-4 rounded-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
          <label className="text-sm font-semibold text-[#0A1629]">Secteur :</label>
          <select 
            value={filter} 
            onChange={e => setFilter(e.target.value)}
            className="bg-white border-[#E2E8F0] border-[1.5px] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#8FB1D0] text-[#4A5568]"
          >
            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
          <label className="text-sm font-semibold text-[#0A1629]">Trier par :</label>
          <select 
            value={sort} 
            onChange={e => setSort(e.target.value)}
            className="bg-white border-[#E2E8F0] border-[1.5px] rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#8FB1D0] text-[#4A5568]"
          >
            <option value="date-desc">Date (Récent)</option>
            <option value="date-asc">Date (Ancien)</option>
            <option value="val-desc">Valeur (Décroissant)</option>
            <option value="val-asc">Valeur (Croissant)</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredAndSortedRefs.map((ref, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={`${ref.name}-${idx}`}
            onClick={() => setSelectedRef(ref)}
            className="bg-white rounded-3xl p-8 cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-100 md:flex flex-col gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:scale-[1.01] transition-all"
          >
            <div className="flex flex-wrap flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-2xl font-bold text-[#031F41]">{ref.name}</h3>
              <div className="flex items-center gap-2">
                <span className="bg-[#E2E8F0] text-[#4A5568] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">{ref.sector}</span>
                <span className="bg-[#EEF2F6] text-[#0A1629] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">{ref.valeur}</span>
              </div>
            </div>
            <p className="font-semibold text-[#0A1629]">{ref.desc} <span className="font-normal text-[#8FB1D0]">- {ref.completionYear}</span></p>
            <p className="text-[#4A5568] leading-relaxed">{ref.details}</p>
            <div className="text-xs font-bold text-[#8FB1D0] uppercase tracking-wide mt-2">Client : <span className="text-[#0A1629] font-semibold">{ref.client}</span></div>
          </motion.div>
        ))}
        {filteredAndSortedRefs.length === 0 && (
          <div className="text-center py-12 text-[#4A5568]">Aucun projet trouvé pour cette sélection.</div>
        )}
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-bold text-[#0A1629] mb-8">Études de Cas Détaillées</h2>
        <div className="space-y-10">
          <CaseStudy 
            title="Projet PRRIA (Sécurité Alimentaire)"
            problem="L'insécurité alimentaire et la vulnérabilité climatique aiguë dans les régions de Diffa, Tahoua et Tillabéry nécessitaient des interventions hydro-agricoles et pastorales d'urgence."
            solution="KRB Ingénieurs Conseils a assuré l'intégralité des études techniques (APS, APD, DAO) et la maîtrise d'œuvre. Nous avons dimensionné et supervisé l'aménagement de puits, barrages et périmètres irrigués en tenant compte des contraintes environnementales et sociales."
            outcomes="Réhabilitation de 250 ha de périmètres irrigués, construction de plus de 300 puits et de 6 barrages majeurs, améliorant significativement la résilience de milliers d'agriculteurs locaux."
          />
          <CaseStudy 
            title="Programme PRESIBALT (Lac Tchad)"
            problem="Dégradation des écosystèmes fragiles du Bassin du Lac Tchad, provoquant l'assèchement des voies navigables et menaçant l'enclavement économique et la production de ressources primaires."
            solution="Déploiement d'une infrastructure complète de maîtrise d'œuvre incluant les relevés bathymétriques, les études environnementales et le contrôle scrupuleux des chantiers de restauration écologique."
            outcomes="Dragage réussi de 640 km de voies navigables, restauration de 2000 ha d'écosystèmes dégradés, et réalisation d'aménagements anti-érosifs massifs sur 4000 ha."
          />
          <CaseStudy 
            title="Projet PDELG (Liptako Gourma)"
            problem="Manque d'infrastructures pérennes pour soutenir l'élevage, couplé à une protection insuffisante de l'environnement agro-pastoral dans la zone ouest africaine."
            solution="Conception des ouvrages de CES/DRS, de retenues d'eau et de pistes. Supervision technologique et formation communautaire étendue sur 60 mois afin d'améliorer la productivité de la filière et la protection de l'environnement."
            outcomes="Aménagement de 1800 ha de bourgoutières, récupération de 5000 ha de parcours dégradés, et création de 102 km de pistes rurales opérationnelles."
          />
        </div>
      </div>

      <AnimatePresence>
        {selectedRef && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRef(null)}
              className="absolute inset-0 bg-[#0A1629]/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-[32px] shadow-2xl overflow-y-auto no-scrollbar pointer-events-auto"
            >
              <div className="sticky top-0 right-0 p-6 flex justify-end z-10 bg-gradient-to-b from-white via-white to-transparent">
                <button 
                  onClick={() => setSelectedRef(null)}
                  className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-8 pb-10 pt-0 -mt-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-[#EEF2F6] text-[#0A1629] text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">{selectedRef.sector}</span>
                  <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">{selectedRef.completionYear}</span>
                </div>
                
                <h2 className="text-3xl font-bold text-[#0A1629] mb-4 pr-12 leading-tight">
                  {selectedRef.name}
                </h2>
                <h3 className="text-xl font-bold text-[#031F41] mb-6">
                  {selectedRef.desc}
                </h3>
                
                <div className="bg-[#EEF2F6] rounded-2xl p-6 mb-8 flex flex-col gap-2">
                   <div><span className="text-sm font-bold text-[#8FB1D0] uppercase tracking-wider">Client:</span> <span className="font-semibold text-[#0A1629] block md:inline">{selectedRef.client}</span></div>
                   <div><span className="text-sm font-bold text-[#8FB1D0] uppercase tracking-wider">Valeur:</span> <span className="font-semibold text-[#0A1629] block md:inline">{selectedRef.valeur}</span></div>
                </div>

                <p className="text-[#4A5568] leading-relaxed mb-8 text-[15px]">
                  {selectedRef.details}
                </p>
                
                {selectedRef.achievements && (
                  <div className="mb-8">
                    <h4 className="text-[16px] font-bold text-[#0A1629] mb-4">Réalisations Clés</h4>
                    <ul className="space-y-3">
                       {selectedRef.achievements.map((item: string, i: number) => (
                         <li key={i} className="flex items-start text-[14px] text-[#4A5568]">
                           <span className="text-[#8FB1D0] mr-2 mt-0.5">•</span> {item}
                         </li>
                       ))}
                    </ul>
                  </div>
                )}

                {selectedRef.specs && (
                  <div className="mb-4">
                    <h4 className="text-[16px] font-bold text-[#0A1629] mb-4">Spécifications Techniques</h4>
                    <ul className="space-y-3">
                       {selectedRef.specs.map((item: string, i: number) => (
                         <li key={i} className="flex items-start text-[14px] text-[#4A5568]">
                           <span className="text-[#8FB1D0] mr-2 mt-0.5">•</span> {item}
                         </li>
                       ))}
                    </ul>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CaseStudy = ({title, problem, solution, outcomes}: {title: string, problem: string, solution: string, outcomes: string}) => (
  <div className="bg-[#FAFAFA] rounded-[24px] overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="bg-[#0A1629] p-6">
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <div className="p-8 grid md:grid-cols-3 gap-8">
      <div>
        <h4 className="flex items-center gap-2 text-sm font-bold text-[#0A1629] mb-3 uppercase tracking-wider"><span className="w-2 h-2 rounded-full bg-red-400"></span> Problématique</h4>
        <p className="text-[#4A5568] text-sm leading-relaxed">{problem}</p>
      </div>
      <div>
        <h4 className="flex items-center gap-2 text-sm font-bold text-[#0A1629] mb-3 uppercase tracking-wider"><span className="w-2 h-2 rounded-full bg-amber-400"></span> La Solution</h4>
        <p className="text-[#4A5568] text-sm leading-relaxed">{solution}</p>
      </div>
      <div>
        <h4 className="flex items-center gap-2 text-sm font-bold text-[#0A1629] mb-3 uppercase tracking-wider"><span className="w-2 h-2 rounded-full bg-green-400"></span> Résultats</h4>
        <p className="text-[#4A5568] text-sm leading-relaxed">{outcomes}</p>
      </div>
    </div>
  </div>
);

export const AboutPage = () => (
  <div className="max-w-5xl mx-auto py-12 px-6 fade-in">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0A1629] mb-6">À Propos de KRB Conseils</h1>
        <p className="text-[#4A5568] text-lg leading-relaxed mb-6">
          KRB Ingénieurs Conseils est un bureau d'études nigérien créé en 1996 par des spécialistes de grande expérience dans le domaine des sciences de la terre.
        </p>
        <p className="text-[#4A5568] leading-relaxed mb-10">
          Notre mission est de contribuer efficacement à la gestion de l'environnement et des ressources naturelles, au développement urbain et rural, et à la mobilisation des ressources en eau dans les pays arides et semi-arides.
        </p>
        
        <h3 className="text-2xl font-bold text-[#0A1629] mb-6">Nos Installations</h3>
        <ul className="space-y-6">
          <li className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EEF2F6] flex items-center justify-center shrink-0">
              <Building2 className="text-[#031F41]" size={24} />
            </div>
            <div>
              <strong className="block text-lg text-[#0A1629] mb-1">Siège Social Modèrne</strong>
              <span className="text-[#4A5568] leading-relaxed block">Immeuble R+1 et villa annexe (environ 1000 m²) situé au Quartier Terminus, Niamey. Équipé d'une salle de réunion de 20 places et de divers bureaux techniques.</span>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EEF2F6] flex items-center justify-center shrink-0">
              <MapPin className="text-[#031F41]" size={24} />
            </div>
            <div>
              <strong className="block text-lg text-[#0A1629] mb-1">Représentation Régionale</strong>
              <span className="text-[#4A5568] leading-relaxed block">SN-ERFAC s.a.r.l. située à Ouagadougou 2000 (Burkina Faso).</span>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="bg-[#041C3B] rounded-[32px] p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Users size={200} />
        </div>
        <div className="relative z-10 relative">
          <h3 className="text-2xl font-bold mb-8">Structure Technique</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-white/20 pl-6 py-2 hover:border-[#8FB1D0] transition-colors cursor-default">
              <span className="block text-sm text-white/60 mb-1 uppercase tracking-wider font-semibold">Département</span>
              <strong className="text-xl">Hydraulique</strong>
            </div>
            <div className="border-l-4 border-white/20 pl-6 py-2 hover:border-[#8FB1D0] transition-colors cursor-default">
              <span className="block text-sm text-white/60 mb-1 uppercase tracking-wider font-semibold">Département</span>
              <strong className="text-xl">Environnement</strong>
            </div>
            <div className="border-l-4 border-white/20 pl-6 py-2 hover:border-[#8FB1D0] transition-colors cursor-default">
              <span className="block text-sm text-white/60 mb-1 uppercase tracking-wider font-semibold">Département</span>
              <strong className="text-xl">Développement Rural</strong>
            </div>
            <div className="border-l-4 border-white/20 pl-6 py-2 hover:border-[#8FB1D0] transition-colors cursor-default">
              <span className="block text-sm text-white/60 mb-1 uppercase tracking-wider font-semibold">Département</span>
              <strong className="text-xl">Ingénierie Sociale</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const ContactPage = () => {
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = React.useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({...formData, name: val});
    if (errors.name) {
      if (val.trim()) setErrors({...errors, name: ''});
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({...formData, email: val});
    if (errors.email) {
      if (!val.trim()) setErrors({...errors, email: 'L\'email est requis'});
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) setErrors({...errors, email: 'Format d\'email invalide'});
      else setErrors({...errors, email: ''});
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 500) {
      setFormData({...formData, message: val});
      if (errors.message && val.trim()) {
         setErrors({...errors, message: ''});
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 fade-in">
      <div className="bg-white rounded-[32px] shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="p-10 md:p-16 bg-[#EEF2F6]">
            <h1 className="text-4xl font-bold text-[#0A1629] mb-4">Contactez-nous</h1>
            <p className="text-[#4A5568] mb-12">Notre équipe d'experts est prête à étudier vos projets d'ingénierie et d'aménagement stratégique.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="text-[#031F41]" size={20} />
                </div>
                <div>
                  <strong className="block text-[#0A1629] text-lg mb-1">Siège Niger</strong>
                  <span className="text-[#4A5568] leading-relaxed block">68 Rue du Sahel "Quartier Terminus"<br/>B.P. 10 265 Niamey, Niger</span>
                </div>
              </div>
              
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="text-[#031F41]" size={20} />
                </div>
                <div>
                  <strong className="block text-[#0A1629] text-lg mb-1">Téléphone & Fax</strong>
                  <span className="text-[#4A5568] leading-relaxed block">Tél: 20 73 47 53<br/>Fax: 20 73 53 83</span>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="text-[#031F41]" size={20} />
                </div>
                <div>
                  <strong className="block text-[#0A1629] text-lg mb-1">Email</strong>
                  <span className="text-[#4A5568] leading-relaxed block">krb@intnet.ne<br/>krb@krbconseils.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-10 md:p-16">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-[#0A1629] mb-2 uppercase tracking-wide">Nom Complet</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={handleNameChange}
                  onBlur={() => {
                    if (!formData.name.trim()) setErrors(prev => ({...prev, name: 'Le nom est requis'}));
                  }}
                  className={`w-full bg-[#FAFAFA] border-[1.5px] ${errors.name ? 'border-red-500' : 'border-[#E2E8F0]'} rounded-[16px] px-5 py-4 focus:outline-none focus:border-[#8FB1D0] transition-colors text-base`} 
                  placeholder="Votre nom" 
                />
                {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0A1629] mb-2 uppercase tracking-wide">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={handleEmailChange}
                  onBlur={() => {
                    if (!formData.email.trim()) setErrors(prev => ({...prev, email: 'L\'email est requis'}));
                    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) setErrors(prev => ({...prev, email: 'Format d\'email invalide'}));
                  }}
                  className={`w-full bg-[#FAFAFA] border-[1.5px] ${errors.email ? 'border-red-500' : 'border-[#E2E8F0]'} rounded-[16px] px-5 py-4 focus:outline-none focus:border-[#8FB1D0] transition-colors text-base`} 
                  placeholder="votre@email.com" 
                />
                {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-[#0A1629] uppercase tracking-wide">Message</label>
                  <span className="text-xs font-medium text-[#8FB1D0]">{formData.message.length}/500</span>
                </div>
                <textarea 
                  rows={5} 
                  maxLength={500}
                  value={formData.message}
                  onChange={handleMessageChange}
                  onBlur={() => {
                    if (!formData.message.trim()) setErrors(prev => ({...prev, message: 'Le message est requis'}));
                  }}
                  className={`w-full bg-[#FAFAFA] border-[1.5px] ${errors.message ? 'border-red-500' : 'border-[#E2E8F0]'} rounded-[16px] px-5 py-4 focus:outline-none focus:border-[#8FB1D0] transition-colors text-base resize-none`} 
                  placeholder="Détails de votre requête..."
                ></textarea>
                {errors.message && <span className="text-red-500 text-sm mt-1">{errors.message}</span>}
              </div>
              <button 
                type="submit" 
                className={`w-full py-4 text-white font-bold rounded-[16px] text-lg transition-all ${submitted ? 'bg-green-600' : 'bg-[#0A1629] hover:bg-[#031F41] shadow-[0_4px_15px_rgba(10,22,41,0.2)]'}`}
              >
                {submitted ? 'Message Envoyé !' : 'Envoyer le message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
