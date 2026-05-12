import React from 'react';
import { motion } from 'motion/react';
import { cleanImages, getImages } from '../lib/images';

export default function About() {
  const bgImg = cleanImages[7] || getImages(5, true)[4];
  return (
    <div className="w-full flex-grow">
      {/* Hero Section with Banner */}
      <header className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center bg-surface-container-low overflow-hidden">
        <img 
          alt="Siège KRB ou équipe sur le terrain" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply grayscale" 
          src={bgImg}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="relative z-20 text-center max-w-4xl mx-auto px-4"
        >
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4 block" aria-hidden="true">À Propos de Nous</span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display-xl text-display-xl text-primary mb-6"
          >
            L'Expertise Éprouvée
          </motion.h1>
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto italic mb-4"
          >
            "Un cabinet d'études nigérien indépendant, fondé par des spécialistes des sciences de la terre cumulant des décennies d'expérience pour le développement durable en Afrique de l'Ouest."
          </motion.blockquote>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="font-label-sm text-label-sm text-primary uppercase font-bold"
          >
            — Direction Générale, KRB Ingénieurs Conseils
          </motion.p>
        </motion.div>
      </header>

      {/* Pillars Bento Grid Section */}
      <section className="max-w-[1280px] mx-auto px-margin py-section-padding">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-12 mb-stack-lg"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary">Autorité & Infrastructure</h2>
          </motion.div>
          {/* Pillar 1 */}
          <motion.a 
            href="#historique"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 md:col-span-4 bg-white border border-outline-variant p-margin hover:shadow-md transition-shadow group block"
          >
            <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center rounded-sm mb-stack-md border border-outline-variant group-hover:bg-primary-fixed transition-colors">
              <span className="material-symbols-outlined text-primary text-2xl">architecture</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm flex items-center justify-between">
              L'Expertise Éprouvée
              <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">arrow_forward</span>
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Un cabinet d'études nigérien indépendant créé en 1996, fondé par des spécialistes des sciences de la terre cumulant des décennies d'expérience. Nous offrons des services efficaces à des prix bien étudiés, améliorant la carte du consultant privé en Afrique.
            </p>
          </motion.a>
          {/* Pillar 2 */}
          <motion.a 
            href="#infrastructure"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 md:col-span-4 bg-white border border-outline-variant p-margin hover:shadow-md transition-shadow group block"
          >
            <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center rounded-sm mb-stack-md border border-outline-variant group-hover:bg-primary-fixed transition-colors">
              <span className="material-symbols-outlined text-primary text-2xl">business</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm flex items-center justify-between">
              Infrastructure Opérationnelle
              <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">arrow_forward</span>
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Nos opérations sont pilotées depuis notre siège de 1000 m² au cœur du quartier Terminus de Niamey (68 Rue N.B.95), regroupant une direction technique, un pool de consultants, des salles de réunion et des équipements de pointe.
            </p>
          </motion.a>
          {/* Pillar 3 */}
          <motion.a 
            href="#services"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 md:col-span-4 bg-primary text-on-primary p-margin border border-primary hover:bg-primary/90 transition-colors group block"
          >
            <div className="w-12 h-12 bg-tertiary flex items-center justify-center rounded-sm mb-stack-md border border-outline group-hover:bg-secondary transition-colors">
              <span className="material-symbols-outlined text-on-primary text-2xl">public</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-primary mb-stack-sm flex items-center justify-between">
              Rayonnement Régional
              <span className="material-symbols-outlined text-tertiary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">arrow_forward</span>
            </h3>
            <p className="font-body-md text-body-md text-on-primary/80">
              Présence consolidée avec notre bureau de représentation (SN-ERFAC) à Ouaga 2000 (Burkina Faso), garantissant une réactivité optimale sur les projets transfrontaliers. Une force d'intervention couvrant le Niger, Mali, Sénégal, Bénin et au-delà.
            </p>
          </motion.a>
        </div>
      </section>

      {/* Values / Achievements Section */}
      <section id="infrastructure" className="max-w-[1280px] mx-auto px-margin py-section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
            className="flex flex-col gap-stack-lg"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary">Force et Compétences</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
              Pour mener à bien les mandats qui lui sont confiés, KRB Ingénieurs Conseils compte sur un personnel professionnel hautement qualifié et pluridisciplinaire.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface">Spécialistes en Environnement et Agronomie.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface">Ingénieurs en Génie Civil, Rural et Hydrauliciens.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface">Experts Topographes, Géotechniciens et Hydrogéologues.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface">Spécialistes en Sociologie, Suivi-évaluation et Foncier Rural.</span>
              </li>
            </ul>
          </motion.div>
          {/* High density data table representation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface border border-outline-variant rounded-sm overflow-hidden mt-stack-lg md:mt-0"
          >
            <div className="bg-primary px-margin py-stack-md">
              <h3 className="font-label-sm text-label-sm text-on-primary font-bold uppercase tracking-wider">Gouvernance et Siège</h3>
            </div>
            <div className="p-margin">
              <table className="w-full text-left font-body-md text-body-md">
                <tbody>
                  <tr className="border-b border-outline-variant bg-surface-container-lowest">
                    <td className="py-3 px-4 font-semibold text-primary">Superficie du Quartier Général</td>
                    <td className="py-3 px-4 text-right">1000 m² (Niamey)</td>
                  </tr>
                  <tr className="border-b border-outline-variant bg-surface-container-low">
                    <td className="py-3 px-4 font-semibold text-primary">Année de Création</td>
                    <td className="py-3 px-4 text-right">1996</td>
                  </tr>
                  <tr className="border-b border-outline-variant bg-surface-container-lowest">
                    <td className="py-3 px-4 font-semibold text-primary">Organes de Gouvernance</td>
                    <td className="py-3 px-4 text-right">Direction Générale, Technique, Administrative</td>
                  </tr>
                  <tr className="bg-surface-container-low">
                    <td className="py-3 px-4 font-semibold text-primary">Portée Géographique</td>
                    <td className="py-3 px-4 text-right">Afrique de l'Ouest</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials & Partners Section */}
      <section className="bg-surface border-t border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-margin py-section-padding">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">La Confiance de nos Partenaires</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Notre engagement en faveur de la qualité nous a permis de tisser des liens solides avec de nombreuses institutions internationales, ministères et partenaires bilatéraux. 
            </p>
          </motion.div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-surface-container p-8 rounded-2xl relative"
            >
              <div className="text-secondary mb-4 absolute -top-4 -left-2 text-6xl opacity-20">"</div>
              <p className="font-body-md text-body-md text-on-surface z-10 relative italic mb-6">
                « L'expertise de KRB a été déterminante dans la réalisation des études d'impact du projet PRESIBALT. Leur parfaite connaissance du terrain et de la réglementation a garanti l'acceptabilité sociale et technique du projet. »
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">PT</div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary">Partenaire Technique</h4>
                  <p className="text-sm text-on-surface-variant">Bassin du Lac Tchad</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-surface-container p-8 rounded-2xl relative"
            >
              <div className="text-secondary mb-4 absolute -top-4 -left-2 text-6xl opacity-20">"</div>
              <p className="font-body-md text-body-md text-on-surface z-10 relative italic mb-6">
                « Un partenaire fiable et rigoureux sur lequel nous pouvons compter pour nos projets d'infrastructures d'envergure, comme les grands aménagements hydro-agricoles ou la gestion des ressources en eau. »
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold">DR</div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary">Directeur de Projet</h4>
                  <p className="text-sm text-on-surface-variant">Institutions Internationales</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-surface-container p-8 rounded-2xl relative"
            >
              <div className="text-secondary mb-4 absolute -top-4 -left-2 text-6xl opacity-20">"</div>
              <p className="font-body-md text-body-md text-on-surface z-10 relative italic mb-6">
                « La force de KRB réside dans leur capacité à allier une expertise technique pointue en ingénierie à une réelle approche d'intermédiation sociale, essentielle pour la réussite durable des projets de développement rural. »
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tertiary/20 rounded-full flex items-center justify-center text-tertiary font-bold">RC</div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary">Responsable de Composante</h4>
                  <p className="text-sm text-on-surface-variant">Développement Rural</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Partner Logos */}
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="border-t border-outline-variant pt-12"
          >
            <p className="text-center font-headline-sm text-headline-sm text-primary mb-12">Nos Partenaires</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 hover:opacity-100 transition-all duration-500">
               {/* World Bank */}
               <div className="flex items-center justify-center gap-3 group grayscale hover:grayscale-0 transition-all duration-300">
                 <svg className="w-10 h-10 text-[#002244]" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <rect width="40" height="40" fill="currentColor"/>
                   <circle cx="20" cy="20" r="12" fill="white"/>
                   <path d="M8 20 Q20 8 32 20 Q20 32 8 20" stroke="currentColor" strokeWidth="2"/>
                   <path d="M20 8 Q32 20 20 32 Q8 20 20 8" stroke="currentColor" strokeWidth="2"/>
                 </svg>
                 <div className="flex flex-col text-left">
                   <span className="text-[#002244] font-serif font-bold text-[22px] leading-none">THE WORLD BANK</span>
                   <span className="text-[#002244] text-[8px] tracking-[0.2em] mt-1 font-semibold">IBRD • IDA | WORLD BANK GROUP</span>
                 </div>
               </div>

               {/* IsDB */}
               <div className="flex items-center justify-center gap-3 group grayscale hover:grayscale-0 transition-all duration-300">
                 <svg className="w-12 h-12 text-[#00605A]" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                   <path d="M24 4L4 40h40L24 4zm0 10l12 22H12L24 14z" />
                 </svg>
                 <div className="flex flex-col text-left">
                   <span className="text-[#00605A] font-bold text-[26px] leading-none tracking-tight">IsDB</span>
                   <span className="text-[#00605A] text-[9px] tracking-[0.1em] mt-1 font-semibold">Islamic Development Bank</span>
                 </div>
               </div>

               {/* AfDB */}
               <div className="flex items-center justify-center gap-3 group grayscale hover:grayscale-0 transition-all duration-300">
                 <div className="flex flex-col w-6 gap-[2px]">
                   <div className="h-1.5 w-full bg-[#E51A2E]"></div>
                   <div className="h-1.5 w-full bg-[#00923F]"></div>
                   <div className="h-1.5 w-full bg-[#00519E]"></div>
                 </div>
                 <div className="flex flex-col border-l-[1.5px] border-slate-300 pl-3 text-left">
                   <span className="text-[#00519E] font-bold text-[16px] leading-[1.1] font-serif">AFRICAN<br/>DEVELOPMENT<br/>BANK GROUP</span>
                 </div>
               </div>

               {/* BADEA */}
               <div className="flex items-center justify-center gap-3 group grayscale hover:grayscale-0 transition-all duration-300">
                 <div className="w-10 h-10 bg-[#007A3E] rounded-full flex items-center justify-center text-white">
                   <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                     <path d="M12 6v12M6 12h12" opacity="0.5"/>
                   </svg>
                 </div>
                 <span className="text-[#007A3E] font-bold text-[28px] font-serif tracking-wider">BADEA</span>
               </div>

               {/* CBLT */}
               <div className="flex items-center justify-center gap-3 group grayscale hover:grayscale-0 transition-all duration-300">
                 <div className="w-10 h-10 rounded-full border-4 border-[#00923F] flex items-center justify-center overflow-hidden">
                   <div className="w-full h-1/2 bg-[#00519E] transform translate-y-1/2"></div>
                   <div className="w-full h-1/2 bg-[#E51A2E] transform -translate-y-1/2 opacity-20"></div>
                 </div>
                 <div className="flex flex-col text-left">
                   <span className="text-[#00519E] font-bold text-[24px] leading-none">CBLT</span>
                   <span className="text-[#00923F] text-[9px] tracking-[0.15em] mt-1 font-bold">COMMISSION DU BASSIN<br/>DU LAC TCHAD</span>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
