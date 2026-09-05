import React, { useState, useEffect, useRef } from 'react';
import {
  Person as PersonIcon,
  Stars as StarsIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
  PhotoCamera as PhotoCameraIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  WorkspacePremium as PremiumIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend,
} from 'chart.js';
import * as CountryFlags from 'country-flag-icons/react/3x2';
import { CinePage, CineContainer, CineCard, CineBadge } from '../../components/cine';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface UserStats {
  elo: number;
  rank: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
  eloHistory: number[];
  isPremium: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const initialStats: UserStats = {
  elo: 1200,
  rank: 'Bronze',
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  winRate: 0,
  eloHistory: [1200, 1220, 1180, 1210, 1240, 1200, 1260],
  isPremium: false,
};

const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_win',  title: 'Première Victoire', description: 'Gagnez votre première partie',          icon: '🏆', unlocked: false },
  { id: 'win_streak', title: 'Sur une lancée',    description: "Gagnez 3 parties d'affilée",            icon: '🔥', unlocked: false, progress: 0,  maxProgress: 3  },
  { id: 'rank_up',    title: 'En progression',    description: 'Atteignez le rang Argent',              icon: '⭐', unlocked: false },
  { id: 'collector',  title: 'Collectionneur',    description: 'Obtenez 50 cartes différentes',         icon: '📚', unlocked: false, progress: 23, maxProgress: 50 },
];

const RANKS = ['Bronze', 'Argent', 'Or', 'Platine', 'Diamant'];

/* ============ Modal réutilisable ============ */
const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode; maxWidth?: number }> = ({ title, onClose, children, maxWidth = 540 }) => (
  <div
    role="dialog" aria-modal="true"
    style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(2, 2, 3, 0.78)',
      backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    <div
      style={{
        width: '100%', maxWidth, maxHeight: '90vh', overflow: 'auto',
        background: 'var(--cine-bg-soft)',
        border: '1px solid var(--cine-line)',
        borderRadius: 'var(--cine-radius-lg)',
        padding: '2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--cine-font-display)', fontSize: '1.5rem', fontWeight: 500, letterSpacing: 0 }}>
          {title}
        </h2>
        <button type="button" onClick={onClose} className="cine-button cine-button--ghost cine-button--mono" style={{ padding: '0.5rem 0.9rem' }}>
          ✕
        </button>
      </div>
      {children}
    </div>
  </div>
);

/* ============ Page ============ */
const UserProfile: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(initialStats);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [openAchievements, setOpenAchievements] = useState(false);
  const [openPremium, setOpenPremium] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const username = localStorage.getItem('username') || 'New';
  const userCountry = localStorage.getItem('userCountry') || 'FR';
  const FlagComponent = (CountryFlags as any)[userCountry];

  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) setAvatarUrl(savedAvatar);
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setAvatarUrl(base64);
        localStorage.setItem('userAvatar', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePremiumPurchase = (_plan: 'monthly' | 'yearly') => {
    setStats((prev) => ({ ...prev, isPremium: true }));
    localStorage.setItem('isPremium', 'true');
    setOpenPremium(false);
  };

  const getNextRank = () => {
    const i = RANKS.indexOf(stats.rank);
    return i < RANKS.length - 1 ? RANKS[i + 1] : stats.rank;
  };
  const getProgressToNextRank = () => ((stats.elo - 1200) % 300) / 3;

  const chartData = {
    labels: ['J-6', 'J-5', 'J-4', 'J-3', 'J-2', 'J-1', "Auj."],
    datasets: [{
      label: 'ELO',
      data: stats.eloHistory,
      borderColor: '#ff3d6e',
      backgroundColor: 'rgba(255, 61, 110, 0.12)',
      tension: 0.3,
      pointBackgroundColor: '#ff3d6e',
      pointBorderColor: '#fff',
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        min: Math.min(...stats.eloHistory) - 50,
        max: Math.max(...stats.eloHistory) + 50,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#7a7a85', font: { family: 'JetBrains Mono, monospace', size: 10 } },
      },
      x: {
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#7a7a85', font: { family: 'JetBrains Mono, monospace', size: 10 } },
      },
    },
  };

  return (
    <CinePage>
      <CineContainer>
        <div style={{ paddingTop: 'clamp(48px, 8vh, 96px)' }}>
          {/* En-tête profil */}
          <CineCard
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '1.5rem',
              alignItems: 'center',
              padding: '2rem',
            }}
          >
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: 100, height: 100,
                  borderRadius: '50%',
                  background: avatarUrl ? `url(${avatarUrl}) center/cover` : 'linear-gradient(135deg, var(--cine-accent), var(--cine-accent-3))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--cine-line-hi)',
                }}
              >
                {!avatarUrl && <PersonIcon sx={{ fontSize: 56, color: '#fff' }} />}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Changer la photo"
                style={{
                  position: 'absolute', bottom: -4, right: -4,
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--cine-accent)', color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--cine-bg)',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(255, 61, 110, 0.4)',
                }}
              >
                <PhotoCameraIcon sx={{ fontSize: 16 }} />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
            </div>

            <div style={{ minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                <h1 style={{ margin: 0, fontFamily: 'var(--cine-font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 500, letterSpacing: 0, color: 'var(--cine-ink)' }}>
                  {username}
                </h1>
                {FlagComponent && (
                  <span style={{ width: 28, height: 20, display: 'inline-block', borderRadius: 2, overflow: 'hidden' }}>
                    <FlagComponent style={{ width: '100%', height: '100%' }} />
                  </span>
                )}
                {stats.isPremium && <CineBadge variant="accent">Premium</CineBadge>}
              </div>
              <div className="cine-mono" style={{ marginTop: '0.5rem' }}>
                Membre depuis {new Date().toLocaleDateString('fr-FR')}
              </div>
            </div>

            <button type="button" className="cine-button cine-button--ghost" onClick={() => setOpenAchievements(true)}>
              <TrophyIcon fontSize="small" /> Succès
            </button>
          </CineCard>

          {/* Stats grid */}
          <div className="cine-grid cine-grid--3" style={{ marginTop: '2rem' }}>
            {/* Classement */}
            <CineCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <StarsIcon sx={{ color: 'var(--cine-accent-3)', fontSize: 20 }} />
                <span className="cine-mono">Classement</span>
              </div>
              <div className="cine-stat-value" style={{ marginTop: '0.8rem' }}>{stats.elo}</div>
              <div className="cine-stat-label">ELO</div>
              <div style={{ marginTop: '1.4rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--cine-ink-soft)' }}>
                <span>Rang : <strong style={{ color: 'var(--cine-ink)' }}>{stats.rank}</strong></span>
                <span>→ {getNextRank()}</span>
              </div>
              <div style={{ marginTop: '0.6rem', height: 4, borderRadius: 4, background: 'var(--cine-line)', overflow: 'hidden' }}>
                <div style={{
                  width: `${getProgressToNextRank()}%`, height: '100%',
                  background: 'linear-gradient(90deg, var(--cine-accent), var(--cine-accent-3))',
                  transition: 'width 0.6s ease',
                }} />
              </div>
            </CineCard>

            {/* Statistiques */}
            <CineCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <TrophyIcon sx={{ color: 'var(--cine-accent-3)', fontSize: 20 }} />
                <span className="cine-mono">Statistiques</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginTop: '1rem' }}>
                <div>
                  <div className="cine-stat-value" style={{ fontSize: '1.6rem' }}>{stats.gamesPlayed}</div>
                  <div className="cine-stat-label">Parties</div>
                </div>
                <div>
                  <div className="cine-stat-value" style={{ fontSize: '1.6rem', color: 'var(--cine-success)' }}>{stats.wins}</div>
                  <div className="cine-stat-label">Victoires</div>
                </div>
                <div>
                  <div className="cine-stat-value" style={{ fontSize: '1.6rem', color: 'var(--cine-danger)' }}>{stats.losses}</div>
                  <div className="cine-stat-label">Défaites</div>
                </div>
                <div>
                  <div className="cine-stat-value" style={{ fontSize: '1.6rem' }}>{stats.winRate}%</div>
                  <div className="cine-stat-label">Win rate</div>
                </div>
              </div>
            </CineCard>

            {/* Progression */}
            <CineCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <TimelineIcon sx={{ color: 'var(--cine-accent-3)', fontSize: 20 }} />
                <span className="cine-mono">Progression</span>
              </div>
              <div style={{ height: 180, marginTop: '1rem' }}>
                <Line data={chartData} options={chartOptions as any} />
              </div>
            </CineCard>
          </div>

          {/* Section Premium */}
          <div style={{ marginTop: '3rem', paddingBottom: '6rem' }}>
            {!stats.isPremium ? (
              <CineCard variant="accent" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                  <PremiumIcon sx={{ color: 'var(--cine-accent)' }} />
                  <span className="cine-mono" style={{ color: 'var(--cine-accent)' }}>Premium</span>
                </div>
                <h2 style={{ margin: 0, fontFamily: 'var(--cine-font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 500, letterSpacing: 0 }}>
                  Passez à la version <em style={{ color: 'var(--cine-ink-soft)', fontWeight: 400 }}>Premium.</em>
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.8rem',
                    marginTop: '1.8rem',
                  }}
                >
                  {[
                    'Cartes exclusives',
                    'Statistiques détaillées',
                    'Avatars personnalisés',
                    'Tournois VIP',
                    'Chat exclusif',
                    'Récompenses bonus',
                  ].map((b) => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--cine-ink-soft)' }}>
                      <CheckCircleIcon sx={{ fontSize: 16, color: 'var(--cine-accent-2)' }} />
                      <span style={{ fontSize: '0.95rem' }}>{b}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button type="button" className="cine-button cine-button--primary" onClick={() => setOpenPremium(true)}>
                    Devenir Premium
                  </button>
                  <span className="cine-mono">À partir de 4,99 € / mois</span>
                </div>
              </CineCard>
            ) : (
              <CineCard variant="accent">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <PremiumIcon sx={{ color: 'var(--cine-accent)' }} />
                  <h2 style={{ margin: 0, fontFamily: 'var(--cine-font-display)', fontSize: '1.5rem', fontWeight: 500 }}>
                    Compte Premium Actif
                  </h2>
                </div>
                <p style={{ color: 'var(--cine-ink-soft)', marginTop: '0.8rem' }}>Profitez de tous vos avantages premium.</p>
                <button
                  type="button"
                  className="cine-button cine-button--ghost"
                  style={{ marginTop: '1rem' }}
                  onClick={() => window.open('/profile/premium-benefits', '_blank')}
                >
                  Voir mes avantages →
                </button>
              </CineCard>
            )}
          </div>
        </div>
      </CineContainer>

      {/* Modal Premium */}
      {openPremium && (
        <Modal title="Choisissez votre formule Premium" onClose={() => setOpenPremium(false)} maxWidth={620}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => handlePremiumPurchase('monthly')}
              style={{
                padding: '1.8rem', border: '1px solid var(--cine-line)', borderRadius: 'var(--cine-radius-md)',
                background: 'var(--cine-surface)', textAlign: 'center', cursor: 'pointer',
                transition: 'border-color var(--cine-transition), background var(--cine-transition)',
              }}
            >
              <div className="cine-mono">Mensuel</div>
              <div style={{ fontFamily: 'var(--cine-font-display)', fontSize: '2.4rem', fontWeight: 600, marginTop: '0.4rem', letterSpacing: 0 }}>
                4,99 <span style={{ fontSize: '1rem', color: 'var(--cine-ink-soft)' }}>€/mois</span>
              </div>
              <button type="button" className="cine-button cine-button--ghost cine-button--mono" style={{ marginTop: '1.2rem', width: '100%', justifyContent: 'center' }}>
                Choisir
              </button>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => handlePremiumPurchase('yearly')}
              style={{
                position: 'relative',
                padding: '1.8rem',
                border: '1px solid var(--cine-accent)',
                borderRadius: 'var(--cine-radius-md)',
                background: 'linear-gradient(180deg, rgba(255,61,110,0.1), transparent)',
                textAlign: 'center', cursor: 'pointer',
              }}
            >
              <div style={{ position: 'absolute', top: 12, right: 12 }}>
                <CineBadge variant="accent">-20%</CineBadge>
              </div>
              <div className="cine-mono" style={{ color: 'var(--cine-accent)' }}>Annuel</div>
              <div style={{ fontFamily: 'var(--cine-font-display)', fontSize: '2.4rem', fontWeight: 600, marginTop: '0.4rem', letterSpacing: 0 }}>
                47,88 <span style={{ fontSize: '1rem', color: 'var(--cine-ink-soft)' }}>€/an</span>
              </div>
              <div className="cine-mono" style={{ marginTop: '0.4rem', color: 'var(--cine-ink-soft)' }}>soit 3,99 € / mois</div>
              <button type="button" className="cine-button cine-button--primary cine-button--mono" style={{ marginTop: '1.2rem', width: '100%', justifyContent: 'center' }}>
                Choisir
              </button>
            </div>
          </div>
          <p className="cine-mono" style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--cine-ink-dim)' }}>
            Paiement sécurisé · Annulation à tout moment · Satisfait ou remboursé
          </p>
        </Modal>
      )}

      {/* Modal Succès */}
      {openAchievements && (
        <Modal title="Succès" onClose={() => setOpenAchievements(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1rem 1.2rem',
                  border: '1px solid var(--cine-line)',
                  borderRadius: 'var(--cine-radius-md)',
                  background: 'var(--cine-surface)',
                  opacity: a.unlocked ? 1 : 0.6,
                }}
              >
                <div style={{ fontSize: '1.6rem', flexShrink: 0 }}>
                  {a.unlocked ? a.icon : <LockIcon sx={{ color: 'var(--cine-ink-dim)' }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--cine-font-display)', fontSize: '1.05rem', color: 'var(--cine-ink)' }}>
                    {a.title}
                  </div>
                  <div style={{ color: 'var(--cine-ink-soft)', fontSize: '0.9rem', marginTop: '0.2rem' }}>{a.description}</div>
                  {a.progress !== undefined && (
                    <div style={{ marginTop: '0.6rem', height: 3, borderRadius: 3, background: 'var(--cine-line)', overflow: 'hidden' }}>
                      <div style={{
                        width: `${(a.progress / (a.maxProgress || 1)) * 100}%`,
                        height: '100%',
                        background: 'var(--cine-accent)',
                      }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </CinePage>
  );
};

export default UserProfile;
