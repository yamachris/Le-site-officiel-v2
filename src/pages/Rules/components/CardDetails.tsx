import React from 'react';
import { motion } from 'framer-motion';
import { ArrowBack, MenuBook, EmojiObjects, HelpOutline } from '@mui/icons-material';

interface CardDetailsProps {
  cardType: string;
  accent: string;
  glyph: string;
  onBack: () => void;
}

const cardData: Record<string, {
  title: string;
  description: string;
  rules: string[];
  strategies: string[];
  faq: { question: string; answer: string }[];
}> = {
  general: {
    title: 'Règles générales',
    description: 'Les bases du jeu et les principes fondamentaux',
    rules: [
      'Le jeu se joue avec un deck de 52 cartes',
      'Chaque joueur commence avec 7 cartes en main',
      "Le but est d'être le premier à se débarrasser de toutes ses cartes",
    ],
    strategies: [
      "Gardez un œil sur le nombre de cartes de vos adversaires",
      "Planifiez vos combinaisons à l'avance",
      'Utilisez les cartes spéciales stratégiquement',
    ],
    faq: [
      { question: 'Combien de cartes peut-on jouer par tour ?', answer: 'Vous pouvez jouer autant de cartes que vous le souhaitez tant qu\'elles forment une combinaison valide.' },
      { question: 'Que se passe-t-il si je ne peux pas jouer ?', answer: 'Si vous ne pouvez pas jouer, vous devez piocher une carte.' },
    ],
  },
  king: {
    title: 'Le Roi',
    description: 'La carte la plus puissante du jeu',
    rules: [
      'Le Roi peut être joué sur n\'importe quelle carte',
      'Il peut changer la couleur du jeu',
      'Vous pouvez jouer plusieurs Rois à la fois',
    ],
    strategies: [
      'Gardez le Roi pour les moments critiques',
      'Utilisez-le pour bloquer les adversaires',
      'Combinez-le avec d\'autres cartes puissantes',
    ],
    faq: [
      { question: 'Peut-on jouer un Roi sur un autre Roi ?', answer: 'Oui, vous pouvez jouer un Roi sur un autre Roi.' },
    ],
  },
  queen: {
    title: 'La Dame',
    description: 'Une carte très versatile',
    rules: [
      'La Dame peut être jouée sur toute carte de même couleur',
      'Elle permet de piocher une carte supplémentaire',
      'Peut être combinée avec d\'autres Dames',
    ],
    strategies: [
      'Utilisez la Dame pour rafraîchir votre main',
      'Créez des combos avec plusieurs Dames',
      'Gardez-la comme carte de secours',
    ],
    faq: [
      { question: 'Doit-on piocher immédiatement après avoir joué une Dame ?', answer: 'Oui, la pioche doit être effectuée immédiatement après avoir joué la Dame.' },
    ],
  },
  jack: {
    title: 'Le Valet',
    description: 'Le maître du changement',
    rules: [
      'Le Valet permet de changer la couleur du jeu',
      'Il peut être joué sur n\'importe quelle carte',
      'Annonce la couleur suivante obligatoire',
    ],
    strategies: [
      'Utilisez le Valet pour faciliter vos prochains coups',
      'Choisissez une couleur dont vous avez plusieurs cartes',
      'Bloquez les adversaires en choisissant une couleur qu\'ils n\'ont pas',
    ],
    faq: [
      { question: 'Peut-on jouer une carte d\'une autre couleur après un Valet ?', answer: 'Non, la prochaine carte doit être de la couleur annoncée par le Valet.' },
    ],
  },
  joker: {
    title: 'Le Joker',
    description: 'La carte la plus imprévisible',
    rules: [
      'Le Joker peut copier n\'importe quelle carte',
      'Il peut être joué à tout moment',
      'Son effet dure jusqu\'au prochain tour',
    ],
    strategies: [
      'Gardez le Joker pour les situations critiques',
      'Copiez les effets des cartes puissantes',
      'Utilisez-le pour surprendre vos adversaires',
    ],
    faq: [
      { question: 'Peut-on utiliser le Joker comme une carte normale ?', answer: 'Non, le Joker doit toujours copier une carte déjà jouée.' },
    ],
  },
  lucky7: {
    title: '7 de Chance',
    description: 'La carte qui peut tout changer',
    rules: [
      'Le 7 inverse l\'ordre du jeu',
      'Il peut être joué sur n\'importe quelle carte',
      'Plusieurs 7 peuvent être joués à la suite',
    ],
    strategies: [
      'Utilisez le 7 pour perturber les plans des adversaires',
      'Jouez-le quand un adversaire a peu de cartes',
      'Combinez-le avec d\'autres cartes spéciales',
    ],
    faq: [
      { question: 'Que se passe-t-il si plusieurs 7 sont joués ?', answer: 'Chaque 7 inverse le sens du jeu, donc deux 7 s\'annulent.' },
    ],
  },
  revolution10: {
    title: '10 Révolution',
    description: 'La carte qui change les règles',
    rules: [
      'Le 10 change toutes les valeurs du jeu',
      'Les cartes faibles deviennent fortes et vice-versa',
      'L\'effet dure jusqu\'au prochain 10',
    ],
    strategies: [
      'Jouez le 10 quand vous avez beaucoup de petites cartes',
      'Attendez le bon moment pour maximiser son effet',
      'Utilisez-le pour contrer les stratégies adverses',
    ],
    faq: [
      { question: 'Les effets spéciaux des cartes sont-ils aussi inversés ?', answer: 'Non, seules les valeurs numériques sont affectées par le 10.' },
    ],
  },
  units: {
    title: 'Les Unités',
    description: 'Les cartes de base du jeu',
    rules: [
      'Les unités vont de 1 à 10',
      'Elles doivent être jouées sur une carte de même couleur ou valeur',
      'Peuvent être combinées en suites ou paires',
    ],
    strategies: [
      'Construisez des suites pour vous débarrasser de plusieurs cartes',
      'Gardez un équilibre entre les couleurs',
      'Utilisez les unités pour préparer vos cartes spéciales',
    ],
    faq: [
      { question: 'Peut-on jouer plusieurs unités à la fois ?', answer: 'Oui, si elles forment une suite ou sont de même valeur.' },
    ],
  },
};

const SectionTitle: React.FC<{ icon: React.ReactNode; title: string; accent: string }> = ({ icon, title, accent }) => (
  <h3 className="cd-section-title" style={{ color: accent }}>
    <span className="cd-section-icon">{icon}</span>
    {title}
  </h3>
);

const CardDetails: React.FC<CardDetailsProps> = ({ cardType, accent, glyph, onBack }) => {
  const data = cardData[cardType];
  if (!data) return null;

  return (
    <div className="cd-wrapper">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="cd-back"
        onClick={onBack}
      >
        <ArrowBack sx={{ fontSize: 18 }} />
        <span>Retour aux règles</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="cd-hero"
        style={{ '--accent': accent } as React.CSSProperties}
      >
        <div className="cd-hero-glow" />
        <span className="cd-glyph">{glyph}</span>
        <div className="cd-hero-content">
          <h1 className="cd-title">{data.title}</h1>
          <p className="cd-desc">{data.description}</p>
        </div>
      </motion.div>

      <div className="cd-grid">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="cd-panel"
        >
          <SectionTitle icon={<MenuBook sx={{ fontSize: 20 }} />} title="Règles" accent={accent} />
          <ul className="cd-list">
            {data.rules.map((rule, i) => (
              <li key={i} className="cd-list-item">
                <span className="cd-bullet" style={{ background: accent }} />
                {rule}
              </li>
            ))}
          </ul>

          <SectionTitle icon={<EmojiObjects sx={{ fontSize: 20 }} />} title="Stratégies" accent={accent} />
          <ul className="cd-list">
            {data.strategies.map((strat, i) => (
              <li key={i} className="cd-list-item">
                <span className="cd-bullet cd-bullet--diamond" style={{ background: accent }} />
                {strat}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="cd-panel cd-panel--faq"
        >
          <SectionTitle icon={<HelpOutline sx={{ fontSize: 20 }} />} title="FAQ" accent={accent} />
          <div className="cd-faq-list">
            {data.faq.map((item, i) => (
              <div key={i} className="cd-faq-item">
                <h4 className="cd-faq-q">{item.question}</h4>
                <p className="cd-faq-a">{item.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .cd-wrapper {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 0 4rem;
        }
        .cd-back {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 1.2rem;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: var(--cine-ink-soft);
          font-family: var(--cine-font-mono);
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cd-back:hover {
          background: rgba(255,255,255,0.08);
          color: var(--cine-ink);
          transform: translateX(-4px);
        }

        .cd-hero {
          position: relative;
          padding: 3rem 2.5rem;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          overflow: hidden;
        }
        .cd-hero-glow {
          position: absolute;
          top: -50%;
          right: -20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
          opacity: 0.15;
          filter: blur(40px);
          pointer-events: none;
        }
        .cd-glyph {
          position: absolute;
          top: 1.5rem;
          right: 2rem;
          font-size: 6rem;
          font-family: 'Times New Roman', serif;
          color: var(--accent);
          opacity: 0.1;
          line-height: 1;
          user-select: none;
        }
        .cd-hero-content {
          position: relative;
          z-index: 1;
        }
        .cd-title {
          font-family: var(--cine-font-display);
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 600;
          margin: 0 0 0.6rem;
          color: var(--cine-ink);
          letter-spacing: 0;
        }
        .cd-desc {
          font-size: 1.1rem;
          color: var(--cine-ink-soft);
          margin: 0;
          max-width: 500px;
        }

        .cd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .cd-grid { grid-template-columns: 1fr; }
        }

        .cd-panel {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2rem;
        }
        .cd-panel--faq {
          background: linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%);
        }

        .cd-section-title {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-family: var(--cine-font-display);
          font-size: 1.1rem;
          font-weight: 500;
          margin: 0 0 1.2rem;
        }
        .cd-section-icon {
          display: inline-flex;
          opacity: 0.8;
        }

        .cd-list {
          list-style: none;
          margin: 0 0 2rem;
          padding: 0;
        }
        .cd-list:last-child { margin-bottom: 0; }
        .cd-list-item {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.9rem;
          color: var(--cine-ink-soft);
          line-height: 1.5;
          font-size: 0.95rem;
        }
        .cd-bullet {
          position: absolute;
          left: 0;
          top: 0.55rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .cd-bullet--diamond {
          border-radius: 2px;
          transform: rotate(45deg);
        }

        .cd-faq-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .cd-faq-item {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .cd-faq-item:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }
        .cd-faq-q {
          font-family: var(--cine-font-display);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--cine-ink);
          margin: 0 0 0.4rem;
        }
        .cd-faq-a {
          font-size: 0.9rem;
          color: var(--cine-ink-soft);
          margin: 0;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default CardDetails;
