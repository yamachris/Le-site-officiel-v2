import React from 'react';
import { motion } from 'framer-motion';
import {
  Diamond as DiamondIcon,
  Analytics as AnalyticsIcon,
  LocalOffer as TagIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
  WorkspacePremium as PremiumIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend,
} from 'chart.js';
import { CinePage, CineContainer, CinePageHeader, CineCard } from '../../components/cine';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FEATURES = [
  { title: 'Skins Exclusifs',       description: '3 nouveaux skins débloqués ce mois-ci', icon: <DiamondIcon />,   progress: 60  },
  { title: 'Bonus Unitos',          description: '500 Unitos reçus chaque mois',           icon: <TagIcon />,       progress: 100 },
  { title: 'Statistiques Avancées', description: 'Accès complet aux analyses de parties', icon: <AnalyticsIcon />, progress: 100 },
  { title: 'Tournois Premium',      description: 'Accès prioritaire aux tournois',         icon: <TrophyIcon />,    progress: 80  },
];

const ACHIEVEMENTS = [
  { title: 'Champion Premium', description: 'Membre Premium depuis 3 mois', icon: <StarIcon /> },
  { title: 'Collectionneur',   description: '10 skins exclusifs débloqués', icon: <DiamondIcon /> },
  { title: 'Stratège',         description: '100 parties analysées',         icon: <TimelineIcon /> },
];

const MyPremiumBenefits: React.FC = () => {
  const progressData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Votre progression',
        data: [1200, 1350, 1500, 1750, 1900, 2100],
        borderColor: '#ff3d6e',
        backgroundColor: 'rgba(255, 61, 110, 0.12)',
        tension: 0.4,
      },
      {
        label: 'Moyenne des joueurs',
        data: [1100, 1200, 1300, 1400, 1450, 1500],
        borderColor: '#7a7a85',
        backgroundColor: 'rgba(122, 122, 133, 0.08)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#a8a8b3', font: { family: 'JetBrains Mono, monospace', size: 11 } },
      },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: false, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#7a7a85' } },
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#7a7a85' } },
    },
  };

  return (
    <CinePage>
      <CinePageHeader
        eyebrow={<><PremiumIcon style={{ fontSize: 14 }} /> Mes Avantages</>}
        title={<>Vos privilèges <em>actifs.</em></>}
        lede="Profitez de tous vos avantages exclusifs et suivez votre progression."
      />

      <CineContainer>
        {/* Features avec progress */}
        <div className="cine-grid cine-grid--2">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <CineCard style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                  <div style={{ width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--cine-radius-md)', background: 'rgba(255, 61, 110, 0.1)', color: 'var(--cine-accent)' }}>
                    {f.icon}
                  </div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--cine-font-display)', fontSize: '1.15rem', fontWeight: 500, color: 'var(--cine-ink)' }}>
                    {f.title}
                  </h3>
                </div>
                <p style={{ color: 'var(--cine-ink-soft)', fontSize: '0.95rem', lineHeight: 1.5, margin: '0 0 1.2rem' }}>
                  {f.description}
                </p>
                <div
                  style={{
                    height: 4,
                    borderRadius: 4,
                    background: 'var(--cine-line)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${f.progress}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, var(--cine-accent), var(--cine-accent-3))',
                      transition: 'width 0.6s ease',
                    }}
                  />
                </div>
                <div className="cine-mono" style={{ marginTop: '0.6rem', textAlign: 'right' }}>{f.progress}%</div>
              </CineCard>
            </motion.div>
          ))}
        </div>

        {/* Graph */}
        <div style={{ marginTop: '4rem' }}>
          <span className="cine-section-eyebrow">Évolution</span>
          <h2 className="cine-section-title">Votre Progression</h2>
          <CineCard style={{ marginTop: '1.5rem' }}>
            <Line options={chartOptions} data={progressData} />
          </CineCard>
        </div>

        {/* Achievements */}
        <div style={{ marginTop: '4rem', paddingBottom: '6rem' }}>
          <span className="cine-section-eyebrow">Trophées</span>
          <h2 className="cine-section-title">Vos Réalisations Premium</h2>
          <div className="cine-grid cine-grid--3" style={{ marginTop: '1.5rem' }}>
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <CineCard style={{ textAlign: 'center', height: '100%' }}>
                  <div
                    style={{
                      width: 64, height: 64,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: '50%',
                      background: 'rgba(255, 61, 110, 0.12)',
                      color: 'var(--cine-accent)',
                      margin: '0 auto 1.2rem',
                    }}
                  >
                    {a.icon}
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--cine-font-display)', fontSize: '1.15rem', fontWeight: 500, color: 'var(--cine-ink)' }}>
                    {a.title}
                  </h3>
                  <p style={{ color: 'var(--cine-ink-soft)', fontSize: '0.92rem', margin: 0 }}>{a.description}</p>
                </CineCard>
              </motion.div>
            ))}
          </div>
        </div>
      </CineContainer>
    </CinePage>
  );
};

export default MyPremiumBenefits;
