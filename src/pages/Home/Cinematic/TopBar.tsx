import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import UnitLogoMark from '../../../components/UnitLogoMark';
import {
  FaBook,
  FaBookOpen,
  FaHome,
  FaPlay,
  FaShoppingCart,
  FaSignInAlt,
  FaTrophy,
  FaUserPlus,
  FaUsers,
} from 'react-icons/fa';

const ROUTES = [
  { to: '/',          label: 'Accueil',     detail: 'Retour à l’ouverture',       icon: <FaHome /> },
  { to: '/play',      label: 'Jouer',       detail: 'Lancer une partie',          icon: <FaPlay /> },
  { to: '/rules',     label: 'Règles',      detail: 'Comprendre les mécaniques',  icon: <FaBook /> },
  { to: '/lore',      label: 'Lore',        detail: 'Explorer le Codex UNIT',     icon: <FaBookOpen /> },
  { to: '/ranking',   label: 'Classement',  detail: 'Suivre le ladder',           icon: <FaTrophy /> },
  { to: '/community', label: 'Communauté',  detail: 'Forum, tournois, joueurs',   icon: <FaUsers /> },
  { to: '/shop',      label: 'Boutique',    detail: 'Skins, plateaux, effets',    icon: <FaShoppingCart /> },
  { to: '/login',     label: 'Connexion',   detail: 'Reprendre votre profil',     icon: <FaSignInAlt /> },
];

const TopBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="cine-topbar">
        <Link to="/" className="cine-topbar-logo" aria-label="UNIT — Accueil">
          <span className="cine-brand-mark" aria-hidden>
            <UnitLogoMark size={36} />
          </span>
          <span>UNIT</span>
        </Link>

        <div className="cine-topbar-actions">
          <Link to="/play" className="cine-topbar-play">
            <FaPlay aria-hidden />
            <span>Jouer</span>
          </Link>
          <button
            type="button"
            className="cine-topbar-menu"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <span className="dot" aria-hidden />
            <span>Menu</span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="cine-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <motion.div
              className="cine-menu-panel"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="cine-menu-header">
                <Link to="/" className="cine-menu-brand" onClick={() => setOpen(false)}>
                  <span className="cine-brand-mark" aria-hidden>
                    <UnitLogoMark size={58} />
                  </span>
                  <span>
                    <strong>UNIT</strong>
                    <small>Saison 1</small>
                  </span>
                </Link>
                <button
                  type="button"
                  className="cine-menu-close"
                  onClick={() => setOpen(false)}
                >
                  Fermer
                </button>
              </div>

              <div className="cine-menu-hero">
                <span>Navigation</span>
                <h2>Choisissez votre prochaine action.</h2>
                <div>
                  <Link to="/play" className="cine-menu-cta" onClick={() => setOpen(false)}>
                    <FaPlay aria-hidden />
                    Jouer maintenant
                  </Link>
                  <Link to="/register" className="cine-menu-cta cine-menu-cta--ghost" onClick={() => setOpen(false)}>
                    <FaUserPlus aria-hidden />
                    Créer un compte
                  </Link>
                </div>
              </div>

              <motion.nav
                className="cine-menu-grid"
                aria-label="Navigation principale"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.035 } },
                }}
              >
                {ROUTES.map((r) => (
                  <motion.div
                    key={r.to}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link to={r.to} className="cine-menu-link" onClick={() => setOpen(false)}>
                      <span className="cine-menu-link-icon" aria-hidden>{r.icon}</span>
                      <span>
                        <strong>{r.label}</strong>
                        <small>{r.detail}</small>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopBar;
