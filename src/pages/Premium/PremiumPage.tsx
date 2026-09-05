import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  WorkspacePremium as PremiumIcon,
  Diamond as DiamondIcon,
  Analytics as AnalyticsIcon,
  LocalOffer as TagIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { CinePage, CineContainer, CinePageHeader, CineCard, CineKpiStrip } from '../../components/cine';

const FEATURES = [
  { title: 'Skins Exclusifs',       description: 'Accédez à des skins uniques et personnalisez vos cartes comme jamais auparavant.', icon: <DiamondIcon />,   color: 'var(--cine-accent-3)' },
  { title: 'Bonus Unitos',          description: 'Recevez 500 Unitos chaque mois pour acheter des cartes et des skins.',             icon: <TagIcon />,       color: 'var(--cine-accent)'   },
  { title: 'Statistiques Avancées', description: 'Analysez vos performances en détail avec des statistiques approfondies.',           icon: <AnalyticsIcon />, color: 'var(--cine-accent-2)' },
  { title: 'Tournois Premium',      description: 'Participez à des tournois exclusifs avec des récompenses spéciales.',               icon: <TrophyIcon />,    color: 'var(--cine-accent-4)' },
];

const PREMIUM_KPIS = [
  { value: '500', label: 'Unitos / mois', tone: 'gold' as const },
  { value: '4', label: 'avantages actifs', tone: 'accent' as const },
  { value: '24h', label: 'tournois prioritaires', tone: 'cyan' as const },
];

const PremiumPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <CinePage>
      <CinePageHeader
        eyebrow={<><PremiumIcon style={{ fontSize: 14 }} /> Premium</>}
        title={<>Débloquez tout le <em>potentiel.</em></>}
        lede="UNIT Premium — skins exclusifs, bonus mensuels, analyses approfondies, tournois prioritaires."
      >
        <button type="button" className="cine-button cine-button--primary" onClick={() => navigate('/profile')}>
          Devenir Premium
        </button>
      </CinePageHeader>

      <CineContainer>
        <CineKpiStrip items={PREMIUM_KPIS} style={{ marginBottom: '2rem' }} />

        <div className="cine-shell-grid" style={{ paddingBottom: '4rem' }}>
          <div className="cine-grid cine-grid--2">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <CineCard variant="accent" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
                  <div style={{ display: 'inline-flex', width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--cine-radius-md)', background: `${f.color}1A`, color: f.color }}>
                    {f.icon}
                  </div>
                  <h3 style={{ fontFamily: 'var(--cine-font-display)', fontSize: '1.4rem', fontWeight: 500, letterSpacing: 0, margin: 0, color: 'var(--cine-ink)' }}>
                    {f.title}
                  </h3>
                  <p style={{ color: 'var(--cine-ink-soft)', lineHeight: 1.5, margin: 0 }}>{f.description}</p>
                </CineCard>
              </motion.div>
            ))}
          </div>

          <div className="cine-command-card" style={{ padding: 'clamp(24px, 4vw, 42px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="cine-mono" style={{ color: 'var(--cine-accent-3)' }}>Pass premium</span>
            <h2 style={{ fontFamily: 'var(--cine-font-display)', fontSize: 'clamp(2rem, 4vw, 3.4rem)', lineHeight: 1, margin: '0.8rem 0 1rem' }}>
              Un statut visible sur toute la table.
            </h2>
            <p style={{ color: 'var(--cine-ink-soft)', lineHeight: 1.6, margin: 0 }}>
              Bonus mensuels, cosmétiques exclusifs, tournois prioritaires et outils d'analyse sont regroupés dans une expérience Premium unique.
            </p>
            <button type="button" className="cine-button cine-button--primary" onClick={() => navigate('/profile')} style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}>
              Activer maintenant
            </button>
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
            paddingBottom: '6rem',
            borderTop: '1px solid var(--cine-line)',
            paddingTop: '4rem',
          }}
        >
          <h2 style={{ fontFamily: 'var(--cine-font-display)', fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 500, letterSpacing: 0, margin: 0, color: 'var(--cine-ink)' }}>
            Prêt à passer au niveau supérieur ?
          </h2>
          <p style={{ color: 'var(--cine-ink-soft)', maxWidth: 540, margin: '1rem auto 2rem' }}>
            Activez Premium en un clic depuis votre profil.
          </p>
          <button type="button" className="cine-button cine-button--primary" onClick={() => navigate('/profile')}>
            Rejoindre UNIT Premium
          </button>
        </div>
      </CineContainer>
    </CinePage>
  );
};

export default PremiumPage;
