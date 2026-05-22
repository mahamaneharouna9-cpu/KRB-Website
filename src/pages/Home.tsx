import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Droplets, Building2, Leaf, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import InteractiveMap from '../components/InteractiveMap';
import InteractiveImageCard from '../components/InteractiveImageCard';
import { categoryImages, getImages } from '../lib/images';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import homeImgHydraulique from '../assets/images/regenerated_image_1779410559171.jpg';
import homeImgEnvironnement from '../assets/images/regenerated_image_1779410561123.jpg';
import homeImgUrbain from '../assets/images/regenerated_image_1779410566808.jpg';
import homeImgHumaine from '../assets/images/regenerated_image_1779410572490.jpg';
import homeImgMines from '../assets/images/regenerated_image_1779410605366.jpg';

const homeImgs = getImages(15, true); // fallback images

const timelineData = [
  {
    year: "1996",
    title: "Fondation et Immédiateté Stratégique",
    description: "Création du cabinet au Niger. Premières interventions immédiates sur des projets de pointe : études d'impact hydrogéologique pour le projet aurifère de Koma Bangou (ETRUSCAN) et aménagements agricoles dans la Vallée d'El Méki."
  },
  {
    year: "1998-1999",
    title: "Institutionnalisation Environnementale",
    description: "KRB se positionne comme un référent national, élaborant le Programme National de Lutte contre la Désertification (PAN-LCD) et la synthèse du Plan National de l'Environnement (PNEDD) appuyé par le PNUD."
  },
  {
    year: "2002-2006",
    title: "Ingénierie des Infrastructures de Base",
    description: "Maîtrise d'œuvre déléguée sur les grandes infrastructures socio-communautaires au Niger (hydraulique, santé, éducation) et démarrage des études complexes de réhabilitation de l'Abattoir Frigorifique de Niamey."
  },
  {
    year: "2007-2013",
    title: "Les Grands Projets Transfrontaliers",
    description: "Pilotage technique, contrôle et suivi-évaluation du gigantesque Projet de Développement de l'Élevage dans le Liptako Gourma (PDERLG). Consolidation de l'expertise pastorale en Afrique de l'Ouest."
  },
  {
    year: "2011-2012",
    title: "Rayonnement Panafricain (UEMOA)",
    description: "Attribution de l'étude d'harmonisation de l'Hydraulique Villageoise de l'UEMOA couvrant 8 pays (Bénin, Burkina, Côte d'Ivoire, Guinée Bissau, Mali, Niger, Sénégal, Togo). Déploiement de la succursale SN-ERFAC à Ouagadougou."
  },
  {
    year: "2018-2023",
    title: "Résilience Climatique (PRESIBALT & PRRIA)",
    description: "Surveillance et contrôle des travaux du Programme de Réhabilitation du Bassin du lac Tchad (PRESIBALT) et du Projet de Renforcement de la Résilience afin de lutter contre l'Insécurité Alimentaire (PRRIA) au Niger, financés par la BID et le FAD."
  },
  {
    year: "2021-Présent",
    title: "Haute Technicité & Adaptation Climatique",
    description: "Déploiement d'ingénierie avancée (Kits agricoles modulaires PARCA, PRAPS II, réseaux d'assainissement complexes). Partenaires de choix pour la Banque Mondiale, BID, BADEA et FAD dans des contextes à forts défis sanitaires et climatiques.",
    isLast: true
  }
];

const TimelineItem = ({ year, title, description, isLast }: any) => {
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0.5, y: 20 }}
      whileInView={{ opacity: isActive ? 1 : 0.5, y: 0, scale: isActive ? 1.02 : 1, x: isActive ? 5 : 0 }}
      viewport={{ margin: "-40% 0px -40% 0px", amount: 0.1 }}
      onViewportEnter={() => setIsActive(true)}
      onViewportLeave={() => setIsActive(false)}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col md:flex-row gap-gutter md:pl-16 group"
    >
      <div className={`absolute left-6 top-1.5 w-3 h-3 rounded-full transform -translate-x-[5px] hidden md:block border-2 border-white transition-all duration-500 z-10 ${isActive ? 'bg-primary scale-[2] shadow-sm' : 'bg-surface-variant'}`} />
      
      <div className="md:w-32 flex-shrink-0 pt-1">
        <span className={`font-headline-md text-headline-md transition-colors duration-500 ${isActive ? 'text-primary' : 'text-secondary'}`}>
          {t(year)}
        </span>
      </div>
      
      <div className={`bg-white p-margin border w-full rounded-sm transition-all duration-500 ${isActive ? 'shadow-md border-primary/30' : 'border-outline-variant'} ${isLast && isActive ? 'border-l-4 border-l-secondary' : ''} ${isLast && !isActive ? 'border-l-4 border-l-transparent' : ''}`}>
        <h4 className={`font-headline-md text-headline-md mb-stack-sm transition-colors duration-500 ${isActive ? 'text-primary' : 'text-on-surface'}`}>{t(title)}</h4>
        <p className={`font-body-md text-body-md transition-colors duration-500 ${isActive ? 'text-on-surface-variant' : 'text-on-surface-variant/80'}`}>{t(description)}</p>
      </div>
    </motion.div>
  );
};


const sectorsData = [
  {
    id: 'hydraulique',
    title: "Ingénierie de l'Eau & Hydraulique",
    image: homeImgHydraulique,
    className: 'md:col-span-2'
  },
  {
    id: 'environnement',
    title: "Maîtrise Environnementale",
    image: homeImgEnvironnement,
    className: 'md:col-span-3'
  },
  {
    id: 'urbain',
    title: "Développement Rural & Urbain",
    image: homeImgUrbain,
    className: 'md:col-span-2'
  },
  {
    id: 'humaine',
    title: "Ingénierie Sociale",
    image: homeImgHumaine,
    className: 'md:col-span-2'
  },
  {
    id: 'mines',
    title: "Mines et Energie",
    image: homeImgMines,
    className: 'md:col-span-1'
  }
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Map Section */}
      <section className="relative w-full h-[85vh] min-h-[500px] bg-white overflow-hidden">
        <InteractiveMap wrapperClass="absolute inset-0 w-full h-full bg-white" />
      </section>

      {/* Intro Section */}
      <section className="relative bg-surface-container-low py-24 md:py-40 border-t border-outline-variant overflow-hidden z-20 shadow-[-0_10px_40px_rgba(0,0,0,0.05)]">
        <img loading="lazy" 
          alt="Ingénierie de Développement Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply" 
          src="https://storage.googleapis.com/krbengineering/AUTRES/AUTRES/IMG_20180914_123128.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-surface-container-low/70 to-background/90 z-0"></div>
        <div className="max-w-container-max mx-auto px-gutter relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-white text-primary font-label-sm text-sm rounded-full uppercase tracking-widest border border-outline-variant shadow-sm">
              {t('KRB Ingénieurs Conseils')}
            </span>
            <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-primary font-bold tracking-tight leading-tight">
              {t('Ingénierie de Développement pour les Environnements Arides et Semi-Arides.')}
            </h1>
            <p className="font-body-lg text-lg md:text-xl text-on-surface-variant max-w-3xl leading-relaxed">
              {t("Depuis 1996, KRB Ingénieurs Conseils déploie une expertise technique de pointe pour le développement durable, la gestion de l'eau et l'aménagement du territoire en Afrique de l'Ouest.")}
            </p>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto justify-center gap-4 pt-6">
              <a href="#services" className="bg-primary text-on-primary px-8 py-4 w-full sm:w-auto flex justify-center rounded-lg font-label-lg hover:bg-secondary transition-all shadow-[0_8px_20px_rgba(0,65,107,0.25)] items-center gap-2">
                <span>{t('Consulter notre Expertise')}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link to="/projets" className="bg-white text-primary border border-outline px-8 py-4 w-full sm:w-auto flex justify-center rounded-lg font-label-lg hover:bg-surface-variant transition-all hover:shadow-sm items-center gap-2">
                <span>{t('Explorer les Réalisations')}</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="bg-primary text-on-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 hidden lg:block">
          <img loading="lazy" src={homeImgs[6]} alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Mission Statement */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <h2 className="font-headline-lg text-headline-lg mb-6 text-secondary">{t('Notre Mission')}</h2>
              <p className="font-body-lg text-body-lg text-on-primary/90 leading-relaxed mb-8">
                {t("Aider les actions de développement en proposant des services d'ingénierie efficaces à des prix bien étudiés. Notre engagement premier est d'améliorer la carte du consultant privé en Afrique et de contribuer activement à la gestion durable de l'environnement, des ressources naturelles et au développement urbain et rural.")}
              </p>
              <div className="h-1 w-24 bg-secondary"></div>
            </motion.div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-primary-container/10 p-6 rounded-lg border border-primary-container/20"
              >
                <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">star</span>
                <h3 className="font-headline-sm text-headline-sm mb-3">{t('Expertise Pointue')}</h3>
                <p className="font-body-md text-body-md text-on-primary/80">{t('Des décennies de maîtrise pluridisciplinaire en sciences de la terre, génie civil et environnement.')}</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-primary-container/10 p-6 rounded-lg border border-primary-container/20"
              >
                <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">verified_user</span>
                <h3 className="font-headline-sm text-headline-sm mb-3">{t('Indépendance')}</h3>
                <p className="font-body-md text-body-md text-on-primary/80">{t("Une garantie d'objectivité et de rigueur absolue dans nos études, conseils et supervisions de chantiers.")}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-primary-container/10 p-6 rounded-lg border border-primary-container/20"
              >
                <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">eco</span>
                <h3 className="font-headline-sm text-headline-sm mb-3">{t('Durabilité')}</h3>
                <p className="font-body-md text-body-md text-on-primary/80">{t('Intégrer systématiquement la résilience climatique et la protection sociale au cœur de chaque aménagement.')}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-primary-container/10 p-6 rounded-lg border border-primary-container/20"
              >
                <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">handshake</span>
                <h3 className="font-headline-sm text-headline-sm mb-3">{t('Intermédiation')}</h3>
                <p className="font-body-md text-body-md text-on-primary/80">{t("Ancrage local fort, assurant l'appropriation des projets par les communautés rurales à travers l'ingénierie sociale.")}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects / Sectors Snippet */}
      <section className="py-24 bg-surface md:py-32">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <h2 className="font-display-lg text-4xl md:text-5xl text-primary font-bold mb-4">{t('Nos Projets')}</h2>
              <p className="font-body-lg text-xl text-on-surface-variant max-w-2xl">
                {t("Nos 5 pôles d'excellence structurent des solutions d'ingénierie intégrées sur le continent africain.")}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            >
              <Link to="/projets" className="inline-flex items-center gap-2 font-label-lg text-primary hover:text-secondary group">
                <span className="border-b border-primary group-hover:border-secondary transition-colors pb-0.5">{t('Voir la galerie des projets')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 auto-rows-[300px]">
            {sectorsData.map((sector, idx) => (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`${sector.className} relative rounded-lg overflow-hidden group cursor-pointer`}
              >
                <Link to={`/projets?category=${encodeURIComponent(sector.title)}`} className="block w-full h-full">
                  <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <img loading="lazy" 
                      src={sector.image} 
                      alt={sector.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:bg-black/25 transition-colors duration-500 sm:group-hover:bg-black/60" />

                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end translate-y-0 opacity-100 sm:translate-y-8 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500 ease-out">
                    <h3 className="font-headline-md text-white text-2xl font-bold leading-tight">
                      {t(sector.title)}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Timeline Section */}

      <section id="historique" className="w-full bg-surface-container-low border-y border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-section-padding">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
              className="col-span-1 md:col-span-4"
            >
              <div className="md:sticky top-28 flex flex-col justify-start">
                <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-md">{t('Chronologie Historique')}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                  {t("L'évolution d'une entreprise ancrée dans les réalités du terrain et tournée vers l'innovation durable.")}
                </p>
                <div className="rounded-lg overflow-hidden shadow-lg border border-outline-variant hidden md:block">
                  <img loading="lazy" src="https://storage.googleapis.com/krbengineering/AUTRES/AUTRES/krb%20028.jpg" alt="Ingénierie sur le terrain" className="w-full h-64 object-cover" />
                </div>
              </div>
            </motion.div>
            <div className="col-span-1 md:col-span-8 relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-outline-variant hidden md:block"></div>
              <div className="flex flex-col gap-stack-lg py-[50vh]">
                {timelineData.map((item, index) => (
                  <TimelineItem key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi KRB Section (Inspired by Sajdi Interactive Cards) */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
            className="mb-16 flex justify-center"
          >
            <h2 className="font-display-lg text-4xl md:text-5xl text-primary uppercase font-bold tracking-wider text-center relative pb-4 inline-block">
              {t('Pourquoi KRB')}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-secondary rounded-full"></span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InteractiveImageCard 
              title={t("Notre Mission")}
              description={t("Nous déployons une expertise technique de pointe pour assurer le développement durable, la gestion optimisée des ressources en eau et l'aménagement équilibré du territoire.")}
              imageUrl="https://storage.googleapis.com/krbengineering/AUTRES/AUTRES/DSC02401.JPG"
              delay={0.1}
            />

            <InteractiveImageCard 
              title={t("Notre Stratégie")}
              description={t("Notre reconnaissance s'appuie sur une intégrité éprouvée et une rigueur technique absolue, faisant de nous une autorité respectée dans l'ingénierie régionale depuis plus de trente ans.")}
              imageUrl="https://storage.googleapis.com/krbengineering/AUTRES/AUTRES/Notre%20stratgeie.jpg"
              delay={0.2}
            />

            <InteractiveImageCard 
              title={t("Nos Promesses")}
              description={t("Nous concevons et déployons des infrastructures innovantes et résilientes, capables de structurer les territoires et de sécuriser l'accès aux ressources vitales.")}
              imageUrl="https://storage.googleapis.com/krbengineering/AUTRES/AUTRES/IMG-20190410-WA0078.jpg"
              delay={0.3}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
