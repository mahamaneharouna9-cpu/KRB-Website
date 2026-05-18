import React from 'react';
import { Droplets, Leaf, Map, GraduationCap, CheckCircle, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { categoryImages } from '../lib/images';
import { useTranslation } from 'react-i18next';

import imageHero from '../assets/images/regenerated_image_1779057160162.jpg';
import imageEau from '../assets/images/regenerated_image_1779060586342.JPG';
import imageEnv from '../assets/images/regenerated_image_1779060598895.JPG';
import imageRural from '../assets/images/regenerated_image_1779060600115.JPG';
import imageSocial from '../assets/images/regenerated_image_1779060604404.JPG';

export default function Services() {
  const { t } = useTranslation();
  const heroImage = imageHero;
  const eauImage = imageEau;
  const envImage = imageEnv;
  const ruralImage = imageRural;
  const socialImage = imageSocial;
  const energieImage = categoryImages.energie[0] || categoryImages.energie[1];
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section with Banner */}
      <header className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center bg-surface-container-low overflow-hidden">
        <img loading="lazy" 
          alt="Services Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply" 
          src={heroImage} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4 block">{t('Nos Services')}</span>
          <h1 className="font-display-lg text-display-lg text-primary mb-6">{t('Expertise Multidisciplinaire pour le Développement')}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {t("KRB Ingénieurs Conseils offre des solutions d'ingénierie complètes dans les domaines de l'hydraulique, de l'environnement, du développement rural et de l'énergie. Notre approche intègre les dernières technologies SIG pour des résultats précis et durables.")}
          </p>
        </motion.div>
      </header>

      <main className="py-section-padding bg-background flex-grow">
        <div className="max-w-container-max mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">{t("Domaines d'Intervention")}</h2>
            <div className="w-24 h-1 bg-secondary rounded-full mb-6"></div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              {t("Nous déployons notre expertise technique à travers des secteurs clés pour assurer un développement résilient et performant de vos infrastructures.")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            
            {/* Hydraulique (Large Span) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-card-padding shadow-[0_4px_20px_rgba(0,65,107,0.05)] hover:shadow-[0_8px_30px_rgba(0,65,107,0.08)] transition-shadow duration-300 group flex flex-col justify-between overflow-hidden"
            >
              <div className="w-full h-64 -mt-6 -mx-6 mb-6 overflow-hidden border-b border-outline-variant relative">
                <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500"></div>
                <img loading="lazy" src={eauImage} alt="Ingénierie de l'Eau" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="px-6 pb-6">
                <div className="w-12 h-12 bg-primary-fixed rounded flex items-center justify-center mb-6 text-primary shadow-sm -mt-12 relative z-20 border border-white">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4 group-hover:text-secondary transition-colors">{t("Ingénierie de l'Eau & Hydraulique")}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                  {t("Études complètes et supervision des travaux pour des infrastructures de gestion de l'eau durables, de l'échelle villageoise à l'échelle urbaine.")}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                    <li className="flex items-start">
                      <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0" />
                      <span>{t("Hydraulique villageoise (forages, puits, AEP).")}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0" />
                      <span>{t("Hydraulique urbaine et semi-urbaine (mini AEP).")}</span>
                    </li>
                  </ul>
                  <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                    <li className="flex items-start">
                      <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0" />
                      <span>{t("Assainissement (eaux pluviales, usées, déchets).")}</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0" />
                      <span>{t("Études hydrogéologiques et hydro-géophysiques.")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Environnement (Small Span) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-4 bg-surface-container-low border border-outline-variant rounded-lg flex flex-col overflow-hidden group shadow-[0_4px_20px_rgba(0,65,107,0.05)] hover:shadow-[0_8px_30px_rgba(0,65,107,0.08)] transition-all duration-300"
            >
              <div className="w-full h-48 overflow-hidden border-b border-outline-variant relative">
                 <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500"></div>
                 <img loading="lazy" src={envImage} alt="Environnement" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-card-padding flex flex-col flex-grow relative">
                <div className="w-10 h-10 bg-primary-fixed rounded flex items-center justify-center mb-4 text-primary shadow-sm absolute -top-5 left-6 border border-white">
                  <Leaf className="w-5 h-5" />
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4 mt-2 group-hover:text-secondary transition-colors">{t("Maîtrise Environnementale")}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                  {t("Évaluation et atténuation des impacts environnementaux pour garantir la conformité des projets.")}
                </p>
                <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{t("Études d’Impact Environnemental et Social (EIES).")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{t("Protection, restauration et conservation des sols.")}</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Développement Rural (Small Span) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-lg flex flex-col overflow-hidden group shadow-[0_4px_20px_rgba(0,65,107,0.05)] hover:shadow-[0_8px_30px_rgba(0,65,107,0.08)] transition-all duration-300"
            >
              <div className="w-full h-48 overflow-hidden border-b border-outline-variant relative">
                 <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500"></div>
                 <img loading="lazy" src={ruralImage} alt="Développement Rural" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-card-padding flex flex-col flex-grow relative">
                <div className="w-10 h-10 bg-primary-fixed rounded flex items-center justify-center mb-4 text-primary shadow-sm absolute -top-5 left-6 border border-white">
                  <Map className="w-5 h-5" />
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4 mt-2 group-hover:text-secondary transition-colors">{t("Développement Rural & Urbain")}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                  {t("Planification et aménagement pour structurer et dynamiser les territoires urbains et ruraux.")}
                </p>
                <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant mt-auto">
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{t("Aménagement hydro-agricole.")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{t("Lotissement et urbanisme.")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{t("Cartographie et SIG.")}</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Formation / Intermédiation */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-4 bg-surface border border-outline-variant rounded-lg flex flex-col overflow-hidden group shadow-[0_4px_20px_rgba(0,65,107,0.05)] hover:shadow-[0_8px_30px_rgba(0,65,107,0.08)] transition-all duration-300"
            >
              <div className="w-full h-48 overflow-hidden border-b border-outline-variant relative">
                 <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500"></div>
                 <img loading="lazy" src={socialImage} alt="Ingénierie Sociale" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-card-padding flex flex-col flex-grow relative">
                <div className="w-10 h-10 bg-primary-fixed rounded flex items-center justify-center mb-4 text-primary shadow-sm absolute -top-5 left-6 border border-white">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4 mt-2 group-hover:text-secondary transition-colors">{t("Ingénierie Sociale")}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                  {t("Renforcement des capacités et appropriation des projets par les communautés cibles.")}
                </p>
                <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant mt-auto">
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{t("Sensibilisation et formation.")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{t("Évaluations socio-économiques.")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{t("Appui institutionnel.")}</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Mines et Énergie */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.5 }}
              className="md:col-span-4 bg-surface-container-low border border-outline-variant rounded-lg flex flex-col overflow-hidden group shadow-[0_4px_20px_rgba(0,65,107,0.05)] hover:shadow-[0_8px_30px_rgba(0,65,107,0.08)] transition-all duration-300"
            >
              <div className="w-full h-48 overflow-hidden border-b border-outline-variant relative">
                 <div className="absolute inset-0 bg-primary/10 z-10 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500"></div>
                 <img loading="lazy" src={energieImage} alt="Mines et Énergie" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-card-padding flex flex-col flex-grow relative">
                <div className="w-10 h-10 bg-primary-fixed rounded flex items-center justify-center mb-4 text-primary shadow-sm absolute -top-5 left-6 border border-white">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4 mt-2 group-hover:text-secondary transition-colors">{t("Mines et Énergie")}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                  {t("Exploration, exploitation et sécurisation des secteurs extractifs et énergétiques.")}
                </p>
                <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant mt-auto">
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{t("Levés géophysiques stratiformes.")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{t("Cartographie géologique ciblée.")}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-secondary mr-2 w-5 h-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{t("Études d'impact minier.")}</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

