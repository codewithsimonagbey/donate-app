import React, { useEffect, useState } from 'react';
import Navbar from '/imports/ui/components/Navbar.jsx';
import Footer from '/imports/ui/components/Footer.jsx';

const AppShell = ({ children }) => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-[--color-bg] text-[--color-fg] font-sans">
      <Navbar dark={dark} onToggleDark={() => setDark((v) => !v)} />
      <main className="min-h-[calc(100vh-200px)]">{children}</main>
      <Footer />
    </div>
  );
};

export default AppShell;
