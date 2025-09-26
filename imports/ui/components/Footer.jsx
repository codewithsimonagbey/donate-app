import React from 'react';

const Footer = () => (
  <footer className="mt-16 bg-[--color-card] border-t border-[--color-card-border]">
    <div className="max-w-7xl mx-auto px-4 py-10 text-center">
      <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-[--color-fg]">
        Start your fundraising today
      </h3>
      <button className="px-5 py-2.5 rounded-[--radius-md] font-semibold transition
                         bg-[--color-accent] text-white hover:opacity-95">
        Get Started
      </button>
      <p className="mt-6 text-xs sm:text-sm text-[--color-muted]">
        © {new Date().getFullYear()} Help<span className="text-[--color-accent]">Somebody</span>. Built with Meteor + React.
      </p>
    </div>
  </footer>
);

export default Footer;
