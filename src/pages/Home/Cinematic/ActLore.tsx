import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const PHRASES = [
  "Avant les cloches, avant la marée,",
  "il y eut un blanc qui eut faim d'une forme.",
  "La Rosace des Cieux se brisa.",
  "Ses éclats tombèrent sur le monde",
  "sous forme de cartes d'empreinte.",
  "Choisissez votre faction.",
  "Prononcez votre nom.",
];

const FACTIONS_PREVIEW = [
  { name: 'Aube Verrière', color: '#5a8fc0', glyph: '✦' },
  { name: 'Maisons du Reflux', color: '#7ab0c0', glyph: '◆' },
  { name: 'Ronces Lunaires', color: '#a8c890', glyph: '❧' },
  { name: 'Atelier des Cendres', color: '#c88040', glyph: '⚙' },
];

const ActLore: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale  = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);

  return (
    <section ref={ref} id="act-lore" className="cine-act" data-act="lore">
      {/* Fond ambiant */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 55% 45% at 75% 25%, rgba(212, 170, 96, 0.08), transparent 55%),' +
            'radial-gradient(ellipse 50% 40% at 25% 75%, rgba(90, 143, 192, 0.09), transparent 55%)',
        }}
      />
      <div className="cine-grain" />

      {/* Symbole de la Rosace qui tourne */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          fontSize: 'clamp(16rem, 42vw, 44rem)',
          color: 'rgba(255, 255, 255, 0.018)',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          rotate,
          scale,
          pointerEvents: 'none',
          userSelect: 'none',
          fontFamily: 'serif',
          lineHeight: 1,
        }}
      >
        ✦
      </motion.div>

      <div className="cine-act-inner" style={{ maxWidth: 960, display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 5vh, 4.5rem)' }}>
        <span className="cine-eyebrow">Acte I — Le Codex de Vesperre</span>

        {/* Texte révélé au scroll */}
        <h2
          className="cine-title"
          style={{
            fontSize: 'clamp(1.7rem, 4vw, 3.6rem)',
            fontWeight: 500,
            letterSpacing: 0,
            lineHeight: 1.18,
          }}
        >
          {PHRASES.map((phrase, i) => {
            const start = i / PHRASES.length;
            const end = (i + 1) / PHRASES.length;
            return (
              <PhraseLine
                key={i}
                progress={scrollYProgress}
                start={start}
                end={end}
                highlight={i >= 5}
              >
                {phrase}
              </PhraseLine>
            );
          })}
        </h2>

        {/* Aperçu des factions */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.55, 0.75], [0, 1]),
            y: useTransform(scrollYProgress, [0.55, 0.75], [16, 0]),
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', marginBottom: '1.8rem' }}>
            {FACTIONS_PREVIEW.map((f) => (
              <div
                key={f.name}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 1rem',
                  border: `1px solid ${f.color}50`,
                  borderRadius: 999,
                  background: `${f.color}0f`,
                  color: f.color,
                  fontFamily: 'var(--cine-font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                <span aria-hidden style={{ fontSize: '0.9rem' }}>{f.glyph}</span>
                {f.name}
              </div>
            ))}
          </div>

          <Link
            to="/lore"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--cine-font-mono)',
              fontSize: '0.78rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--cine-ink)',
              textDecoration: 'none',
              padding: '0.65rem 1.4rem',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(8px)',
              transition: 'background 200ms, border-color 200ms',
            }}
          >
            Lire le Codex complet
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

interface LineProps {
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  end: number;
  highlight: boolean;
  children: React.ReactNode;
}

const PhraseLine: React.FC<LineProps> = ({ progress, start, end, highlight, children }) => {
  const fadeStart = 0.28 + start * 0.42;
  const fadeEnd   = 0.28 + end   * 0.42;
  const opacity = useTransform(progress, [fadeStart - 0.04, fadeStart, fadeEnd, fadeEnd + 0.12], [0, 1, 1, highlight ? 1 : 0.22]);
  const y        = useTransform(progress, [fadeStart - 0.04, fadeStart], [14, 0]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        display: 'block',
        color: highlight ? 'var(--cine-ink)' : 'var(--cine-ink-soft)',
        fontStyle: highlight ? 'italic' : 'normal',
      }}
    >
      {children}
    </motion.span>
  );
};

export default ActLore;
