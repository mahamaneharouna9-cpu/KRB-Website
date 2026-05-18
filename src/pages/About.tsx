import React from 'react';
import { motion } from 'motion/react';
import { cleanImages, getImages } from '../lib/images';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const bgImg = cleanImages[7] || getImages(5, true)[4];
  return (
    <div className="w-full flex-grow">
      {/* Hero Section with Banner */}
      <header className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center bg-surface-container-low overflow-hidden">
        <img loading="lazy" 
          alt="Siège KRB ou équipe sur le terrain" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply grayscale" 
          src={bgImg}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="relative z-20 text-center max-w-4xl mx-auto px-4"
        >
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4 block" aria-hidden="true">{t('À Propos de Nous')}</span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display-xl text-display-xl text-primary mb-6"
          >
            {t("L'Expertise Éprouvée")}
          </motion.h1>
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto italic mb-4"
          >
            {t(`"Un cabinet d'études nigérien indépendant, fondé par des spécialistes des sciences de la terre cumulant des décennies d'expérience pour le développement durable en Afrique de l'Ouest."`)}
          </motion.blockquote>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
            className="font-label-sm text-label-sm text-primary uppercase font-bold"
          >
            {t("— Direction Générale, KRB Ingénieurs Conseils")}
          </motion.p>
        </motion.div>
      </header>

      {/* Pillars Bento Grid Section */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-section-padding">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-12 mb-stack-lg"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary">{t("Autorité & Infrastructure")}</h2>
          </motion.div>
          {/* Pillar 1 */}
          <motion.a 
            href="#historique"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 md:col-span-4 bg-white border border-outline-variant p-4 md:p-8 hover:shadow-md transition-shadow group block"
          >
            <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center rounded-sm mb-stack-md border border-outline-variant group-hover:bg-primary-fixed transition-colors">
              <span className="material-symbols-outlined text-primary text-2xl">architecture</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm flex items-center justify-between">
              {t("L'Expertise Éprouvée")}
              <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">arrow_forward</span>
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {t("Un cabinet d'études nigérien indépendant créé en 1996, fondé par des spécialistes des sciences de la terre cumulant des décennies d'expérience. Nous offrons des services efficaces à des prix bien étudiés, améliorant la carte du consultant privé en Afrique.")}
            </p>
          </motion.a>
          {/* Pillar 2 */}
          <motion.a 
            href="#infrastructure"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 md:col-span-4 bg-white border border-outline-variant p-4 md:p-8 hover:shadow-md transition-shadow group block"
          >
            <div className="w-12 h-12 bg-surface-container-low flex items-center justify-center rounded-sm mb-stack-md border border-outline-variant group-hover:bg-primary-fixed transition-colors">
              <span className="material-symbols-outlined text-primary text-2xl">business</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-stack-sm flex items-center justify-between">
              {t("Infrastructure Opérationnelle")}
              <span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">arrow_forward</span>
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {t("Nos opérations sont pilotées depuis notre siège de 1000 m² au cœur du quartier Terminus de Niamey (68 Rue N.B.95), regroupant une direction technique, un pool de consultants, des salles de réunion et des équipements de pointe.")}
            </p>
          </motion.a>
          {/* Pillar 3 */}
          <motion.a 
            href="#services"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 md:col-span-4 bg-primary text-on-primary p-4 md:p-8 border border-primary hover:bg-primary/90 transition-colors group block"
          >
            <div className="w-12 h-12 bg-tertiary flex items-center justify-center rounded-sm mb-stack-md border border-outline group-hover:bg-secondary transition-colors">
              <span className="material-symbols-outlined text-on-primary text-2xl">public</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-primary mb-stack-sm flex items-center justify-between">
              {t("Rayonnement Régional")}
              <span className="material-symbols-outlined text-tertiary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">arrow_forward</span>
            </h3>
            <p className="font-body-md text-body-md text-on-primary/80">
              {t("Présence consolidée avec notre bureau de représentation (SN-ERFAC) à Ouaga 2000 (Burkina Faso), garantissant une réactivité optimale sur les projets transfrontaliers. Une force d'intervention couvrant le Niger, Mali, Sénégal, Bénin et au-delà.")}
            </p>
          </motion.a>
        </div>
      </section>

      {/* Values / Achievements Section */}
      <section id="infrastructure" className="max-w-[1280px] mx-auto px-4 md:px-8 py-section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
            className="flex flex-col gap-stack-lg"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary">{t("Force et Compétences")}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
              {t("Pour mener à bien les mandats qui lui sont confiés, KRB Ingénieurs Conseils compte sur un personnel professionnel hautement qualifié et pluridisciplinaire.")}
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface">{t("Spécialistes en Environnement et Agronomie.")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface">{t("Ingénieurs en Génie Civil, Rural et Hydrauliciens.")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface">{t("Experts Topographes, Géotechniciens et Hydrogéologues.")}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <span className="font-body-md text-body-md text-on-surface">{t("Spécialistes en Sociologie, Suivi-évaluation et Foncier Rural.")}</span>
              </li>
            </ul>
          </motion.div>
          {/* High density data table representation */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface border border-outline-variant rounded-sm overflow-hidden mt-stack-lg md:mt-0"
          >
            <div className="bg-primary px-4 md:px-8 py-stack-md">
              <h3 className="font-label-sm text-label-sm text-on-primary font-bold uppercase tracking-wider">{t("Gouvernance et Siège")}</h3>
            </div>
            <div className="p-4 md:p-8 overflow-x-auto">
              <table className="w-full text-left font-body-md text-body-md min-w-[400px]">
                <tbody>
                  <tr className="border-b border-outline-variant bg-surface-container-lowest">
                    <td className="py-3 px-4 font-semibold text-primary">{t("Superficie du Quartier Général")}</td>
                    <td className="py-3 px-4 text-right">{t("1000 m² (Niamey)")}</td>
                  </tr>
                  <tr className="border-b border-outline-variant bg-surface-container-low">
                    <td className="py-3 px-4 font-semibold text-primary">{t("Année de Création")}</td>
                    <td className="py-3 px-4 text-right">1996</td>
                  </tr>
                  <tr className="border-b border-outline-variant bg-surface-container-lowest">
                    <td className="py-3 px-4 font-semibold text-primary">{t("Organes de Gouvernance")}</td>
                    <td className="py-3 px-4 text-right">{t("Direction Générale, Technique, Administrative")}</td>
                  </tr>
                  <tr className="bg-surface-container-low">
                    <td className="py-3 px-4 font-semibold text-primary">{t("Portée Géographique")}</td>
                    <td className="py-3 px-4 text-right">{t("Afrique de l'Ouest")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials & Partners Section */}
      <section className="bg-surface border-t border-outline-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-section-padding">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{t("La Confiance de nos Partenaires")}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              {t("Notre engagement en faveur de la qualité nous a permis de tisser des liens solides avec de nombreuses institutions internationales, ministères et partenaires bilatéraux.")} 
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
                {t("« L'expertise de KRB a été déterminante dans la réalisation des études d'impact du projet PRESIBALT. Leur parfaite connaissance du terrain et de la réglementation a garanti l'acceptabilité sociale et technique du projet. »")}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">PT</div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary">{t("Partenaire Technique")}</h4>
                  <p className="text-sm text-on-surface-variant">{t("Bassin du Lac Tchad")}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-surface-container p-8 rounded-2xl relative"
            >
              <div className="text-secondary mb-4 absolute -top-4 -left-2 text-6xl opacity-20">"</div>
              <p className="font-body-md text-body-md text-on-surface z-10 relative italic mb-6">
                {t("« Un partenaire fiable et rigoureux sur lequel nous pouvons compter pour nos projets d'infrastructures d'envergure, comme les grands aménagements hydro-agricoles ou la gestion des ressources en eau. »")}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold">DR</div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary">{t("Directeur de Projet")}</h4>
                  <p className="text-sm text-on-surface-variant">{t("Institutions Internationales")}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-surface-container p-8 rounded-2xl relative"
            >
              <div className="text-secondary mb-4 absolute -top-4 -left-2 text-6xl opacity-20">"</div>
              <p className="font-body-md text-body-md text-on-surface z-10 relative italic mb-6">
                {t("« La force de KRB réside dans leur capacité à allier une expertise technique pointue en ingénierie à une réelle approche d'intermédiation sociale, essentielle pour la réussite durable des projets de développement rural. »")}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tertiary/20 rounded-full flex items-center justify-center text-tertiary font-bold">RC</div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary">{t("Responsable de Composante")}</h4>
                  <p className="text-sm text-on-surface-variant">{t("Développement Rural")}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
