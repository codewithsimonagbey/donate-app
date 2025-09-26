import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ─────────────────────────────────────────────
// Theme Context
// ─────────────────────────────────────────────
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  scrolling: false,
});

export const useTheme = () => useContext(ThemeContext);

// ─────────────────────────────────────────────
// Theme Provider
// ─────────────────────────────────────────────
export const ThemeProvider = ({ children }) => {
  // Initialize theme (avoid SSR hydration mismatch)
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      return (
        localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      );
    } catch {
      return 'light';
    }
  });

  const [scrolling, setScrolling] = useState(false);

  // Apply class to <html> and persist
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      html.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Listen to system preference change (auto-sync)
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  // Detect scrolling for sticky headers / shadows
  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle handler (memoized)
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, scrolling }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
