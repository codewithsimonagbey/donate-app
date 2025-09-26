import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaMoon, FaSun, FaHome, FaHandsHelping, FaUser } from 'react-icons/fa';
import { useTheme } from '/imports/ui/context/ThemeProvider.jsx';

const Navbar = () => {
  const { theme, toggleTheme, scrolling } = useTheme();
  const dark = theme === 'dark';

  const linkBase =
    'px-3 py-2 rounded-full transition text-sm font-semibold flex items-center gap-2 ' +
    'hover:bg-[--color-muted]/40 focus:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-[--color-accent]/60 focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-[--color-bg]';

  const active = ({ isActive }) =>
    `${linkBase} ${isActive ? 'bg-[--color-muted]/40' : ''}`;

  return (
    <header
      className={
        'sticky top-0 z-50 backdrop-blur bg-[--color-bg]/80 border-b border-[--color-muted]/30 ' +
        (scrolling ? 'shadow-md' : 'shadow-none')
      }
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between transition-colors">
        {/* Brand */}
        <Link
          to="/"
          className="text-lg font-extrabold flex items-center gap-2 hover:opacity-90 transition"
        >
          <FaHandsHelping className="text-[--color-accent]" aria-hidden="true" />
          <span>
            Help<span className="text-[--color-accent]">Somebody</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" className={active} end>
            <FaHome aria-hidden="true" /> <span className="hidden sm:inline">Home</span>
          </NavLink>

          <NavLink to="/campaigns" className={active}>
            <FaHandsHelping aria-hidden="true" /> <span className="hidden sm:inline">Campaigns</span>
          </NavLink>

          {/* Theme toggle — single icon, conditional render */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
            aria-pressed={dark}
            title={`Switch to ${dark ? 'Light' : 'Dark'} mode`}
            className={`${linkBase} motion-safe:hover:scale-105 transition-transform`}
          >
            {dark ? (
              <>
                <FaSun className="text-yellow-400" aria-hidden="true" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <FaMoon className="text-[--color-accent]" aria-hidden="true" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* Login */}
          <Link
            to="/auth/login"
            className="px-4 py-2 rounded-full bg-[--color-accent] text-white font-semibold hover:opacity-90 transition flex items-center gap-2"
          >
            <FaUser aria-hidden="true" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
