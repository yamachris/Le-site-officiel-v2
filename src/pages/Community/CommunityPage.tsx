import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaDiscord, FaTwitch, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import CommunityStats from './components/CommunityStats';
import LeaderBoard from './components/LeaderBoard';
import CommunityWall from './components/CommunityWall';
import TournamentSection from './components/TournamentSection';
import { CinePage, CineContainer, CinePageHeader, CineCard, CineKpiStrip } from '../../components/cine';

const SOCIAL = [
  { icon: <FaDiscord size={20} />, name: 'Discord',   url: '#' },
  { icon: <FaTwitch size={20} />,  name: 'Twitch',    url: '#' },
  { icon: <FaYoutube size={20} />, name: 'YouTube',   url: '#' },
  { icon: <FaInstagram size={20} />, name: 'Instagram', url: '#' },
  { icon: <FaTiktok size={20} />,  name: 'TikTok',    url: '#' },
];

const COMMUNITY_KPIS = [
  { value: '152', label: 'joueurs en ligne', tone: 'accent' as const },
  { value: '18', label: 'tournois actifs', tone: 'gold' as const },
  { value: '4.8k', label: 'messages forum', tone: 'cyan' as const },
];

const CommunityPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CinePage>
      <CinePageHeader
        eyebrow="Acte IV — La Communauté"
        title={<>Vous n'êtes <em>pas seul.</em></>}
        lede="Connectez-vous avec d'autres joueurs passionnés et participez à l'évolution de UNIT."
      >
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <a href="#discord" className="cine-button cine-button--primary">
            <FaDiscord /> Rejoindre Discord
          </a>
          <button type="button" className="cine-button cine-button--ghost" onClick={() => navigate('/community/forum')}>
            Accéder au Forum
          </button>
        </div>
      </CinePageHeader>

      <CineContainer>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <CineKpiStrip items={COMMUNITY_KPIS} style={{ marginBottom: '2rem' }} />

          <div className="cine-command-card" style={{ padding: 'clamp(22px, 4vw, 38px)', marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: '1.5rem', alignItems: 'center' }} className="cine-community-command">
              <div>
                <span className="cine-mono" style={{ color: 'var(--cine-accent-2)' }}>Forum live</span>
                <h2 className="cine-section-title" style={{ marginTop: '0.5rem' }}>Quartier général communautaire</h2>
                <p style={{ color: 'var(--cine-ink-soft)', lineHeight: 1.5, margin: '0.5rem 0 0', maxWidth: 720 }}>
                  Stratégies, annonces de tournois, recherche d'adversaires et créations de joueurs réunies dans un hub unique.
                </p>
              </div>
              <button type="button" className="cine-button cine-button--primary" onClick={() => navigate('/community/forum')}>
                Ouvrir le forum
              </button>
            </div>
          </div>

          <CommunityStats />

          <div
            className="cine-community-grid"
            style={{
              marginTop: '3rem',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '2rem',
              paddingBottom: '6rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
              <LeaderBoard />
              <CommunityWall />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
              <TournamentSection />

              <CineCard variant="accent">
                <span className="cine-mono">Suivez-nous</span>
                <div
                  style={{
                    marginTop: '1rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                    gap: '0.6rem',
                  }}
                >
                  {SOCIAL.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.8rem',
                        border: '1px solid var(--cine-line)',
                        borderRadius: 'var(--cine-radius-md)',
                        color: 'var(--cine-ink-soft)',
                        textDecoration: 'none',
                        fontFamily: 'var(--cine-font-mono)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        transition: 'color var(--cine-transition), border-color var(--cine-transition)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--cine-ink)';
                        e.currentTarget.style.borderColor = 'var(--cine-line-hi)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--cine-ink-soft)';
                        e.currentTarget.style.borderColor = 'var(--cine-line)';
                      }}
                    >
                      {s.icon}
                      {s.name}
                    </a>
                  ))}
                </div>
              </CineCard>
            </div>
          </div>
        </motion.div>

        <style>{`
          @media (max-width: 900px) {
            .cine-community-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </CineContainer>
    </CinePage>
  );
};

export default CommunityPage;
