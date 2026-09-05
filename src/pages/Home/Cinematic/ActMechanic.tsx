import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// 4 familles, animées vers leur position finale au scroll
const SUITS = [
  { sym: '♠', name: 'Pique',   color: '#9b5cff', from: { x: -260, y: -160, r: -22 } },
  { sym: '♥', name: 'Cœur',    color: '#ff3d6e', from: { x:  260, y: -160, r:  22 } },
  { sym: '♦', name: 'Carreau', color: '#00d8ff', from: { x: -260, y:  160, r: -16 } },
  { sym: '♣', name: 'Trèfle',  color: '#ffd166', from: { x:  260, y:  160, r:  16 } },
];

interface SuitCardProps {
  conv: MotionValue<number>;
  suit: typeof SUITS[number];
  zIndex: number;
}

// Sous-composant : un hook par carte (respecte les rules of hooks)
const SuitCard: React.FC<SuitCardProps> = ({ conv, suit, zIndex }) => {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 640px)');
    const sync = () => setCompact(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const cardWidth = compact ? 160 : 200;
  const cardHeight = compact ? 224 : 280;
  const travel = compact ? 0.52 : 1;
  const x = useTransform(conv, [0, 1], [0, suit.from.x * travel]);
  const y = useTransform(conv, [0, 1], [0, suit.from.y * travel]);
  const rotate = useTransform(conv, [0, 1], [0, suit.from.r]);

  return (
    <motion.div
      className="cine-card"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -cardWidth / 2,
        marginTop: -cardHeight / 2,
        x,
        y,
        rotate,
        color: suit.color,
        textShadow: `0 0 30px ${suit.color}80`,
        zIndex,
      }}
    >
      {suit.sym}
    </motion.div>
  );
};

const ActMechanic: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Convergence : les 4 cartes partent des coins puis se rapprochent au centre
  const conv = useTransform(scrollYProgress, [0.1, 0.55], [1, 0]);
  // Texte qui apparaît après convergence
  const textOp = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const eyebrowOp = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section ref={ref} id="act-mechanic" className="cine-act" data-act="mechanic">
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0, 216, 255, 0.05), transparent 60%)',
        }}
      />

      <div className="cine-act-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem' }}>
        <motion.span className="cine-eyebrow" style={{ opacity: eyebrowOp }}>
          Acte II — Le Jeu
        </motion.span>

        {/* Zone des 4 cartes qui convergent */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 700, height: 360 }}>
          {SUITS.map((suit, i) => (
            <SuitCard key={suit.sym} suit={suit} conv={conv} zIndex={4 - i} />
          ))}
        </div>

        <motion.div style={{ opacity: textOp, textAlign: 'center', maxWidth: 720 }}>
          <h2
            className="cine-title"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.2rem)', textAlign: 'center' }}
          >
            Quatre familles. <em>Une infinité de paris.</em>
          </h2>
          <p className="cine-lede" style={{ marginTop: '1.5rem', textAlign: 'center', marginInline: 'auto' }}>
            Chaque carte ouvre un possible. Chaque main vous force à choisir.
            La maîtrise commence où s'arrête la chance.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ActMechanic;
