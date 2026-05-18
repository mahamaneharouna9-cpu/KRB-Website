import React from 'react';
import { MapPin, Globe, Landmark, Banknote, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import Projects from '../components/Projects';
import InteractiveMap from '../components/InteractiveMap';
import { cleanImages, categoryImages } from '../lib/images';
import { useTranslation } from 'react-i18next';

export default function References() {
  const { t } = useTranslation();
  const bgImg = "https://storage.googleapis.com/krbengineering/Ma%C3%AEtrise%20Environnementale/Ma%C3%AEtrise%20Environnementale/ugp%20(2).JPG";
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center bg-surface-container-low overflow-hidden">
        <img loading="lazy" 
          alt="Engineering Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply" 
          src={bgImg}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-4 block">{t('Études de Cas')}</span>
          <h1 className="font-display-lg text-display-lg text-primary mb-6">{t('Projets & Références')}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            {t("Découvrez notre empreinte technique à travers l'Afrique de l'Ouest. Une sélection de projets d'ingénierie majeurs soutenus par des institutions financières internationales.")}
          </p>
        </motion.div>
      </header>

      <main className="max-w-container-max mx-auto px-4 md:px-8 py-section-padding flex-grow">
        {/* Regional Footprint Map */}
        <section className="mb-section-padding">
          <div className="flex flex-col md:flex-row gap-gutter">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
              className="md:w-1/3 flex flex-col justify-center"
            >
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">{t('Présence Régionale')}</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                {t("Notre expertise s'étend à travers plusieurs pays clés d'Afrique de l'Ouest, apportant des solutions d'ingénierie durables et adaptées aux contextes locaux.")}
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-tertiary-container w-6 h-6" />
                  <span className="font-label-lg text-label-lg text-on-surface">{t('Niger (Siège - Niamey)')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-tertiary-container w-6 h-6" />
                  <span className="font-label-lg text-label-lg text-on-surface">{t('Burkina Faso (Représentation)')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-tertiary-container w-6 h-6" />
                  <span className="font-label-lg text-label-lg text-on-surface">{t('Mali')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-tertiary-container w-6 h-6" />
                  <span className="font-label-lg text-label-lg text-on-surface">{t("Sénégal & Côte d'Ivoire")}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-2/3 min-h-[500px] bg-surface-container-low rounded-xl relative overflow-hidden border border-outline-variant shadow-sm"
            >
              <InteractiveMap wrapperClass="absolute inset-0 w-full h-full bg-[#1e3a8a]" />
            </motion.div>
          </div>
        </section>

        {/* Dynamic Filterable Project List from Projects component */}
        <section className="mt-8">
          <Projects />
        </section>
      </main>
    </div>
  );
}
