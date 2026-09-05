import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { value: 47829, label: 'joueurs' },
  { value: 1284,  label: 'parties / jour' },
  { value: 96,    label: 'pays représentés' },
  { value: 24,    label: 'tournois ce mois-ci' },
];

const QUOTES = [
  { who: 'Akira_VII',    where: 'Tokyo',     text: 'Le seul jeu qui me fait penser à chaque instant.' },
  { who: 'NyxRoyale',    where: 'Paris',     text: "J'ai rencontré ma guilde ici. Maintenant on est famille." },
  { who: 'CardinalNova', where: 'Madrid',    text: 'Six mois pour atteindre le top 100. Six mois sans dormir.' },
  { who: 'Vermillion',   where: 'São Paulo', text: 'Chaque carte est une histoire. Chaque main, un combat.' },
  { who: 'Phoenix.exe',  where: 'Séoul',     text: "C'est plus qu'un jeu. C'est une discipline." },
  { who: 'KappaQueen',   where: 'Berlin',    text: "Je n'avais jamais ressenti ça avec un jeu de cartes." },
];

const Counter: React.FC<{ to: number; play: boolean }> = ({ to, play }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!play) return;
    const dur = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, play]);
  return <>{val.toLocaleString('fr-FR')}</>;
};

const ActCommunity: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30%' });

  return (
    <section ref={ref} id="act-community" className="cine-act" data-act="community" style={{ alignItems: 'flex-start', paddingTop: '14vh' }}>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 70% 80%, rgba(155, 92, 255, 0.10), transparent 60%)',
        }}
      />
      <div className="cine-act-inner">
        <span className="cine-eyebrow">Acte IV — La Communauté</span>
        <h2 className="cine-title" style={{ fontSize: 'clamp(2.4rem, 6vw, 5.4rem)', maxWidth: 880 }}>
          Vous n'êtes <em>pas seul.</em>
        </h2>

        {/* Stats */}
        <div
          style={{
            marginTop: '4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid var(--cine-line)',
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <div
                style={{
                  fontFamily: 'var(--cine-font-display)',
                  fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                  fontWeight: 600,
                  letterSpacing: 0,
                  lineHeight: 1,
                  color: 'var(--cine-ink)',
                }}
              >
                <Counter to={s.value} play={inView} />
              </div>
              <div
                style={{
                  marginTop: '0.6rem',
                  fontFamily: 'var(--cine-font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--cine-ink-dim)',
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee de témoignages */}
        <div
          style={{
            marginTop: '4rem',
            overflow: 'hidden',
            position: 'relative',
            maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          }}
        >
          <div className="cine-marquee">
            {[...QUOTES, ...QUOTES].map((q, i) => (
              <div
                key={i}
                style={{
                  flex: '0 0 auto',
                  minWidth: 360,
                  maxWidth: 420,
                  padding: '1.6rem 1.8rem',
                  border: '1px solid var(--cine-line)',
                  borderRadius: 16,
                  background: 'rgba(255, 255, 255, 0.02)',
                  whiteSpace: 'normal',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--cine-font-display)',
                    fontSize: '1.05rem',
                    lineHeight: 1.45,
                    color: 'var(--cine-ink)',
                    margin: 0,
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{q.text}&rdquo;
                </p>
                <div
                  style={{
                    marginTop: '1rem',
                    fontFamily: 'var(--cine-font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--cine-ink-dim)',
                  }}
                >
                  {q.who} · {q.where}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActCommunity;
