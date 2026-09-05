import React, { useState } from 'react';
import {
  Edit as EditIcon,
  Star as StarIcon,
  Lock as LockIcon,
  PhotoCamera as CameraIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend,
} from 'chart.js';
import { CinePage, CineContainer, CineCard, CineBadge } from '../../components/cine';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PlayerStats {
  elo: number;
  rank: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
}

const mockPlayerStats: PlayerStats = {
  elo: 2350,
  rank: 'A',
  gamesPlayed: 456,
  wins: 278,
  losses: 178,
  winRate: 61,
};

const mockEloHistory = [
  { date: '2024-01-01', elo: 2200 },
  { date: '2024-01-08', elo: 2250 },
  { date: '2024-01-15', elo: 2280 },
  { date: '2024-01-22', elo: 2320 },
  { date: '2024-01-29', elo: 2350 },
];

const RANK_COLOR: Record<string, string> = {
  SSS: 'var(--cine-accent-3)',
  SS:  'var(--cine-ink-soft)',
  S:   'var(--cine-warning)',
  A:   'var(--cine-accent)',
  B:   'var(--cine-accent-2)',
  C:   'var(--cine-success)',
  D:   'var(--cine-ink-dim)',
};

const eloChartData = {
  labels: mockEloHistory.map((e) => e.date.slice(5)),
  datasets: [{
    label: 'ELO',
    data: mockEloHistory.map((e) => e.elo),
    borderColor: '#ff3d6e',
    backgroundColor: 'rgba(255, 61, 110, 0.12)',
    tension: 0.3,
    pointBackgroundColor: '#ff3d6e',
    pointBorderColor: '#fff',
  }],
};

const eloChartOptions = {
  responsive: true,
  plugins: { legend: { display: false }, title: { display: false } },
  scales: {
    y: {
      min: 1800, max: 2600,
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: '#7a7a85', font: { family: 'JetBrains Mono, monospace', size: 10 } },
    },
    x: {
      grid: { color: 'rgba(255,255,255,0.05)' },
      ticks: { color: '#7a7a85', font: { family: 'JetBrains Mono, monospace', size: 10 } },
    },
  },
};

const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div
    role="dialog" aria-modal="true"
    style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(2,2,3,0.78)', backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem',
    }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    <div style={{
      width: '100%', maxWidth: 480, maxHeight: '90vh', overflow: 'auto',
      background: 'var(--cine-bg-soft)', border: '1px solid var(--cine-line)',
      borderRadius: 'var(--cine-radius-lg)', padding: '2rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--cine-font-display)', fontSize: '1.4rem', fontWeight: 500, letterSpacing: 0 }}>{title}</h2>
        <button type="button" onClick={onClose} className="cine-button cine-button--ghost cine-button--mono" style={{ padding: '0.5rem 0.9rem' }}>✕</button>
      </div>
      {children}
    </div>
  </div>
);

const PlayerProfile: React.FC = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [username, setUsername] = useState('PlayerOne');
  const [avatarUrl, setAvatarUrl] = useState('/default-avatar.png');

  const getNextRankProgress = () => {
    const elo = mockPlayerStats.elo;
    if (elo < 1400) return { progress: (elo - 1000) / 4, nextRank: 'C' };
    if (elo < 1800) return { progress: (elo - 1400) / 4, nextRank: 'B' };
    if (elo < 2200) return { progress: (elo - 1800) / 4, nextRank: 'A' };
    if (elo < 2600) return { progress: (elo - 2200) / 4, nextRank: 'S' };
    if (elo < 2900) return { progress: (elo - 2600) / 3, nextRank: 'SS' };
    return { progress: (elo - 2900) / 3, nextRank: 'SSS' };
  };

  const { progress, nextRank } = getNextRankProgress();
  const rankColor = RANK_COLOR[mockPlayerStats.rank] || 'var(--cine-ink-soft)';

  return (
    <CinePage>
      <CineContainer>
        <div style={{ paddingTop: 'clamp(48px, 8vh, 96px)', paddingBottom: '6rem' }}>
          {/* En-tête */}
          <CineCard style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '1.5rem', alignItems: 'center', padding: '2rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 120, height: 120, borderRadius: '50%',
                background: `url(${avatarUrl}) center/cover, linear-gradient(135deg, var(--cine-accent), var(--cine-accent-3))`,
                border: '2px solid var(--cine-line-hi)',
              }} />
              <button type="button" aria-label="Changer la photo"
                style={{
                  position: 'absolute', bottom: -4, right: -4, width: 36, height: 36,
                  borderRadius: '50%', background: 'var(--cine-accent)', color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--cine-bg)', cursor: 'pointer',
                }}
              >
                <CameraIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                <h1 style={{ margin: 0, fontFamily: 'var(--cine-font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 500, letterSpacing: 0 }}>
                  {username}
                </h1>
                <button type="button" onClick={() => setOpenEdit(true)} className="cine-button cine-button--ghost cine-button--mono" style={{ padding: '0.4rem 0.8rem' }}>
                  <EditIcon sx={{ fontSize: 14 }} /> Éditer
                </button>
                <span className="cine-badge" style={{ borderColor: `${rankColor}66`, color: rankColor }}>
                  Rang {mockPlayerStats.rank}
                </span>
              </div>
              <div className="cine-mono" style={{ marginTop: '0.6rem' }}>
                Score ELO : <span style={{ color: 'var(--cine-ink)' }}>{mockPlayerStats.elo}</span>
              </div>
              <div style={{ marginTop: '1.2rem' }}>
                <div className="cine-mono" style={{ marginBottom: '0.4rem' }}>Progression vers {nextRank}</div>
                <div style={{ height: 4, borderRadius: 4, background: 'var(--cine-line)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${progress}%`, height: '100%',
                    background: 'linear-gradient(90deg, var(--cine-accent), var(--cine-accent-3))',
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            </div>
          </CineCard>

          {/* Stats + chart */}
          <div
            style={{
              marginTop: '2rem',
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '1.5rem',
            }}
            className="cine-pp-grid"
          >
            <CineCard>
              <span className="cine-mono">Statistiques</span>
              <div style={{ marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { label: 'Parties jouées', value: mockPlayerStats.gamesPlayed, color: 'var(--cine-ink)' },
                  { label: 'Victoires',      value: mockPlayerStats.wins,        color: 'var(--cine-success)' },
                  { label: 'Défaites',       value: mockPlayerStats.losses,      color: 'var(--cine-danger)' },
                  { label: 'Taux victoire',  value: `${mockPlayerStats.winRate}%`, color: 'var(--cine-ink)' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="cine-mono" style={{ fontSize: '0.66rem' }}>{s.label}</div>
                    <div style={{ fontFamily: 'var(--cine-font-display)', fontSize: '1.6rem', fontWeight: 600, letterSpacing: 0, color: s.color }}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </CineCard>

            <CineCard>
              <span className="cine-mono">Progression ELO</span>
              <div style={{ marginTop: '1rem' }}>
                <Line data={eloChartData} options={eloChartOptions as any} />
              </div>
            </CineCard>
          </div>

          {/* Section Premium teaser */}
          <div style={{ marginTop: '2rem' }}>
            <CineCard variant="accent" style={{ position: 'relative', overflow: 'hidden', minHeight: 200 }}>
              <div style={{ filter: 'blur(3px)', opacity: 0.4 }}>
                <span className="cine-section-eyebrow">Statistiques avancées</span>
                <h2 className="cine-section-title">Analyse approfondie</h2>
                <p className="cine-prose">Heatmaps de jeu, courbes de matchups, MMR cible, tendances long-terme…</p>
              </div>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', gap: '1rem',
                background: 'rgba(2,2,3,0.6)', backdropFilter: 'blur(2px)',
              }}>
                <LockIcon sx={{ fontSize: 40, color: 'var(--cine-ink-soft)' }} />
                <p style={{ color: 'var(--cine-ink-soft)', textAlign: 'center', maxWidth: 400, margin: 0 }}>
                  Accédez aux statistiques avancées avec l'abonnement Premium
                </p>
                <button type="button" className="cine-button cine-button--primary">
                  <StarIcon fontSize="small" /> Devenir Premium
                </button>
              </div>
            </CineCard>
          </div>
        </div>

        <style>{`
          @media (max-width: 800px) {
            .cine-pp-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </CineContainer>

      {openEdit && (
        <Modal title="Modifier le profil" onClose={() => setOpenEdit(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <label className="cine-field">
              <span className="cine-label">Nom d'utilisateur</span>
              <input className="cine-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label className="cine-button cine-button--ghost cine-button--mono" style={{ cursor: 'pointer' }}>
              <CameraIcon fontSize="small" /> Changer l'avatar
              <input type="file" accept="image/*" hidden onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const r = new FileReader();
                  r.onloadend = () => setAvatarUrl(r.result as string);
                  r.readAsDataURL(file);
                }
              }} />
            </label>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button type="button" className="cine-button cine-button--ghost cine-button--mono" onClick={() => setOpenEdit(false)}>Annuler</button>
              <button type="button" className="cine-button cine-button--primary cine-button--mono" onClick={() => setOpenEdit(false)}>Sauvegarder</button>
            </div>
          </div>
        </Modal>
      )}
    </CinePage>
  );
};

export default PlayerProfile;
