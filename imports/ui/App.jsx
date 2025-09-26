import React from "react";
import Navbar from "/imports/ui/components/Navbar.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";

const App = () => (
  <main
    className="
      min-h-screen
      font-sans
      bg-[--color-bg]
      text-[--color-fg]
      transition-colors
      duration-500
      selection:bg-[--color-accent]/20
      selection:text-[--color-fg]
    "
  >
    {/* Persistent navbar */}
    <Navbar />

    {/* Page content */}
    <section className="pt-16">
      <LandingPage />
    </section>

    {/* Footer */}
    <footer className="border-t border-[--color-muted]/30 bg-[--color-card] text-center py-8 mt-12">
      <p className="text-sm text-[--color-muted]">
        © {new Date().getFullYear()} Help<span className="text-[--color-accent]">Somebody</span>. 
        All rights reserved.
      </p>
      <div className="mt-3 text-xs text-[--color-muted]/70">
        Built with ❤️ using Meteor + React + TailwindCSS v4
      </div>
    </footer>
  </main>
);

export default App;
