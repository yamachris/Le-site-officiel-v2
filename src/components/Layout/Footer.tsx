import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaDiscord, FaTwitch, FaYoutube, FaInstagram, FaTiktok,
} from 'react-icons/fa';
import UnitLogoMark from '../UnitLogoMark';

const socialLinks = [
  { icon: <FaDiscord />,   url: '#', label: 'Discord' },
  { icon: <FaTwitch />,    url: '#', label: 'Twitch' },
  { icon: <FaYoutube />,   url: '#', label: 'YouTube' },
  { icon: <FaInstagram />, url: '#', label: 'Instagram' },
  { icon: <FaTiktok />,    url: '#', label: 'TikTok' },
];

const COLUMNS: Array<{ title: string; links: Array<{ label: string; to: string }> }> = [
  {
    title: 'Le Jeu',
    links: [
      { label: 'Règles',     to: '/rules' },
      { label: 'Lore',       to: '/lore' },
      { label: 'Jouer',      to: '/play' },
      { label: 'Boutique',   to: '/shop' },
    ],
  },
  {
    title: 'Communauté',
    links: [
      { label: 'Forum',      to: '/community/forum' },
      { label: 'Wall',       to: '/community' },
      { label: 'Classement', to: '/ranking' },
      { label: 'Tournois',   to: '/play' },
    ],
  },
  {
    title: 'Compte',
    links: [
      { label: 'Connexion',          to: '/login' },
      { label: 'Inscription',        to: '/register' },
      { label: 'Mon profil',         to: '/profile' },
      { label: 'Premium',            to: '/premium-features' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'CGU',                  to: '/terms' },
      { label: 'Confidentialité',      to: '/privacy' },
    ],
  },
];

const sectionLabel: React.CSSProperties = {
  fontFamily: 'var(--cine-font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--cine-ink-dim)',
  marginBottom: '1.2rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.6rem',
};

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        position: 'relative',
        background:
          'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255, 61, 110, 0.06), transparent 60%),' +
          'linear-gradient(180deg, var(--cine-bg) 0%, var(--cine-bg-deep) 100%)',
        borderTop: '1px solid var(--cine-line)',
        color: 'var(--cine-ink)',
        marginTop: 'clamp(40px, 8vh, 96px)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(48px, 8vh, 96px) clamp(20px, 4vw, 48px) 32px',
        }}
      >
        {/* Bandeau "manifeste" */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '4rem',
            paddingBottom: '4rem',
            borderBottom: '1px solid var(--cine-line)',
          }}
        >
          <div>
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.7rem',
                textDecoration: 'none',
                color: 'var(--cine-ink)',
                marginBottom: '1.5rem',
              }}
            >
              <UnitLogoMark size={42} />
              <span
                style={{
                  fontFamily: 'var(--cine-font-display)',
                  fontWeight: 700,
                  fontSize: '1.4rem',
                  letterSpacing: 0,
                  lineHeight: 1,
                }}
              >
                UNIT
              </span>
            </Link>
            <h3
              style={{
                fontFamily: 'var(--cine-font-display)',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 500,
                letterSpacing: 0,
                margin: 0,
                lineHeight: 1.1,
                color: 'var(--cine-ink)',
              }}
            >
              Le jeu de cartes <em style={{ color: 'var(--cine-ink-soft)', fontWeight: 400 }}>réinventé.</em>
            </h3>
            <p
              style={{
                marginTop: '1rem',
                color: 'var(--cine-ink-soft)',
                maxWidth: 360,
                lineHeight: 1.5,
                fontSize: '0.95rem',
              }}
            >
              Une communauté mondiale. Des milliers de parties chaque jour. Une seule règle :
              n'abandonnez jamais la partie.
            </p>
          </div>

          {/* Colonnes de liens */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <span style={sectionLabel}>{col.title}</span>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      style={{
                        color: 'var(--cine-ink-soft)',
                        textDecoration: 'none',
                        fontFamily: 'var(--cine-font-display)',
                        fontSize: '0.95rem',
                        transition: 'color var(--cine-transition)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cine-ink)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--cine-ink-soft)')}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Réseaux + statut live */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: '2.5rem',
          }}
        >
          {/* Status live */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--cine-radius-pill)',
              border: '1px solid var(--cine-line)',
              background: 'var(--cine-surface)',
              fontFamily: 'var(--cine-font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--cine-ink-soft)',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--cine-success)',
                boxShadow: '0 0 12px var(--cine-success)',
                animation: 'cine-pulse 1.8s ease-in-out infinite',
              }}
            />
            152 joueurs en ligne · 38 parties en cours
          </div>

          {/* Réseaux sociaux */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.url}
                aria-label={s.label}
                style={{
                  width: 38,
                  height: 38,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--cine-line)',
                  borderRadius: 'var(--cine-radius-pill)',
                  color: 'var(--cine-ink-soft)',
                  fontSize: '0.9rem',
                  transition: 'color var(--cine-transition), background var(--cine-transition), border-color var(--cine-transition)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--cine-ink)';
                  e.currentTarget.style.borderColor = 'var(--cine-line-hi)';
                  e.currentTarget.style.background = 'var(--cine-surface)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--cine-ink-soft)';
                  e.currentTarget.style.borderColor = 'var(--cine-line)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            marginTop: '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--cine-line)',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontFamily: 'var(--cine-font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--cine-ink-dim)',
          }}
        >
          <span>UNIT · Saison 1 · {new Date().getFullYear()}</span>
          <span>Tous droits réservés.</span>
        </div>
      </div>

      {/* Keyframes pour le pulse — injectées localement */}
      <style>{`
        @keyframes cine-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(1.4); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
