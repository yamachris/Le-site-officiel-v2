import React from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { FaCrown } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

interface RankTier {
  name: string;
  range: string;
  color: string;
  description: string;
}

const rankTiers: RankTier[] = [
  {
    name: 'SSS',
    range: '3200+',
    color: '#FF0000',
    description: 'Légende',
  },
  {
    name: 'SS',
    range: '2900-3199',
    color: '#FF4D00',
    description: 'Maître',
  },
  {
    name: 'S',
    range: '2600-2899',
    color: '#FF9900',
    description: 'Élite',
  },
  {
    name: 'A',
    range: '2200-2599',
    color: '#FFD700',
    description: 'Expert',
  },
  {
    name: 'B',
    range: '1800-2199',
    color: '#00FF00',
    description: 'Avancé',
  },
  {
    name: 'C',
    range: '1400-1799',
    color: '#00FFFF',
    description: 'Intermédiaire',
  },
  {
    name: 'D',
    range: '1000-1399',
    color: '#808080',
    description: 'Débutant',
  },
];

const RankSystem: React.FC = () => {
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
          fontFamily: 'Orbitron',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 3,
        }}
      >
        <FaCrown style={{ color: '#FFD700' }} /> Système de Rangs
      </Typography>

      <Typography variant="body2" color="text.secondary" paragraph>
        Le système de classement UNIT utilise une version dynamique du système Elo pour refléter
        vos performances en temps réel. Chaque joueur commence avec 1500 points, et vos victoires
        ou défaites ajustent votre score pour déterminer votre rang.
      </Typography>

      <Box sx={{ mt: 4 }}>
        {rankTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
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
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: 'Orbitron',
                    color: tier.color,
                    fontWeight: 'bold',
                  }}
                >
                  {tier.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tier.range} points
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={100}
                sx={{
                  mb: 1,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: tier.color,
                  },
                }}
              />

              <Typography variant="body2" color="text.secondary">
                {tier.description}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Paper>
  );
};

export default RankSystem;
