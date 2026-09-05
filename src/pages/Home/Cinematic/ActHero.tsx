import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const TITLE = 'UNIT';

const ActHero: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY    = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const titleOp   = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);
  const ledeOp    = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} id="act-hero" className="cine-act" data-act="hero">
      <motion.div
        aria-hidden
        className="cine-hero-field"
        style={{
          scale: fieldScale,
        }}
      />
      <div className="cine-grain" />
      <div className="cine-vignette" />

      <motion.div className="cine-act-inner" style={{ y: titleY }}>
        <motion.span
          className="cine-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Saison 1 — Ouverture
        </motion.span>

        <motion.h1
          className="cine-title"
          style={{ opacity: titleOp, fontSize: 'clamp(5rem, 22vw, 22rem)', textAlign: 'center', letterSpacing: 0 }}
        >
          {TITLE.split('').map((char, i) => (
            <motion.span
              key={i}
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, y: 80, filter: 'blur(20px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="cine-lede"
          style={{ opacity: ledeOp, textAlign: 'center', maxWidth: 540, margin: '2rem auto 0' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          Un jeu de cartes. Mille destins. Une seule règle :{' '}
          <em style={{ color: 'var(--cine-ink)' }}>n'abandonnez jamais la partie.</em>
        </motion.p>

        <motion.div
          className="cine-hero-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.85 }}
        >
          <Link to="/play" className="cine-btn cine-btn--massive">
            Jouer maintenant
            <span aria-hidden>→</span>
          </Link>
          <Link to="/rules" className="cine-btn cine-btn--ghost">
            Voir les règles
          </Link>
        </motion.div>

        <motion.div
          className="cine-hero-metrics"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.05 }}
          aria-label="Statistiques UNIT"
        >
          <span><strong>152</strong> en ligne</span>
          <span><strong>38</strong> parties live</span>
          <span><strong>12s</strong> file moyenne</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="cine-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <span>Faire défiler</span>
        <span className="line" />
      </motion.div>
    </section>
  );
};

export default ActHero;
