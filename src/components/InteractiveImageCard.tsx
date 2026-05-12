import React from 'react';
import { motion } from 'motion/react';

interface InteractiveImageCardProps {
  title: string;
  description: string;
  imageUrl: string;
  delay?: number;
}

export default function InteractiveImageCard({ title, description, imageUrl, delay = 0 }: InteractiveImageCardProps) {
  return (
    <motion.button 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-50px" }} 
      transition={{ duration: 0.5, delay }}
      className="relative group overflow-hidden h-[400px] md:h-[500px] w-full rounded-2xl flex items-center justify-center cursor-pointer shadow-lg outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2 appearance-none border-none text-left"
      aria-label={`En savoir plus sur ${title}`}
    >
      <img 
        src={imageUrl} 
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110 group-focus-visible:scale-110" 
      />
      <div className="absolute inset-0 bg-slate-900/30 transition-colors duration-500 group-hover:bg-slate-900/60 group-focus-visible:bg-slate-900/60"></div>
      
      <h3 className="relative z-10 text-white font-display-sm text-2xl md:text-3xl font-semibold uppercase tracking-[0.15em] text-center transition-transform duration-500 group-hover:-translate-y-12 group-focus-visible:-translate-y-12 px-4">
        {title}
      </h3>

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 translate-y-full opacity-0 group-hover:translate-y-0 group-focus-visible:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-500 ease-out flex items-end h-[70%] bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent">
        <p className="text-white/90 font-body-lg text-lg md:text-xl leading-relaxed">
          {description}
        </p>
      </div>
    </motion.button>
  );
}
