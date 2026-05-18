import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, Landmark, Banknote, ShieldCheck, Search, Globe, Droplet, Leaf, Tractor, HardHat, ChevronDown, ImageIcon } from 'lucide-react';
import { categoryImages } from '../lib/images';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const p10Img = "https://storage.googleapis.com/krbengineering/Mines%20et%20Energie/Mines%20et%20Energie/BILD0047.JPG";
const p3Img = "https://storage.googleapis.com/krbengineering/Ing%C3%A9nierie%20Sociale/Ing%C3%A9nierie%20Sociale/IMG-20190422-WA0042.jpg";
const p8Img = "https://storage.googleapis.com/krbengineering/D%C3%A9veloppement%20Rural%20&%20Urbain/D%C3%A9veloppement%20Rural%20&%20Urbain/aire%20Doungouro%20(2).JPG";
const p2Img = "https://storage.googleapis.com/krbengineering/Ma%C3%AEtrise%20Environnementale/Ma%C3%AEtrise%20Environnementale/IMG_20131108_160304_606.jpg";
const p7Img = "https://storage.googleapis.com/krbengineering/Ma%C3%AEtrise%20Environnementale/Ma%C3%AEtrise%20Environnementale/BILD5525.JPG";
const p6Img = "https://storage.googleapis.com/krbengineering/Ing%C3%A9nierie%20de%20l'Eau%20&%20Hydraulique/Ing%C3%A9nierie%20de%20l'Eau%20&%20Hydraulique/IMG_20161116_111545.jpg";
const p12Img = "https://storage.googleapis.com/krbengineering/Mines%20et%20Energie/Mines%20et%20Energie/BILD5557.JPG";
const p9Img = categoryImages.ruralSig[2] || categoryImages.ruralSig[0]; // missing mapping
const p11Img = "https://storage.googleapis.com/krbengineering/Mines%20et%20Energie/Mines%20et%20Energie/BILD5556.JPG";
const p5Img = "https://storage.googleapis.com/krbengineering/D%C3%A9veloppement%20Rural%20&%20Urbain/D%C3%A9veloppement%20Rural%20&%20Urbain/DSC07399.JPG";
const p4Img = "https://storage.googleapis.com/krbengineering/D%C3%A9veloppement%20Rural%20&%20Urbain/D%C3%A9veloppement%20Rural%20&%20Urbain/DSC04628.JPG";

// Project type definition
export interface ProjectRef {
  id: string;
  name: string;
  desc: string;
  client: string;
  valeur: string;
  details: string;
  sector: string;
  numericValue: number;
  completionYear: number;
  achievements: string[];
  specs: string[];
  funderCode?: string;
  funderType?: 'BID' | 'FAD' | 'WB' | 'BADEA';
  progress?: number;
  image?: string;
}

const SECTOR_EAU = "Ingénierie de l'Eau & Hydraulique";
const SECTOR_ENV = "Maîtrise Environnementale";
const SECTOR_RUR = "Développement Rural & Urbain";
const SECTOR_SOC = "Ingénierie Sociale";
const SECTOR_MIN = "Mines et Energie";

const baseProjects: ProjectRef[] = [
  {
    id: "p1",
    name: "PRRIA",
    desc: "Renforcement de la Résilience afin de lutter contre l’Insécurité Alimentaire",
    client: "HAUT COMMISSARIAT à L'INITIATIVE 3N",
    valeur: "651.9M FCFA",
    image: categoryImages.hydraulique[0],
    details: "Conception assistée (APS/APD), modélisations géotechniques résilientes face aux contraintes du Sahel. Suivi rigoureux de l'installation de nombreux puits et barrages.",
    sector: SECTOR_EAU,
    numericValue: 651950000,
    completionYear: 2022,
    achievements: [
      'Réhabilitation de 250 ha de périmètres irrigués',
      'Construction de 300 puits maraîchers',
      'Construction de 6 barrages',
      'Installation de 18 puits solaires Grundfos'
    ],
    specs: [
      'Études socio-économiques et environnementales',
      'Modélisation hydrogéologique',
      'Conception d\'ouvrages en béton armé'
    ],
    funderCode: "BID",
    funderType: "BID",
    progress: 100
  },
  {
    id: "p2",
    name: "PRESIBALT",
    desc: "Programme de Réhabilitation et de Renforcement (Bassin du lac Tchad)",
    client: "Commission du Bassin du Lac Tchad",
    valeur: "473M FCFA",
    image: p2Img,
    details: "Études EIES très poussées visant une perturbation nette zéro. Déploiement d'ingénierie environnementale pour le dragage et l'aménagement antiérosif.",
    sector: SECTOR_ENV,
    numericValue: 473000000,
    completionYear: 2020,
    achievements: [
      'Dragage de 640 km de voies fluviomaritimes',
      'Restauration de 2000 ha d\'écosystèmes',
      'Aménagement antiérosif de 4000 ha'
    ],
    specs: [
      'Études EIES complètes',
      'Ingénierie de dragage',
      'Cartographie SIG'
    ],
    funderCode: "FAD",
    funderType: "FAD"
  },
  {
    id: "p3",
    name: "PARCA",
    desc: "Appui aux Réfugiés et aux Communautés d’Accueil",
    client: "Banque Mondiale",
    valeur: "78.1M FCFA",
    image: p3Img,
    details: "Conception modulaire : Études de faisabilité minutieuses pour installer des \"Kits Agricoles\" standardisés (forages, mares) sans surmener la nappe phréatique.",
    sector: SECTOR_SOC,
    numericValue: 78100000,
    completionYear: 2021,
    achievements: [
      'Intégration socio-économique réussie',
      'Conception de dizaines de micro-infrastructures réplicables',
      'Protection extrême de la nappe phréatique'
    ],
    specs: [
      'Tests de perméabilité accélérés',
      'Kits agricoles modulaires'
    ],
    funderCode: "Banque Mondiale",
    funderType: "WB"
  },
  {
    id: "p4",
    name: "PDERLG",
    desc: "Développement de l’Elevage dans le Liptako Gourma",
    client: "Autorité de Développement",
    valeur: "462M FCFA",
    image: p4Img,
    details: "Études et supervision intégrées d'aménagements ruraux. Emploi intensif de briques stabilisées et concassés locaux pour les abattoirs vétérinaires.",
    sector: SECTOR_RUR,
    numericValue: 462000000,
    completionYear: 2012,
    achievements: [
      'Récupération active de 5000 ha de terres arides',
      'Construction de dizaines d\'infrastructures permanentes',
      'Soutien exceptionnel à l\'économie pastorale régionale'
    ],
    specs: [
      'Génie civil avec matériaux locaux',
      'Aménagement de parcours'
    ],
    funderCode: "BID",
    funderType: "BID"
  },
  {
    id: "p5",
    name: "Abattoir Niamey",
    desc: "Réhabilitation et Mise aux Normes de l'Abattoir Frigorifique",
    client: "PRACC / BADEA",
    valeur: "115K $US",
    image: p5Img,
    details: "Audits de stabilité architecturaux (scan 3D) pour intégrer de nouvelles installations frigorifiques à l'ammoniac hautes capacités et stations de biodigesteurs.",
    sector: SECTOR_MIN,
    numericValue: 115000 * 600,
    completionYear: 2015,
    achievements: [
      'Mise aux normes internationales sanitaires (OIE)',
      'Déploiement de biodigesteurs anaérobies',
      'Installation de frigorifiques à ammoniac'
    ],
    specs: [
      'Audit architectural 3D',
      'Ingénierie frigorifique',
      'Traitement des effluents'
    ],
    funderCode: "BADEA",
    funderType: "BADEA"
  },
  {
    id: "p6",
    name: "AEP Multi-Villages",
    desc: "Adduction d'Eau Potable pour 15 villages de la région de Dosso",
    client: "Ministère de l'Hydraulique",
    valeur: "310M FCFA",
    image: p6Img,
    details: "Raccordement au réseau d'un château d'eau principal et de réseaux secondaires. Supervision technique jusqu'à la réception.",
    sector: SECTOR_EAU,
    numericValue: 310000000,
    completionYear: 2018,
    achievements: [
      'Construction de 3 châteaux d\'eau 100m3',
      'Pose de 45 km de canalisations',
      'Accès à l\'eau pour 120,000 résidents'
    ],
    specs: ['Modélisation de réseau maillé EPANET', 'Contrôle qualité tuyauterie PEHD'],
    funderCode: "IDA",
    funderType: "WB"
  },
  {
    id: "p7",
    name: "Reboisement Tahoua",
    desc: "Création de ceintures vertes forestières autour des axes routiers",
    client: "Fonds pour l'Environnement Mondial",
    valeur: "185M FCFA",
    image: p7Img,
    details: "Conception du dispositif, sélection des essences et supervision des plantations massives avec approche HIMO (Haute Intensité de Main d'Oeuvre).",
    sector: SECTOR_ENV,
    numericValue: 185000000,
    completionYear: 2019,
    achievements: [
      'Plantation de 1,5 millions d\'arbres',
      'Création de 500 emplois verts temporaires',
      'Fixation de 420 ha de dunes'
    ],
    specs: ['Approche HIMO', 'Études pédologiques'],
    funderCode: "FEM",
    funderType: "WB"
  },
  {
    id: "p8",
    name: "PASEC",
    desc: "Programme d’Appui au Secteur de l’Éducation (Infrastructures)",
    client: "KfW",
    valeur: "850M FCFA",
    image: p8Img,
    details: "Maîtrise d'œuvre pour la construction de 120 salles de classe écologiques et bioclimatiques à Zinder.",
    sector: SECTOR_SOC,
    numericValue: 850000000,
    completionYear: 2021,
    achievements: [
      'Livrables zéro-défaut énergétiques',
      'Construction de 120 salles bioclimatiques',
      'Réduction de la température intérieure de 5°C'
    ],
    specs: ['Architecture bioclimatique', 'Briques de terre compressée (BTC)'],
    funderCode: "KfW",
    funderType: "BADEA"
  },
  {
    id: "p9",
    name: "Schéma Directeur Maradi",
    desc: "Plan de Développement Urbain de la ville de Maradi horizon 2040",
    client: "Ministère de l'Urbanisme",
    valeur: "120M FCFA",
    image: p9Img,
    details: "Production de documents d'urbanisme complets, incluant zonage, réserves foncières et plans de circulation.",
    sector: SECTOR_RUR, // treating as general development
    numericValue: 120000000,
    completionYear: 2017,
    achievements: [
      'Cartographie SIG complète de la ville',
      'Réservation de 12 zones d\'aménagement concerté (ZAC)',
      'Intégration d\'une rocade logistique'
    ],
    specs: ['Cartographie SIG haute résolution', 'Enquêtes ménages'],
    funderCode: "Gouvernement",
    funderType: "BID" // mapping for styling
  },
  {
    id: "p10",
    name: "Étude d'Impact Mine d'Or",
    desc: "Étude d'Impact Environnemental et Social d'une exploitation aurifère (Téra)",
    client: "Sopamin",
    valeur: "450M FCFA",
    image: p10Img,
    details: "Étude exhaustive des impacts sur les aquifères, la faune locale, et plans de relocalisation des populations (PAR).",
    sector: SECTOR_ENV,
    numericValue: 450000000,
    completionYear: 2023,
    achievements: [
      'Évitement de zones de nidification sensibles',
      'Réimplantation réussie de 3 villages sans conflit',
      'Modélisation 3D de dispersion de poussière'
    ],
    specs: ['Normes SFI', 'Plan d\'Action de Réinstallation (PAR)'],
    funderCode: "SOPAMIN",
    funderType: "BID",
    progress: 85
  },
  {
    id: "p11",
    name: "Barrages Agadez",
    desc: "Conception de barrages collinaires et micro-barrages",
    client: "AFD",
    valeur: "390M FCFA",
    image: p11Img,
    details: "Dans les koris de l'Aïr, modélisation hydrologique pour retenir les crues éclairs et permettre la recharge des nappes.",
    sector: SECTOR_EAU,
    numericValue: 390000000,
    completionYear: 2016,
    achievements: [
      'Rétention de crues évaluées à 2 millions m3/an',
      'Réactivation d\'oasis locales',
      'Construction de 4 barrages de seuil'
    ],
    specs: ['Modélisation HEC-RAS', 'Génie civil d\'urgence'],
    funderCode: "AFD",
    funderType: "FAD"
  },
  {
    id: "p12",
    name: "Route Rurale Kollo",
    desc: "Aménagement d'une route rurale en terre moderne (55km)",
    client: "Fonds d'Entretien Routier",
    valeur: "720M FCFA",
    image: p12Img,
    details: "Contrôle géotechnique continu des purges, remblais et du traitement de surface au sel stabilisant.",
    sector: SECTOR_MIN,
    numericValue: 720000000,
    completionYear: 2018,
    achievements: [
      'Désenclavement de 14 bassins de production agricole',
      'Utilisation innovante de polymères stabilisants',
      'Respect des délais malgré l\'hivernage'
    ],
    specs: ['Essais Proctor', 'Levés topographiques GPS différentiel'],
    funderCode: "FER",
    funderType: "WB"
  }
];

const mockProjects: ProjectRef[] = [...baseProjects];

const ITEMS_PER_PAGE = 10;

const SectorIcon = ({ sector, className }: { sector: string, className?: string }) => {
  switch (sector) {
    case SECTOR_EAU: return <Droplet className={className} />;
    case SECTOR_ENV: return <Leaf className={className} />;
    case SECTOR_RUR: return <Tractor className={className} />;
    case SECTOR_SOC: return <Landmark className={className} />;
    case SECTOR_MIN: return <HardHat className={className} />;
    default: return <Landmark className={className} />;
  }
};

const getDefaultImage = (sector: string) => {
  switch (sector) {
    case SECTOR_EAU: return categoryImages.hydraulique[0];
    case SECTOR_ENV: return categoryImages.environnement[0];
    case SECTOR_RUR: return categoryImages.ruralSig[0];
    case SECTOR_SOC: return categoryImages.sociale[0];
    case SECTOR_MIN: return categoryImages.energie[0];
    default: return categoryImages.ruralSig[0];
  }
};

const getSectorImages = (sector: string) => {
  switch (sector) {
    case SECTOR_EAU: return categoryImages.hydraulique || [];
    case SECTOR_ENV: return categoryImages.environnement || [];
    case SECTOR_RUR: return categoryImages.ruralSig || [];
    case SECTOR_SOC: return categoryImages.sociale || [];
    case SECTOR_MIN: return categoryImages.energie || [];
    default: return [];
  }
};

const ExpandableSection = ({ title, icon: Icon, children, defaultExpanded = false }: { title: string, icon: any, children: React.ReactNode, defaultExpanded?: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  return (
    <div className="mb-6 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="w-full flex items-center justify-between p-5 bg-surface-container-low hover:bg-surface-variant transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <h4 className="font-headline-md text-headline-md text-primary flex items-center gap-3">
          <div className="p-2 bg-surface rounded-lg shadow-sm group-hover:bg-primary/5 transition-colors border border-outline-variant/50">
            <Icon className="w-5 h-5 text-tertiary" /> 
          </div>
          {title}
        </h4>
        <motion.div
           animate={{ rotate: isExpanded ? 180 : 0 }}
           transition={{ duration: 0.2 }}
           className="w-8 h-8 rounded-full bg-surface shadow-sm border border-outline-variant/50 flex items-center justify-center text-outline group-hover:text-primary transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-5 border-t border-outline-variant bg-surface-container-lowest">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Projects() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('category') || 'Tous';

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState(initialFilter);
  const [sort, setSort] = useState('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRef, setSelectedRef] = useState<ProjectRef | null>(null);
  const [highlightedRefId, setHighlightedRefId] = useState<string | null>(null);

  const sectors = ['Tous', SECTOR_EAU, SECTOR_ENV, SECTOR_RUR, SECTOR_SOC, SECTOR_MIN];

  // Update filter if URL changes externally
  React.useEffect(() => {
    const category = searchParams.get('category');
    if (category && sectors.includes(category)) {
      setFilter(category);
    }
  }, [searchParams]);

  const filteredAndSortedRefs = useMemo(() => {
    let result = [...mockProjects];
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) || 
        r.client.toLowerCase().includes(q) || 
        r.desc.toLowerCase().includes(q)
      );
    }
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
  }, [filter, sort, searchQuery]);

  const totalPages = Math.ceil(filteredAndSortedRefs.length / ITEMS_PER_PAGE);
  const currentRefs = filteredAndSortedRefs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Reset page when filter or sort changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter, sort, searchQuery]);

  // Handle Escape key to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedRef(null);
    };
    if (selectedRef) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedRef]);

  // Listen for map selection events
  React.useEffect(() => {
    const handleProjectSelect = (e: Event) => {
      const customEvent = e as CustomEvent;
      const pId = customEvent.detail;
      
      setFilter('Tous');
      setSearchQuery('');
      setSort('date-desc'); // Reset sort to match map order predictably if needed, but 'date-desc' is default
      
      // Need a small timeout to let the filter reset take effect before finding index
      setTimeout(() => {
        // We find the project in the currently sorted/filtered list (which is now reset)
        // Note: we can't cleanly access filteredAndSortedRefs here due to stale closure, 
        // so we recalculate exactly what the default sort does:
        const sortedDefault = [...mockProjects].sort((a, b) => b.completionYear - a.completionYear);
        const index = sortedDefault.findIndex(p => p.id === pId);
        
        if (index !== -1) {
          const targetPage = Math.floor(index / ITEMS_PER_PAGE) + 1;
          setCurrentPage(targetPage);
          setHighlightedRefId(pId);
          
          setTimeout(() => {
              const el = document.getElementById(`project-item-${pId}`);
              if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              } else {
                  const refEl = document.getElementById('references');
                  if (refEl) refEl.scrollIntoView({ behavior: 'smooth' });
              }
              // Remove highlight after a few seconds
              setTimeout(() => setHighlightedRefId(null), 3000);
          }, 100);
        }
      }, 50);
    };
    window.addEventListener('projectSelected', handleProjectSelect);
    return () => window.removeEventListener('projectSelected', handleProjectSelect);
  }, []);

  // Small render helpers
  const FunderBadge = ({ type, code }: { type?: string, code?: string }) => {
    if (!code) return null;
    let Icon = Landmark;
    let style = 'bg-surface-variant text-on-surface-variant border-outline-variant';
    
    switch (type) {
      case 'WB': 
        Icon = Banknote;
        style = 'bg-secondary-container text-on-secondary-container border-secondary-container/50';
        break;
      case 'BID': 
        Icon = Globe;
        style = 'bg-tertiary-container text-on-tertiary-container border-tertiary-container/50';
        break;
      case 'FAD': 
        Icon = ShieldCheck;
        style = 'bg-primary-container text-on-primary-container border-primary-container/50';
        break;
      case 'BADEA':
        Icon = Landmark;
        style = 'bg-surface-variant text-on-surface-variant border-outline-variant';
        break;
    }
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${style}`} title={t("Bailleur de fonds")}>
        <Icon className="w-3.5 h-3.5" /> {code}
      </span>
    );
  };

  return (
    <div className="w-full">
      {/* Filters & Breadcrumb */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center space-x-2 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider mb-3">
            <a href="#accueil" className="cursor-pointer hover:text-primary transition-colors">
              {t('Accueil')}
            </a>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span 
              className="cursor-pointer hover:text-primary transition-colors"
              onClick={() => { setFilter('Tous'); setSort('date-desc'); }}
            >
              {t('Projets')}
            </span>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-secondary font-bold">
              {t(filter)}
            </span>
          </div>
          
          <h2 className="font-headline-lg text-headline-lg text-primary">{t('Liste des Interventions')}</h2>
        </div>
      </div>
      
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="flex flex-col w-full sm:w-64">
            <label className="text-label-sm font-label-sm text-on-surface-variant mb-1 ml-1">{t('Recherche')}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-outline" />
              </div>
              <input
                type="text"
                placeholder={t("Ex: PRRIA, Banque Mondiale...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-9 pr-3 py-2 border border-outline-variant rounded-md text-body-md bg-surface placeholder-outline focus:outline-none focus:border-primary text-on-surface"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-label-sm font-label-sm text-on-surface-variant mb-1 ml-1">{t('Domaine')}</label>
            <select 
              value={filter} 
              onChange={e => setFilter(e.target.value)}
              className="bg-surface border border-outline-variant rounded-md px-4 py-2 text-body-md focus:outline-none focus:border-primary text-on-surface h-[42px]"
            >
              {sectors.map(s => <option key={s} value={s}>{t(s)}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-label-sm font-label-sm text-on-surface-variant mb-1 ml-1">{t('Tri')}</label>
            <select 
              value={sort} 
              onChange={e => setSort(e.target.value)}
              className="bg-surface border border-outline-variant rounded-md px-4 py-2 text-body-md focus:outline-none focus:border-primary text-on-surface h-[42px]"
            >
              <option value="date-desc">{t('Date (Récent)')}</option>
              <option value="date-asc">{t('Date (Ancien)')}</option>
              <option value="val-desc">{t('Valeur (Décroissant)')}</option>
              <option value="val-asc">{t('Valeur (Croissant)')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {currentRefs.map((ref, idx) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={ref.id}
                id={`project-item-${ref.id}`}
                onClick={() => setSelectedRef(ref)}
                className={`rounded-xl border cursor-pointer transition-all duration-300 flex flex-col md:flex-row group overflow-hidden ${
                  highlightedRefId === ref.id 
                    ? 'bg-primary/5 border-primary shadow-lg ring-2 ring-primary/20 scale-[1.02] z-10' 
                    : 'bg-surface border-outline-variant shadow-sm hover:shadow-md'
                }`}
              >
                <div className="w-full md:w-[240px] h-48 md:h-auto flex-shrink-0 relative overflow-hidden bg-surface-container">
                  <img loading="lazy" 
                    src={ref.image || getDefaultImage(ref.sector)} 
                    alt={ref.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />
                </div>
                
                <div className="p-6 flex flex-col gap-4 w-full">
                  <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display-sm text-display-sm text-primary group-hover:text-secondary transition-colors">{t(ref.name)}</h3>
                      <FunderBadge type={ref.funderType} code={ref.funderCode} />
                    </div>
                    <p className="font-label-lg text-on-surface-variant max-w-2xl">{t(ref.desc)}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full text-label-sm font-medium">{ref.completionYear}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 border-t border-outline-variant pt-4">
                  <p className="font-body-md text-on-surface-variant line-clamp-2 md:col-span-1">{t(ref.details)}</p>
                  <div className="flex items-center md:justify-end gap-3 md:col-span-1">
                    <div className="text-sm border border-outline rounded-md px-2.5 py-1 text-on-surface-variant bg-surface-container-lowest flex items-center gap-1.5">
                      <SectorIcon sector={ref.sector} className="w-4 h-4 text-tertiary" />
                      {t(ref.sector)}
                    </div>
                  </div>
                </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {currentRefs.length === 0 && (
            <div className="text-center py-16 bg-surface-container-low rounded-xl border border-outline-variant border-dashed">
              <span className="material-symbols-outlined text-outline text-4xl mb-2 block">sentiment_dissatisfied</span>
              <p className="text-on-surface-variant font-body-lg">{t('Aucun projet trouvé pour cette sélection.')}</p>
            </div>
          )}
        </div>
  
        {/* Pagination component */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-12 bg-surface p-4 rounded-xl border border-outline-variant shadow-sm w-fit mx-auto">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-surface-variant text-primary disabled:text-outline disabled:hover:bg-transparent transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-md font-label-lg transition-colors ${currentPage === i + 1 ? 'bg-primary text-on-primary shadow-sm' : 'hover:bg-surface-variant text-on-surface'}`}
              >
                {i + 1}
              </button>
            ))}
  
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-surface-variant text-primary disabled:text-outline disabled:hover:bg-transparent transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

      {/* Project Modal */}
      <AnimatePresence>
        {selectedRef && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-6" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedRef(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }}
              className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:w-11/12 max-w-4xl bg-surface sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:border sm:border-outline-variant z-10"
            >
              {/* Header fixed */}
              <div className="flex justify-between items-start p-4 sm:p-6 border-b border-outline-variant bg-surface shrink-0 sticky top-0 z-20">
                <div className="pr-12">
                  <h2 id="modal-title" className="font-display-sm sm:font-display-lg text-2xl sm:text-display-lg text-primary mb-1">{t(selectedRef.name)}</h2>
                  <p className="font-headline-sm sm:text-headline-sm text-sm text-on-surface-variant line-clamp-2 sm:line-clamp-none">{t(selectedRef.desc)}</p>
                </div>
                <button 
                  onClick={() => setSelectedRef(null)}
                  aria-label={t("Fermer le modal")}
                  className="w-10 h-10 shrink-0 bg-surface-container hover:bg-surface-variant rounded-full flex items-center justify-center text-on-surface-variant transition-colors absolute top-4 sm:top-6 right-4 sm:right-6"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 md:p-8 overflow-y-auto w-full no-scrollbar">
                
                {/* Meta details banner */}
                <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-5 mb-8 flex flex-wrap gap-x-12 gap-y-4">
                  <div>
                    <span className="block text-label-sm font-label-sm text-outline uppercase tracking-wider mb-1">{t("Maitre d'ouvrage")}</span>
                    <span className="font-body-lg text-primary">{t(selectedRef.client)}</span>
                  </div>
                  <div>
                    <span className="block text-label-sm font-label-sm text-outline uppercase tracking-wider mb-1">{t('Financement')}</span>
                    <span className="font-body-lg text-primary">{selectedRef.valeur} ({selectedRef.funderCode})</span>
                  </div>
                  <div>
                    <span className="block text-label-sm font-label-sm text-outline uppercase tracking-wider mb-1">{t('Période')}</span>
                    <span className="font-body-lg text-primary">{selectedRef.completionYear}</span>
                  </div>
                  <div>
                    <span className="block text-label-sm font-label-sm text-outline uppercase tracking-wider mb-1">{t('Domaine')}</span>
                    <span className="font-body-lg text-primary flex items-center gap-2">
                       <SectorIcon sector={selectedRef.sector} className="w-5 h-5 text-tertiary" />
                       {t(selectedRef.sector)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-label-lg text-on-surface-variant font-medium">{t("État d'avancement")}</span>
                    <span className="font-label-lg text-primary font-bold">{selectedRef.progress || 100}%</span>
                  </div>
                  <div className="w-full bg-surface-container-low rounded-full h-2.5 border border-outline-variant overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedRef.progress || 100}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                      className="bg-primary h-2.5 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="font-headline-md text-headline-md text-primary mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-tertiary" /> 
                    {t('Contexte & Synthèse')}
                  </h4>
                  <p className="font-body-lg text-on-surface-variant leading-relaxed">
                    {t(selectedRef.details)}
                  </p>
                </div>
                
                {/* Key Achievements Expandable Section */}
                {selectedRef.achievements && selectedRef.achievements.length > 0 && (
                  <ExpandableSection title={t("Réalisations Clés")} icon={ShieldCheck} defaultExpanded={true}>
                    <div className="overflow-x-auto rounded-lg border border-outline-variant">
                      <table className="w-full text-left font-body-md">
                        <thead className="bg-surface-container-low border-b border-outline-variant">
                          <tr>
                            <th className="px-5 py-3 font-label-lg text-primary tracking-wide">ID</th>
                            <th className="px-5 py-3 font-label-lg text-primary tracking-wide">{t("Description de l'Objectif Atteint")}</th>
                            <th className="px-5 py-3 font-label-lg text-primary tracking-wide text-center">{t('Statut')}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant bg-surface-container-lowest">
                          {selectedRef.achievements.map((item, index) => (
                            <motion.tr 
                              key={index} 
                              whileHover={{ x: 6, backgroundColor: 'rgba(0,0,0,0.02)' }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                              className="transition-colors group cursor-default"
                            >
                              <td className="px-5 py-4 font-mono text-xs text-outline">{String(index + 1).padStart(2, '0')}</td>
                              <td className="px-5 py-4 text-on-surface">{t(item)}</td>
                              <td className="px-5 py-4 text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                                  {t('Validé')}
                                </span>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ExpandableSection>
                )}

                {/* Specifics Expandable Section */}
                {selectedRef.specs && selectedRef.specs.length > 0 && (
                  <ExpandableSection title={t("Spécifications Techniques")} icon={ShieldCheck} defaultExpanded={false}>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedRef.specs.map((item, i) => (
                          <motion.li 
                            key={i} 
                            whileHover={{ scale: 1.02, x: 4 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="flex items-start font-body-md text-on-surface-variant bg-surface p-4 rounded-xl border border-outline-variant hover:shadow-md cursor-default transition-all"
                          >
                            <div className="shrink-0 w-2 h-2 rounded-full bg-secondary mt-2 mr-3" />
                            <span className="leading-snug">{t(item)}</span>
                          </motion.li>
                        ))}
                    </ul>
                  </ExpandableSection>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
