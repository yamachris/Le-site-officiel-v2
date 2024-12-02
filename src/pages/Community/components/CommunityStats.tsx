import React from 'react';
import { Paper, Grid, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { FaUsers, FaGamepad, FaTrophy } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

const stats = [
  {
    icon: <FaUsers size={32} />,
    label: 'Joueurs en ligne',
    value: '152',
    color: '#4CAF50',
  },
  {
    icon: <FaGamepad size={32} />,
    label: 'Parties jouées',
    value: '120,000+',
    color: '#2196F3',
  },
  {
    icon: <FaTrophy size={32} />,
    label: 'Prochain tournoi',
    value: 'Dans 3 jours',
    color: '#FFC107',
  },
];

const CommunityStats: React.FC = () => {
  const theme = useTheme();

  return (
    <Grid container spacing={3} sx={{ mb: 6 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} md={4} key={stat.label}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                background: theme.palette.background.paper,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box
                sx={{
                  color: stat.color,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {stat.icon}
              </Box>
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                sx={{
                  fontFamily: 'Orbitron',
                  fontWeight: 'bold',
                  color: stat.color,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ textAlign: 'center' }}
              >
                {stat.label}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default CommunityStats;
