import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../../contexts/SettingsContext';
import { t } from '../../i18n/translate';
import Settings from './Settings';
import UnitLogoMark from '../UnitLogoMark';
import './Navbar.css';

const NAV_LINKS = [
  { path: '/rules',     label: () => t('nav.rules') },
  { path: '/lore',      label: () => t('nav.lore') },
  { path: '/ranking',   label: () => t('nav.ranking') },
  { path: '/community', label: () => t('nav.community') },
  { path: '/shop',      label: () => t('nav.shop') },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [mounted, setMounted]       = useState(false);
  const menuRef                     = useRef<HTMLDivElement>(null);
  const location                    = useLocation();
  const { language }                = useSettings();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKey);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <header
        className={`nav-shell ${scrolled ? 'is-scrolled' : ''} ${mounted ? 'is-mounted' : ''}`}
        data-language={language}
      >
        <div className="nav-inner">

          {/* ── Logo ── */}
          <Link to="/" className="nav-logo" aria-label="UNIT — Accueil">
            <UnitLogoMark size={28} className="nav-logo-mark" />
            <span className="nav-logo-name">UNIT</span>
          </Link>

          {/* ── Liens centraux ── */}
          <nav className="nav-links" aria-label="Navigation principale">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link${isActive(item.path) ? ' is-active' : ''}`}
              >
                {item.label()}
              </Link>
            ))}
          </nav>

          {/* ── Zone droite ── */}
          <div className="nav-end">
            <Settings />
            <Link to="/login" className="nav-auth-link">
              {t('auth.login')}
            </Link>
            <Link to="/play" className="nav-cta">
              <span>Jouer</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                <path d="M2 2h6v6M2 8l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <button
              type="button"
              className={`nav-burger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              <span className="nav-burger-icon" aria-hidden>
                <span /><span /><span />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Menu plein écran mobile ── */}
      <div
        ref={menuRef}
        className={`nav-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Menu principal"
      >
        <div className="nav-menu-inner">
          {/* Header du menu */}
          <div className="nav-menu-header">
            <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
              <UnitLogoMark size={32} className="nav-logo-mark" />
              <span className="nav-logo-name">UNIT</span>
            </Link>
            <button
              type="button"
              className="nav-menu-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>

          {/* Liens */}
          <nav className="nav-menu-links" aria-label="Navigation principale">
            {NAV_LINKS.map((item, i) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-menu-link${isActive(item.path) ? ' is-active' : ''}`}
                style={{ '--i': i } as React.CSSProperties}
                onClick={() => setMenuOpen(false)}
              >
                <span className="nav-menu-link-label">{item.label()}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </nav>

          {/* CTA bas de menu */}
          <div className="nav-menu-footer">
            <Link to="/play" className="nav-menu-play" onClick={() => setMenuOpen(false)}>
              Jouer maintenant
            </Link>
            <Link to="/login" className="nav-menu-login" onClick={() => setMenuOpen(false)}>
              {t('auth.login')}
            </Link>
            <Link to="/register" className="nav-menu-register" onClick={() => setMenuOpen(false)}>
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
