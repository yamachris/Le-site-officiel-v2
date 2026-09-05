import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaUsers, FaTrophy } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { buildGamePortalUrl } from '../../config/gamePortal';
import { CinePage, CineContainer, CinePageHeader, CineCard, CineKpiStrip } from '../../components/cine';

const gameScreenshot = '/assets/plateau.png';

const GAME_OPTIONS = [
  { id: 'solo',         title: 'Mode Solo',         description: "Entraînez-vous contre l'IA",          icon: <FaRobot size={32} />,  color: 'var(--cine-success)'  },
  { id: 'multiplayer',  title: 'Mode Multijoueur',  description: "Affrontez d'autres joueurs en ligne", icon: <FaUsers size={32} />,  color: 'var(--cine-accent-2)' },
  { id: 'tournament',   title: 'Mode Tournois',     description: 'Participez à des tournois compétitifs', icon: <FaTrophy size={32} />, color: 'var(--cine-accent-4)' },
];

const PLAY_KPIS = [
  { value: '12s', label: "file d'attente", tone: 'cyan' as const },
  { value: '38', label: 'parties live', tone: 'accent' as const },
  { value: '3', label: 'modes prêts', tone: 'success' as const },
];

const PlayPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const playerNickname = user?.pseudo || user?.email?.split('@')[0] || 'Joueur UNIT';

  const openGamePortal = (gameMode?: string) => {
    if (!isAuthenticated) {
      localStorage.setItem('postLoginRedirect', '/play');
      navigate('/login');
      return;
    }
    const gameUrl = buildGamePortalUrl({
      playerNickname,
      unitUserId: user?.id,
      mode: gameMode,
      returnUrl: `${window.location.origin}/play`,
    });
    window.location.assign(gameUrl);
  };

  return (
    <CinePage>
      <CinePageHeader
        eyebrow="Acte I — La Table"
        title={<>Prêt à <em>jouer ?</em></>}
        lede="Plongez dans l'univers stratégique de UNIT, où chaque carte compte et chaque décision peut faire basculer la partie."
      >
        <button type="button" className="cine-button cine-button--primary" onClick={() => openGamePortal()}>
          {isAuthenticated ? 'Entrer dans le jeu →' : 'Se connecter pour jouer'}
        </button>
        {isAuthenticated && (
          <p className="cine-mono" style={{ marginTop: '1rem', color: 'var(--cine-ink-dim)' }}>
            Connecté · <span style={{ color: 'var(--cine-accent-3)' }}>{playerNickname}</span>
          </p>
        )}
      </CinePageHeader>

      <CineContainer>
        <CineKpiStrip items={PLAY_KPIS} style={{ marginBottom: '2rem' }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="cine-showcase-frame"
          style={{ marginBottom: '5rem' }}
        >
          <img
            src={gameScreenshot}
            alt="Interface de jeu UNIT"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
          <div
            style={{
              position: 'absolute', bottom: 24, left: 24, right: 24,
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              flexWrap: 'wrap', gap: '1rem',
            }}
          >
            <div>
              <div className="cine-mono" style={{ color: 'var(--cine-accent-3)' }}>UNIT v1.0</div>
              <div style={{ fontFamily: 'var(--cine-font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 500, letterSpacing: 0, color: 'var(--cine-ink)', marginTop: '0.4rem' }}>
                Une expérience cinématique
              </div>
            </div>
          </div>
        </motion.div>

        <div className="cine-shell-grid" style={{ marginBottom: '5rem' }}>
          <div className="cine-section-slab">
            <span className="cine-section-eyebrow">L'expérience</span>
            <h2 className="cine-section-title">Pourquoi UNIT ?</h2>
            <ul style={{ marginTop: '1.5rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {[
                'Interface intuitive et moderne',
                'Système de classement compétitif',
                'Matchmaking équilibré',
                'Récompenses quotidiennes',
              ].map((feat) => (
                <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--cine-ink-soft)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cine-accent)' }} />
                  {feat}
                </li>
              ))}
            </ul>
          </div>
          <div className="cine-command-card" style={{ padding: 'clamp(24px, 4vw, 42px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 260 }}>
            <span className="cine-mono" style={{ color: 'var(--cine-accent-3)' }}>Live</span>
            <div style={{ fontFamily: 'var(--cine-font-display)', fontSize: '2.4rem', fontWeight: 600, letterSpacing: 0, marginTop: '0.6rem' }}>
              152 joueurs <em style={{ color: 'var(--cine-ink-soft)', fontWeight: 400 }}>en ligne</em>
            </div>
            <p style={{ color: 'var(--cine-ink-soft)', marginTop: '0.6rem' }}>38 parties en cours · file d'attente moyenne : 12 secondes</p>
            <button type="button" className="cine-button cine-button--primary" onClick={() => openGamePortal()} style={{ marginTop: '1.2rem', alignSelf: 'flex-start' }}>
              Entrer dans l'arène
            </button>
          </div>
        </div>

        <div className="cine-section-slab" style={{ paddingBottom: 'clamp(24px, 4vw, 42px)', marginBottom: '6rem' }}>
          <span className="cine-section-eyebrow">Choisissez votre mode</span>
          <h2 className="cine-section-title">Modes de jeu</h2>
          <div className="cine-grid cine-grid--3" style={{ marginTop: '2rem' }}>
            {GAME_OPTIONS.map((opt, i) => (
              <motion.div
                key={opt.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <CineCard
                  interactive
                  onClick={() => openGamePortal(opt.id)}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  <div style={{ width: 56, height: 56, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--cine-radius-md)', background: `${opt.color}1A`, color: opt.color }}>
                    {opt.icon}
                  </div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--cine-font-display)', fontSize: '1.4rem', fontWeight: 500, letterSpacing: 0, color: 'var(--cine-ink)' }}>
                    {opt.title}
                  </h3>
                  <p style={{ color: 'var(--cine-ink-soft)', margin: 0, lineHeight: 1.5 }}>{opt.description}</p>
                  <span className="cine-mono" style={{ marginTop: 'auto', color: 'var(--cine-accent-2)' }}>Lancer →</span>
                </CineCard>
              </motion.div>
            ))}
          </div>
        </div>
      </CineContainer>
    </CinePage>
  );
};

export default PlayPage;
