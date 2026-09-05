import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { FaGift, FaCrown, FaStar } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

interface Reward {
  rank: string;
  title: string;
  description: string;
  color: string;
  unlocked: boolean;
}

const rewards: Reward[] = [
  {
    rank: 'SSS',
    title: 'Emblème Légendaire',
    description: 'Titre exclusif et skin personnalisé pour toutes les cartes',
    color: 'var(--unit-accent-danger)',
    unlocked: false,
  },
  {
    rank: 'SS',
    title: 'Skin Maître',
    description: 'Skin unique pour les cartes spéciales',
    color: 'var(--unit-rarity-unique)',
    unlocked: false,
  },
  {
    rank: 'S',
    title: 'Animation Élite',
    description: 'Effets visuels spéciaux pour les cartes',
    color: 'var(--unit-accent-warning)',
    unlocked: false,
  },
  {
    rank: 'A',
    title: 'Badge Expert',
    description: 'Badge spécial sur votre profil',
    color: 'var(--unit-accent-gold)',
    unlocked: true,
  },
];

const RewardsSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        background: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: 'var(--unit-font-display)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 3,
        }}
      >
        <FaGift style={{ color: 'var(--unit-accent-gold)' }} /> Récompenses
      </Typography>

      {rewards.map((reward, index) => (
        <motion.div
          key={reward.rank}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Box
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 1,
              backgroundColor: 'background.default',
              border: `1px solid ${theme.palette.divider}`,
              opacity: reward.unlocked ? 1 : 0.7,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {reward.rank === 'SSS' ? (
                  <FaCrown style={{ color: reward.color }} />
                ) : (
                  <FaStar style={{ color: reward.color }} />
                )}
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: 'var(--unit-font-display)',
                    color: reward.color,
                    fontWeight: 'bold',
                  }}
                >
                  {reward.title}
                </Typography>
              </Box>
              <Chip
                label={`Rang ${reward.rank}`}
                size="small"
                sx={{
                  backgroundColor: reward.color,
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            </Box>

            <Typography variant="body2" color="text.secondary">
              {reward.description}
            </Typography>

            <Box
              sx={{
                mt: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: reward.unlocked ? 'success.main' : 'text.disabled',
              }}
            >
              <Typography variant="caption">
                {reward.unlocked ? '✓ Débloqué' : '🔒 À débloquer'}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      ))}
    </Paper>
  );
};

export default RewardsSection;
