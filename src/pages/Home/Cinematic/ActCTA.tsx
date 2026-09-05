import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const FOOTER_LINKS = [
  { to: '/rules',     label: 'Règles' },
  { to: '/lore',      label: 'Lore' },
  { to: '/ranking',   label: 'Classement' },
  { to: '/community', label: 'Communauté' },
  { to: '/shop',      label: 'Boutique' },
  { to: '/login',     label: 'Connexion' },
  { to: '/register',  label: 'Inscription' },
  { to: '/terms',     label: 'CGU' },
  { to: '/privacy',   label: 'Confidentialité' },
];

const ActCTA: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const titleScale = useTransform(scrollYProgress, [0, 0.6], [0.85, 1]);
  const titleOp = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} id="act-cta" className="cine-act" data-act="cta" style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Glow rouge en bas */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120vmax',
          height: '80vmax',
          background: 'radial-gradient(ellipse, rgba(255, 61, 110, 0.18), transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ flex: 1 }} />

      <motion.div
        className="cine-act-inner"
        style={{ opacity: titleOp, scale: titleScale, textAlign: 'center' }}
      >
        <span className="cine-eyebrow" style={{ justifyContent: 'center' }}>
          Acte V — Le Pari
        </span>
        <h2
          className="cine-title"
          style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', textAlign: 'center', margin: 0, lineHeight: 0.95 }}
        >
          Tirez votre <em>première carte.</em>
        </h2>
        <p
          className="cine-lede"
          style={{ marginTop: '2rem', textAlign: 'center', marginInline: 'auto', fontSize: 'clamp(1rem, 1.4vw, 1.2rem)' }}
        >
          La table est mise. Les autres jouent déjà.
        </p>

        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link to="/register" className="cine-btn cine-btn--massive">
            Créer mon compte
            <span aria-hidden style={{ fontSize: '1.2em' }}>→</span>
          </Link>
          <Link to="/play" className="cine-btn cine-btn--ghost" style={{ padding: '1.5rem 2rem' }}>
            Jouer en invité
          </Link>
        </div>
      </motion.div>

      <div style={{ flex: 1 }} />

      {/* Plan du site discret */}
      <footer
        style={{
          width: '100%',
          maxWidth: 1280,
          margin: '0 auto',
          paddingTop: '3rem',
          borderTop: '1px solid var(--cine-line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          fontFamily: 'var(--cine-font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--cine-ink-dim)',
        }}
      >
        <div>UNIT · Saison 1 · 2026</div>
        <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {FOOTER_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{ color: 'var(--cine-ink-soft)', textDecoration: 'none' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </footer>
    </section>
  );
};

export default ActCTA;
