import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface Player {
  rank: number;
  name: string;
  elo: number;
  delta: number;
  flag: string;
}

const SEED: Player[] = [
  { rank: 1,  name: 'Akira_VII',     elo: 2847, delta:  +12, flag: '🇯🇵' },
  { rank: 2,  name: 'NyxRoyale',     elo: 2812, delta:   -3, flag: '🇫🇷' },
  { rank: 3,  name: 'CardinalNova',  elo: 2798, delta:  +24, flag: '🇪🇸' },
  { rank: 4,  name: 'KappaQueen',    elo: 2774, delta:   +5, flag: '🇩🇪' },
  { rank: 5,  name: 'iSchnitzel',    elo: 2761, delta:   -8, flag: '🇨🇭' },
  { rank: 6,  name: 'Vermillion',    elo: 2745, delta:  +14, flag: '🇧🇷' },
  { rank: 7,  name: 'Phoenix.exe',   elo: 2728, delta:   +2, flag: '🇰🇷' },
  { rank: 8,  name: 'Lord_Velour',   elo: 2719, delta:  -11, flag: '🇬🇧' },
];

const ActLadder: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  // Mises à jour live simulées : on tweak l'ELO d'un joueur au hasard
  const [players, setPlayers] = useState<Player[]>(SEED);
  const [pulse, setPulse] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setPlayers((prev) => {
        const next = prev.map((p) => ({ ...p }));
        const i = Math.floor(Math.random() * next.length);
        const change = Math.floor(Math.random() * 9) - 4;
        next[i].elo += change;
        next[i].delta = change;
        next.sort((a, b) => b.elo - a.elo).forEach((p, idx) => (p.rank = idx + 1));
        setPulse(next[i].rank);
        return next;
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} id="act-ladder" className="cine-act" data-act="ladder" style={{ alignItems: 'flex-start', paddingTop: '12vh' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 30% 0%, rgba(255, 61, 110, 0.08), transparent 60%)',
        }}
      />
      <div className="cine-act-inner">
        <span className="cine-eyebrow">Acte III — L'Arène</span>
        <motion.h2 className="cine-title" style={{ y: titleY, fontSize: 'clamp(2.4rem, 6vw, 5.4rem)', maxWidth: 920 }}>
          Le ladder <em>ne dort jamais.</em>
        </motion.h2>
        <p className="cine-lede" style={{ marginTop: '1.5rem' }}>
          Top 8 mondial — mis à jour en direct. Chaque main change le classement.
        </p>

        <div
          role="table"
          aria-label="Classement live"
          style={{
            marginTop: '3rem',
            border: '1px solid var(--cine-line)',
            borderRadius: 18,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.02)',
          }}
        >
          {/* Header */}
          <div
            role="row"
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 100px 80px 60px',
              padding: '0.9rem 1.2rem',
              fontFamily: 'var(--cine-font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--cine-ink-dim)',
              borderBottom: '1px solid var(--cine-line)',
            }}
          >
            <span>#</span>
            <span>Joueur</span>
            <span style={{ textAlign: 'right' }}>ELO</span>
            <span style={{ textAlign: 'right' }}>Δ</span>
            <span />
          </div>

          {players.map((p) => (
            <motion.div
              key={p.name}
              layout
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              role="row"
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 100px 80px 60px',
                padding: '1rem 1.2rem',
                alignItems: 'center',
                background: pulse === p.rank ? 'rgba(255, 61, 110, 0.06)' : 'transparent',
                borderBottom: '1px solid var(--cine-line)',
                transition: 'background 800ms',
                fontFamily: 'var(--cine-font-display)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--cine-font-mono)',
                  fontSize: '0.85rem',
                  color: p.rank <= 3 ? 'var(--cine-accent-3)' : 'var(--cine-ink-dim)',
                  fontWeight: 600,
                }}
              >
                {String(p.rank).padStart(2, '0')}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '1.05rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{p.flag}</span>
                {p.name}
              </span>
              <span style={{ textAlign: 'right', fontFamily: 'var(--cine-font-mono)', fontSize: '0.95rem' }}>
                {p.elo}
              </span>
              <span
                style={{
                  textAlign: 'right',
                  fontFamily: 'var(--cine-font-mono)',
                  fontSize: '0.85rem',
                  color: p.delta > 0 ? '#4ade80' : p.delta < 0 ? '#f87171' : 'var(--cine-ink-dim)',
                }}
              >
                {p.delta > 0 ? '+' : ''}{p.delta}
              </span>
              <AnimatePresence>
                {pulse === p.rank && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: 'var(--cine-accent)',
                      boxShadow: '0 0 12px var(--cine-accent)',
                      justifySelf: 'end',
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActLadder;
