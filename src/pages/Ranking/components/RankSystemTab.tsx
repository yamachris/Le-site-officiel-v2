import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* =========================================================================
   Données — Système de rangs UNIT (basé sur deep-research-report)
   ========================================================================= */

const RANKS = [
  {
    id: 'D',
    label: 'D',
    fullName: 'Débutant',
    range: '1000 – 1399',
    min: 1000, max: 1399,
    color: '#8ca0b8',
    glow: 'rgba(140, 160, 184, 0.35)',
    population: 22,
    kfactor: 32,
    decay: null,
    shield: 3,
    desc: "Espace d'apprentissage. Forte variance tolérée. Aucun decay. Idéal pour découvrir le jeu en conditions compétitives.",
    rewardSeason: 'Sleeve commune + badge saisonnier',
    rewardUnlock: 'Icône de rang de base',
  },
  {
    id: 'C',
    label: 'C',
    fullName: 'Intermédiaire',
    range: '1400 – 1799',
    min: 1400, max: 1799,
    color: '#5a9fd4',
    glow: 'rgba(90, 159, 212, 0.35)',
    population: 30,
    kfactor: 32,
    decay: null,
    shield: 3,
    desc: "Socle du ladder. Compréhension correcte du jeu. Représente le plus grand segment de joueurs actifs.",
    rewardSeason: 'Sleeve rare + bannière profil',
    rewardUnlock: 'Bordure de profil',
  },
  {
    id: 'B',
    label: 'B',
    fullName: 'Avancé',
    range: '1800 – 2199',
    min: 1800, max: 2199,
    color: '#4caf82',
    glow: 'rgba(76, 175, 130, 0.35)',
    population: 24,
    kfactor: 32,
    decay: null,
    shield: 3,
    desc: "Cœur compétitif. Joueurs réguliers avec maîtrise solide des mécaniques fondamentales.",
    rewardSeason: 'Dos de carte animé + titre',
    rewardUnlock: 'Dos de carte exclusif',
  },
  {
    id: 'A',
    label: 'A',
    fullName: 'Expert',
    range: '2200 – 2599',
    min: 2200, max: 2599,
    color: '#d4aa60',
    glow: 'rgba(212, 170, 96, 0.35)',
    population: 15,
    kfactor: 24,
    decay: null,
    shield: 3,
    desc: "Maîtrise solide. Début de spécialisation. Top 15% de la communauté. MMR public visible.",
    rewardSeason: 'Plateau visuel ou effet cosmétique',
    rewardUnlock: 'Avatar animé',
  },
  {
    id: 'S',
    label: 'S',
    fullName: 'Élite',
    range: '2600 – 2899',
    min: 2600, max: 2899,
    color: '#c070d8',
    glow: 'rgba(192, 112, 216, 0.35)',
    population: 7.5,
    kfactor: 24,
    decay: "–25 MMR/sem après 21 jours d'inactivité",
    shield: 3,
    desc: "Haut niveau. Intégrité prioritaire. Pseudo masqué en file. Top 7.5% seulement.",
    rewardSeason: 'Variante visuelle de plateau + titre élite',
    rewardUnlock: 'Bordure premium + bannière de deck',
  },
  {
    id: 'SS',
    label: 'SS',
    fullName: 'Maître',
    range: '2900 – 3199',
    min: 2900, max: 3199,
    color: '#e87840',
    glow: 'rgba(232, 120, 64, 0.35)',
    population: 1.4,
    kfactor: 16,
    decay: "–35 MMR/sem après 14 jours",
    shield: 3,
    desc: "Élites visibles. Forte stabilité demandée. Activité requise. Leaderboard public.",
    rewardSeason: 'Sleeve animée unique + badge leaderboard',
    rewardUnlock: "Titre exclusif + aura de profil",
  },
  {
    id: 'SSS',
    label: 'SSS',
    fullName: 'Légendaire',
    range: '3200+',
    min: 3200, max: 4000,
    color: '#e84060',
    glow: 'rgba(232, 64, 96, 0.5)',
    population: 0.1,
    kfactor: 16,
    decay: "–50 MMR/sem après 7 jours",
    shield: 3,
    desc: "Sommet du ladder. Rareté assumée. Top 0.1%. Revue qualité manuelle hebdomadaire.",
    rewardSeason: 'Skin cosmétique signature + trophée profil',
    rewardUnlock: 'Titre légendaire + Hall of Fame',
  },
];

const PLACEMENT_STEPS = [
  { step: 1, label: 'Seed initial', desc: "Départ à 1500 MMR (ou calibré sur votre MMR normal si disponible)", k: '—' },
  { step: 2, label: 'Matchs 1 – 5', desc: 'K-factor à 60 : mobilité maximale. Vous convergez vite vers votre vrai niveau.', k: '60' },
  { step: 3, label: 'Matchs 6 – 10', desc: "K-factor à 40 : affinage. L'incertitude diminue à chaque partie.", k: '40' },
  { step: 4, label: 'Rang révélé', desc: "Après 10 matchs, votre rang est assigné. Bouclier de protection : 3 matchs.", k: '32' },
];

const MATCHMAKING_WINDOWS = [
  { segment: 'D – B', t0: '±75', t30: '±125', t90: '±175', t180: '±225' },
  { segment: 'A – S', t0: '±60', t30: '±100', t90: '±150', t180: '±200' },
  { segment: 'SS – SSS', t0: '±40', t30: '±80', t90: '±120', t180: '±180' },
];

const PROGRESSION_RULES = [
  { icon: '⚡', title: 'Promotion immédiate', desc: "Dès que votre MMR franchit le seuil, vous montez automatiquement — pas de série de promotion." },
  { icon: '🛡️', title: 'Bouclier de rang', desc: "3 matchs de protection après chaque promotion. Impossible de redescendre immédiatement." },
  { icon: '📉', title: 'Relégation tamponnée', desc: "Vous redescendez uniquement si votre MMR passe 30 points sous le seuil du rang précédent." },
  { icon: '🕐', title: 'Decay élite', desc: "S, SS et SSS : inactivité trop longue = perte de MMR par semaine. Le sommet se mérite activement." },
];

/* =========================================================================
   Sous-composants
   ========================================================================= */

const vp = { once: true, margin: '-8%' };
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

/* — Pyramide des rangs — */
const RankPyramid: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const reversed = [...RANKS].reverse(); // SSS en haut

  return (
    <div style={{ width: '100%' }}>
      {reversed.map((rank, i) => {
        const widthPct = 32 + (reversed.length - i - 1) * 10; // SSS=32%, D=92%
        const isHovered = hovered === rank.id;
        return (
          <motion.div
            key={rank.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.45rem', cursor: 'pointer' }}
            onMouseEnter={() => setHovered(rank.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Barre */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: 0 }}>
              <motion.div
                animate={{
                  width: isHovered ? `${Math.min(widthPct + 4, 100)}%` : `${widthPct}%`,
                  boxShadow: isHovered ? `0 0 24px ${rank.glow}` : 'none',
                }}
                transition={{ duration: 0.25 }}
                style={{
                  height: 44,
                  borderRadius: '8px 0 0 8px',
                  background: isHovered
                    ? `linear-gradient(90deg, ${rank.color}cc, ${rank.color})`
                    : `linear-gradient(90deg, ${rank.color}55, ${rank.color}99)`,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '1rem',
                  gap: '0.8rem',
                  overflow: 'hidden',
                  transition: 'background 220ms',
                  border: `1px solid ${rank.color}60`,
                  marginLeft: 'auto',
                }}
              >
                <span style={{ fontFamily: 'var(--cine-font-display)', fontWeight: 700, fontSize: rank.id.length > 1 ? '0.9rem' : '1rem', color: '#fff', flexShrink: 0 }}>
                  {rank.label}
                </span>
                <span style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {rank.range}
                </span>
              </motion.div>
            </div>

            {/* Stat population */}
            <div style={{ width: 54, flexShrink: 0, textAlign: 'right' }}>
              <span style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.7rem', color: isHovered ? rank.color : 'var(--cine-ink-dim)', transition: 'color 200ms' }}>
                {rank.population}%
              </span>
            </div>
          </motion.div>
        );
      })}

      {/* Détail du rang survolé */}
      <AnimatePresence mode="wait">
        {hovered && (() => {
          const r = RANKS.find((rk) => rk.id === hovered)!;
          return (
            <motion.div
              key={hovered}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              style={{
                marginTop: '1rem',
                padding: '1.2rem 1.4rem',
                border: `1px solid ${r.color}50`,
                borderLeft: `3px solid ${r.color}`,
                borderRadius: 10,
                background: `${r.color}0d`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span style={{ fontFamily: 'var(--cine-font-display)', fontWeight: 700, fontSize: '1rem', color: r.color }}>
                  {r.label} — {r.fullName}
                </span>
                <span style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.7rem', color: 'var(--cine-ink-dim)', letterSpacing: '0.14em' }}>
                  {r.range} MMR · K={r.kfactor}
                </span>
              </div>
              <p style={{ color: 'var(--cine-ink-soft)', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 0.6rem' }}>{r.desc}</p>
              {r.decay && (
                <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', color: '#e87840', letterSpacing: '0.1em' }}>
                  ⏱ {r.decay}
                </div>
              )}
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <p style={{ color: 'var(--cine-ink-dim)', fontSize: '0.78rem', marginTop: '1rem', fontStyle: 'italic' }}>
        Survolez un rang pour voir le détail. Largeur proportionnelle à la population cible.
      </p>
    </div>
  );
};

/* — Distribution bar chart animée — */
const DistributionChart: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const maxPop = 30; // C = 30%

  return (
    <div ref={ref}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.6rem', height: 140, padding: '0 0.5rem' }}>
        {RANKS.map((rank, i) => {
          const height = (rank.population / maxPop) * 120;
          return (
            <div key={rank.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.62rem', color: rank.color }}>
                {rank.population}%
              </span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: inView ? height : 0 }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  background: `linear-gradient(180deg, ${rank.color}, ${rank.color}70)`,
                  borderRadius: '4px 4px 0 0',
                  boxShadow: `0 0 12px ${rank.glow}`,
                }}
              />
              <span style={{ fontFamily: 'var(--cine-font-display)', fontWeight: 700, fontSize: rank.id.length > 1 ? '0.72rem' : '0.82rem', color: rank.color }}>
                {rank.label}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '0.3rem' }} />
    </div>
  );
};

/* — Étapes de placement — */
const PlacementStepper: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    {PLACEMENT_STEPS.map((step, i) => (
      <motion.div
        key={step.step}
        initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}
        transition={{ duration: 0.45, delay: i * 0.08 }}
        style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
      >
        {/* Ligne + cercle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            border: '2px solid var(--cine-accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--cine-font-mono)', fontSize: '0.75rem', fontWeight: 700,
            color: 'var(--cine-accent)', background: 'rgba(255,61,110,0.08)',
          }}>
            {step.step}
          </div>
          {i < PLACEMENT_STEPS.length - 1 && (
            <div style={{ width: 1, height: 28, background: 'rgba(255,61,110,0.25)', marginTop: '0.3rem' }} />
          )}
        </div>
        <div style={{ paddingTop: '0.3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
            <span style={{ fontFamily: 'var(--cine-font-display)', fontWeight: 600, fontSize: '0.92rem', color: 'var(--cine-ink)' }}>{step.label}</span>
            {step.k !== '—' && (
              <span style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: 999, border: '1px solid rgba(255,61,110,0.35)', color: 'var(--cine-accent)' }}>
                K = {step.k}
              </span>
            )}
          </div>
          <p style={{ color: 'var(--cine-ink-soft)', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>{step.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

/* — Tableau matchmaking — */
const MatchmakingTable: React.FC = () => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--cine-font-mono)', fontSize: '0.8rem' }}>
      <thead>
        <tr>
          {['Segment', '0–30s', '30–90s', '90–180s', '180s+'].map((h) => (
            <th key={h} style={{ padding: '0.6rem 0.8rem', textAlign: 'left', color: 'var(--cine-ink-dim)', letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.68rem', borderBottom: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {MATCHMAKING_WINDOWS.map((row, i) => (
          <motion.tr key={row.segment} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp} transition={{ delay: i * 0.1 }}>
            <td style={{ padding: '0.7rem 0.8rem', color: 'var(--cine-ink)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>{row.segment}</td>
            {[row.t0, row.t30, row.t90, row.t180].map((val, j) => (
              <td key={j} style={{ padding: '0.7rem 0.8rem', color: 'var(--cine-ink-soft)', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>{val}</td>
            ))}
          </motion.tr>
        ))}
      </tbody>
    </table>
    <p style={{ color: 'var(--cine-ink-dim)', fontSize: '0.75rem', marginTop: '0.8rem', fontStyle: 'italic' }}>
      Fenêtres de MMR autour duquel le matchmaking cherche un adversaire, selon le temps d'attente.
    </p>
  </div>
);

/* — Grille récompenses — */
const RewardsGrid: React.FC = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.9rem' }}>
    {RANKS.map((rank, i) => (
      <motion.div key={rank.id} initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} transition={{ duration: 0.45, delay: i * 0.06 }}>
        <div style={{
          border: `1px solid ${rank.color}35`,
          borderTop: `2px solid ${rank.color}`,
          borderRadius: 10,
          padding: '1.1rem',
          background: `${rank.color}08`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.7rem' }}>
            <span style={{ fontFamily: 'var(--cine-font-display)', fontWeight: 700, fontSize: '1.1rem', color: rank.color }}>{rank.label}</span>
            <span style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', color: 'var(--cine-ink-dim)' }}>{rank.fullName}</span>
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '0.25rem' }}>Atteinte</div>
            <div style={{ color: 'var(--cine-ink-soft)', fontSize: '0.82rem', lineHeight: 1.45 }}>{rank.rewardUnlock}</div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '0.25rem' }}>Fin de saison</div>
            <div style={{ color: 'var(--cine-ink-soft)', fontSize: '0.82rem', lineHeight: 1.45 }}>{rank.rewardSeason}</div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

/* =========================================================================
   Composant principal
   ========================================================================= */

const RankSystemTab: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('ranks');

  const NAV = [
    { id: 'ranks', label: 'Les Rangs' },
    { id: 'progression', label: 'Progression' },
    { id: 'placement', label: 'Placement' },
    { id: 'matchmaking', label: 'Matchmaking' },
    { id: 'rewards', label: 'Récompenses' },
  ];

  return (
    <div style={{ paddingBottom: '4rem' }}>

      {/* ── Hero résumé ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} transition={{ duration: 0.6 }}>
        <div style={{ padding: '2.5rem', marginBottom: '2.5rem', borderRadius: 16, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '0.8rem' }}>
            Architecture du système
          </div>
          <h2 style={{ fontFamily: 'var(--cine-font-display)', fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 500, color: 'var(--cine-ink)', margin: '0 0 1rem', lineHeight: 1.2 }}>
            MMR caché · Rangs visibles <em style={{ color: 'var(--cine-ink-soft)', fontWeight: 400 }}>D → SSS</em>
          </h2>
          <p style={{ color: 'var(--cine-ink-soft)', fontSize: '0.95rem', lineHeight: 1.65, maxWidth: 680, margin: '0 0 1.5rem' }}>
            UNIT combine un <strong style={{ color: 'var(--cine-ink)' }}>MMR interne</strong> (calcul Elo précis) avec des <strong style={{ color: 'var(--cine-ink)' }}>rangs visibles stables</strong>. Vous voyez votre rang, le système travaille sur votre MMR exact. Départ à 1500 · 10 matchs de placement · 7 paliers de prestige.
          </p>
          {/* Pills résumé */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {[
              { label: 'Seed 1500', color: '#5a9fd4' },
              { label: '10 matchs placement', color: '#4caf82' },
              { label: 'Promotion immédiate', color: '#d4aa60' },
              { label: 'Bouclier 3 matchs', color: '#c070d8' },
              { label: 'Decay S→SSS', color: '#e87840' },
              { label: 'Saisons 12 semaines', color: '#e84060' },
            ].map((p) => (
              <span key={p.label} style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.69rem', letterSpacing: '0.1em', padding: '0.28rem 0.75rem', borderRadius: 999, border: `1px solid ${p.color}50`, color: p.color, background: `${p.color}0f` }}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Navigation interne ── */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', padding: '0.4rem', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
        {NAV.map((nav) => (
          <button
            key={nav.id}
            onClick={() => setActiveSection(nav.id)}
            style={{
              fontFamily: 'var(--cine-font-mono)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '0.45rem 0.9rem', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: activeSection === nav.id ? 'var(--cine-accent)' : 'transparent',
              color: activeSection === nav.id ? '#fff' : 'var(--cine-ink-dim)',
              transition: 'background 200ms, color 200ms',
            }}
          >
            {nav.label}
          </button>
        ))}
      </div>

      {/* ── Contenu par section ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >

          {/* LES RANGS */}
          {activeSection === 'ranks' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '1.2rem' }}>
                  Pyramide des rangs
                </div>
                <RankPyramid />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '1.2rem' }}>
                  Distribution cible des joueurs
                </div>
                <DistributionChart />
                <div style={{ marginTop: '1.8rem' }}>
                  <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '1rem' }}>
                    K-factor par rang
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {[
                      { label: 'D – B', value: 32, note: 'Progression active' },
                      { label: 'A – S', value: 24, note: 'Stabilisation' },
                      { label: 'SS – SSS', value: 16, note: 'Précision maximale' },
                    ].map((row) => (
                      <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <span style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.75rem', color: 'var(--cine-ink)', width: 48, flexShrink: 0 }}>{row.label}</span>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(row.value / 60) * 100}%` }}
                          viewport={vp}
                          transition={{ duration: 0.6 }}
                          style={{ height: 6, background: 'var(--cine-accent)', borderRadius: 3, maxWidth: 140 }}
                        />
                        <span style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.7rem', color: 'var(--cine-accent)', fontWeight: 600 }}>K={row.value}</span>
                        <span style={{ color: 'var(--cine-ink-dim)', fontSize: '0.75rem' }}>{row.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROGRESSION */}
          {activeSection === 'progression' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '1.2rem' }}>
                  Règles de progression
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {PROGRESSION_RULES.map((rule, i) => (
                    <motion.div key={rule.title} initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} transition={{ delay: i * 0.08 }}>
                      <div style={{ padding: '1.2rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, background: 'rgba(255,255,255,0.02)', display: 'flex', gap: '0.9rem' }}>
                        <span style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: '0.1rem' }}>{rule.icon}</span>
                        <div>
                          <div style={{ fontFamily: 'var(--cine-font-display)', fontWeight: 600, fontSize: '0.92rem', color: 'var(--cine-ink)', marginBottom: '0.3rem' }}>{rule.title}</div>
                          <p style={{ color: 'var(--cine-ink-soft)', fontSize: '0.85rem', lineHeight: 1.55, margin: 0 }}>{rule.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '1.2rem' }}>
                  Decay par rang
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {RANKS.map((rank) => (
                    <div key={rank.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.7rem 0.9rem', borderRadius: 8, background: rank.decay ? `${rank.color}0d` : 'rgba(255,255,255,0.015)', border: `1px solid ${rank.decay ? rank.color + '35' : 'rgba(255,255,255,0.05)'}` }}>
                      <span style={{ fontFamily: 'var(--cine-font-display)', fontWeight: 700, fontSize: '0.92rem', color: rank.color, width: 32, flexShrink: 0 }}>{rank.label}</span>
                      <span style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.75rem', color: rank.decay ? rank.color : 'var(--cine-ink-dim)' }}>
                        {rank.decay ?? '— Aucun decay'}
                      </span>
                    </div>
                  ))}
                </div>
                <p style={{ color: 'var(--cine-ink-dim)', fontSize: '0.78rem', marginTop: '1rem', fontStyle: 'italic' }}>
                  Le decay ne punit pas la majorité — il protège le sommet.
                </p>
              </div>
            </div>
          )}

          {/* PLACEMENT */}
          {activeSection === 'placement' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '1.2rem' }}>
                  Onboarding — 10 matchs de classement
                </div>
                <PlacementStepper />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '1.2rem' }}>
                  Règles clés du placement
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {[
                    { q: "Le rang est-il visible pendant les 10 matchs ?", a: "Non. Le rang n'est révélé qu'après votre 10e match de classement." },
                    { q: "Que se passe-t-il si j'ai déjà joué ?", a: "Si un MMR normal existe, le seed est calibré dessus — entre 1300 et 1700 selon vos perfs." },
                    { q: "Le placement peut-il me placer très haut ?", a: "Oui. Un joueur très dominant peut atteindre directement le rang A ou S à l'issue des 10 matchs." },
                    { q: "Bouclier après placement ?", a: "3 matchs de protection contre la relégation dès l'assignation de votre rang initial." },
                  ].map((item, i) => (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} transition={{ delay: i * 0.07 }}>
                      <div style={{ padding: '1rem 1.1rem', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 9, background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ fontFamily: 'var(--cine-font-display)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--cine-ink)', marginBottom: '0.3rem' }}>{item.q}</div>
                        <p style={{ color: 'var(--cine-ink-soft)', fontSize: '0.83rem', lineHeight: 1.55, margin: 0 }}>{item.a}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MATCHMAKING */}
          {activeSection === 'matchmaking' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '1.2rem' }}>
                  Fenêtres de MMR par palier et temps d'attente
                </div>
                <MatchmakingTable />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
                {[
                  { icon: '🎭', title: 'Pseudo masqué', desc: "En rang S et au-dessus, votre pseudo est masqué en file pour éviter le queue sniping." },
                  { icon: '🔄', title: 'Protection rematch', desc: "Pas plus de 2 parties contre le même adversaire en 60 minutes (si le pool > 20 joueurs)." },
                  { icon: '🏆', title: 'Tournois séparés', desc: "Les tournois n'impactent pas votre MMR principal. Classement de tournoi indépendant." },
                  { icon: '📊', title: 'Revue élite', desc: "Revue qualité manuelle hebdomadaire des logs SS/SSS pour détecter les comportements suspects." },
                ].map((item, i) => (
                  <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} transition={{ delay: i * 0.07 }}>
                    <div style={{ padding: '1.2rem', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, background: 'rgba(255,255,255,0.02)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                        <span style={{ fontFamily: 'var(--cine-font-display)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--cine-ink)' }}>{item.title}</span>
                      </div>
                      <p style={{ color: 'var(--cine-ink-soft)', fontSize: '0.84rem', lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* RÉCOMPENSES */}
          {activeSection === 'rewards' && (
            <div>
              <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '1.2rem' }}>
                Récompenses par rang — Atteinte & fin de saison
              </div>
              <RewardsGrid />
              <div style={{ marginTop: '2rem', padding: '1.2rem 1.4rem', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--cine-ink-dim)', marginBottom: '0.6rem' }}>
                  Conditions d'éligibilité — Saison
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                  {[
                    { label: 'Victoires minimum', val: '25' },
                    { label: 'Fair-play requis', val: 'Score sain' },
                    { label: 'Durée saison', val: '12 semaines' },
                    { label: 'Rang pris en compte', val: 'Rang final (pas peak)' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.65rem', color: 'var(--cine-ink-dim)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{item.label}</div>
                      <div style={{ fontFamily: 'var(--cine-font-display)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--cine-ink)' }}>{item.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RankSystemTab;
