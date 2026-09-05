import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaChartLine, FaMedal } from 'react-icons/fa';
import RankingTable from './components/RankingTable';
import ProgressGraph from './components/ProgressGraph';
import RewardsSection from './components/RewardsSection';
import RankSystemTab from './components/RankSystemTab';
import {
  CinePage,
  CineContainer,
  CinePageHeader,
  CineCard,
  CineKpiStrip,
  CineTabs,
} from '../../components/cine';

const RANKING_KPIS = [
  { value: '2 847', label: 'meilleur MMR', tone: 'gold' as const },
  { value: '96', label: 'pays actifs', tone: 'cyan' as const },
  { value: '+24', label: 'plus forte montée', tone: 'accent' as const },
];

const TABS: { id: 'ladder' | 'system'; label: string; icon: React.ReactNode }[] = [
  { id: 'ladder', label: 'Classement', icon: <FaTrophy aria-hidden /> },
  { id: 'system', label: 'Système de rangs', icon: <FaMedal aria-hidden /> },
];

const RankingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ladder' | 'system'>('ladder');

  return (
    <CinePage>
      <CinePageHeader
        eyebrow="Acte III — L'Arène"
        title={<>Gravissez <em>les échelons.</em></>}
        lede="Mesurez-vous à la communauté internationale avec un système MMR dynamique inspiré de l'Elo. Rangs D à SSS, placements, récompenses saisonnières."
      >
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <button type="button" className="cine-button cine-button--primary">
            <FaTrophy aria-hidden /> Rejoindre le classement
          </button>
          <button type="button" className="cine-button cine-button--ghost">
            <FaChartLine aria-hidden /> Défier un adversaire
          </button>
        </div>
      </CinePageHeader>

      <CineContainer>
        <CineKpiStrip items={RANKING_KPIS} style={{ marginBottom: '2rem' }} />

        <CineCard
          style={{
            marginBottom: '2.5rem',
            padding: 'clamp(18px, 3vw, 28px)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) auto',
              gap: '1.5rem',
              alignItems: 'end',
              marginBottom: '1.4rem',
            }}
            className="cine-ranking-command"
          >
            <div>
              <span className="cine-mono" style={{ color: 'var(--cine-accent-2)' }}>Ladder live</span>
              <h2 className="cine-section-title" style={{ marginTop: '0.5rem' }}>
                Centre de compétition
              </h2>
              <p style={{ color: 'var(--cine-ink-soft)', lineHeight: 1.55, maxWidth: 680, margin: '0.7rem 0 0' }}>
                Suivez le classement mondial, basculez vers le système de rangs, puis lancez un défi sans changer d'univers.
              </p>
            </div>
            <div className="cine-mono" style={{ color: 'var(--cine-accent-3)' }}>
              Saison 01 · actif
            </div>
          </div>
          <CineTabs
            items={TABS}
            active={activeTab}
            onChange={setActiveTab}
            ariaLabel="Sections du classement"
          />
        </CineCard>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {activeTab === 'ladder' && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gap: '2rem',
                  paddingBottom: '6rem',
                }}
                className="cine-ranking-grid"
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
                  <RankingTable />
                  <ProgressGraph />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
                  <RewardsSection />
                </div>
              </div>
            )}

            {activeTab === 'system' && <RankSystemTab />}
          </motion.div>
        </AnimatePresence>

        {/* Liens rapides — uniquement sur l'onglet ladder */}
        {activeTab === 'ladder' && (
          <div
            style={{
              marginTop: '1rem',
              paddingTop: '2.5rem',
              paddingBottom: '4rem',
              borderTop: '1px solid var(--cine-line)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
            }}
          >
            <div>
              <span className="cine-mono">Liens rapides</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.8rem' }}>
                <button
                  type="button"
                  onClick={() => setActiveTab('system')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--cine-ink-soft)', textDecoration: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontSize: 'inherit' }}
                >
                  Découvrir le système de rangs
                </button>
                <a href="#tournois" style={{ color: 'var(--cine-ink-soft)', textDecoration: 'none' }}>Règles des tournois</a>
                <a href="#discord" style={{ color: 'var(--cine-ink-soft)', textDecoration: 'none' }}>Rejoindre Discord</a>
              </div>
            </div>
            <div>
              <span className="cine-mono">Raccourcis</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.8rem' }}>
                <a href="#region" style={{ color: 'var(--cine-ink-soft)', textDecoration: 'none' }}>Classement régional</a>
                <a href="#history" style={{ color: 'var(--cine-ink-soft)', textDecoration: 'none' }}>Historique tournois</a>
              </div>
            </div>
          </div>
        )}
      </CineContainer>

      <style>{`
        @media (max-width: 900px) {
          .cine-ranking-grid { grid-template-columns: 1fr !important; }
          .cine-ranking-command { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </CinePage>
  );
};

export default RankingPage;
