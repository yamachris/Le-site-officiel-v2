import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Divider,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Diamond as DiamondIcon,
  Analytics as AnalyticsIcon,
  LocalOffer as TagIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
  WorkspacePremium as PremiumIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyPremiumBenefits: React.FC = () => {
  const theme = useTheme();

  // Données pour le graphique de progression
  const progressData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Votre progression',
        data: [1200, 1350, 1500, 1750, 1900, 2100],
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Moyenne des joueurs',
        data: [1100, 1200, 1300, 1400, 1450, 1500],
        borderColor: '#B0B0B0',
        backgroundColor: 'rgba(176, 176, 176, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Progression du classement',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  const premiumFeatures = [
    {
      title: 'Skins Exclusifs',
      description: '3 nouveaux skins débloqués ce mois-ci',
      icon: <DiamondIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
      progress: 60,
    },
    {
      title: 'Bonus Unitos',
      description: '500 Unitos reçus chaque mois',
      icon: <TagIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
      progress: 100,
    },
    {
      title: 'Statistiques Avancées',
      description: 'Accès complet aux analyses de parties',
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
      progress: 100,
    },
    {
      title: 'Tournois Premium',
      description: 'Accès prioritaire aux tournois',
      icon: <TrophyIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
      progress: 80,
    },
  ];

  const achievements = [
    {
      title: 'Champion Premium',
      description: 'Membre Premium depuis 3 mois',
      icon: <StarIcon />,
    },
    {
      title: 'Collectionneur',
      description: '10 skins exclusifs débloqués',
      icon: <DiamondIcon />,
    },
    {
      title: 'Stratège',
      description: '100 parties analysées',
      icon: <TimelineIcon />,
    },
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', my: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontFamily: 'Orbitron',
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <PremiumIcon sx={{ fontSize: 50, color: '#FFD700' }} />
            Mes Avantages Premium
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Profitez de tous vos avantages exclusifs
          </Typography>
        </motion.div>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {premiumFeatures.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card sx={{ 
                height: '100%',
                background: 'linear-gradient(45deg, rgba(255,215,0,0.1), rgba(255,165,0,0.1))',
                borderRadius: 4,
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {feature.icon}
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {feature.description}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={feature.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(255,215,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#FFD700',
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Progress Chart */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Votre Progression
        </Typography>
        <Card sx={{ 
          p: 4,
          background: 'linear-gradient(45deg, rgba(255,215,0,0.05), rgba(255,165,0,0.05))',
          borderRadius: 4,
        }}>
          <Line options={chartOptions} data={progressData} />
        </Card>
      </Box>

      {/* Achievements */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Vos Réalisations Premium
        </Typography>
        <Grid container spacing={4}>
          {achievements.map((achievement, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ 
                  textAlign: 'center',
                  background: 'linear-gradient(45deg, rgba(255,215,0,0.1), rgba(255,165,0,0.1))',
                  borderRadius: 4,
                }}>
                  <CardContent>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        bgcolor: 'rgba(255,215,0,0.2)',
                        color: '#FFD700',
                        margin: '0 auto 16px',
                      }}
                    >
                      {achievement.icon}
                    </Avatar>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {achievement.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {achievement.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MyPremiumBenefits;
