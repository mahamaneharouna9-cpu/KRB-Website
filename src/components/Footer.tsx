import React from 'react';

export default function Footer() {
  return (
    <footer role="contentinfo" aria-label="Site Footer" className="bg-surface-container-low border-t border-outline-variant full-width py-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <span className="text-lg font-bold text-primary mb-4 block">KRB CONSEILS</span>
          <p className="font-body-md text-sm text-on-surface-variant">
            © 2024 KRB Ingénieurs Conseils. Expertise en ingénierie et conseil technique.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-4">Bureaux</h4>
          <ul className="space-y-2">
            <li><a href="#" className="font-label-sm text-on-surface-variant hover:text-primary hover:underline transition-all">Niamey HQ</a></li>
            <li><a href="#" className="font-label-sm text-on-surface-variant hover:text-primary hover:underline transition-all">Burkina Faso Office</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-4">Réseaux</h4>
          <ul className="space-y-2">
            <li><a href="#" className="font-label-sm text-on-surface-variant hover:text-primary hover:underline transition-all">LinkedIn</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-primary mb-4">Légal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="font-label-sm text-on-surface-variant hover:text-primary hover:underline transition-all">Confidentialité</a></li>
            <li><a href="#about" className="font-label-sm text-on-surface-variant hover:text-primary hover:underline transition-all">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
