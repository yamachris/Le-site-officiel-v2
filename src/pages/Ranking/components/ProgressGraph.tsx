import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

const data = [
  { date: 'Jan', elo: 1500 },
  { date: 'Fév', elo: 1650 },
  { date: 'Mar', elo: 1800 },
  { date: 'Avr', elo: 1750 },
  { date: 'Mai', elo: 1900 },
  { date: 'Juin', elo: 2100 },
  { date: 'Juil', elo: 2050 },
  { date: 'Août', elo: 2200 },
];

const ProgressGraph: React.FC = () => {
  const theme = useTheme();

  // Calculer les valeurs min et max pour l'échelle
  const minElo = Math.min(...data.map(d => d.elo));
  const maxElo = Math.max(...data.map(d => d.elo));
  const range = maxElo - minElo;

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
        <FaChartLine /> Progression
      </Typography>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            width: '100%',
            height: 300,
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            gap: 2,
            p: 2,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {data.map((point, index) => {
            const height = ((point.elo - minElo) / range) * 100;
            return (
              <Box
                key={point.date}
                sx={{
                  flex: 1,
                  position: 'relative',
                  height: `${height}%`,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                    '& .tooltip': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Box
                  className="tooltip"
                  sx={{
                    position: 'absolute',
                    top: -30,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    padding: '4px 8px',
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                    whiteSpace: 'nowrap',
                    boxShadow: theme.shadows[2],
                  }}
                >
                  {`${point.date}: ${point.elo} pts`}
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          {data.map((point) => (
            <Typography
              key={point.date}
              variant="caption"
              color="text.secondary"
              sx={{ flex: 1, textAlign: 'center' }}
            >
              {point.date}
            </Typography>
          ))}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Statistiques de progression :
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              mt: 2,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6" color="primary">
                +{data[data.length - 1].elo - data[0].elo}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Points gagnés
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="primary">
                {((data[data.length - 1].elo - data[0].elo) / data[0].elo * 100).toFixed(1)}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Progression
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" color="primary">
                B → A
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Évolution rang
              </Typography>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Paper>
  );
};

export default ProgressGraph;
