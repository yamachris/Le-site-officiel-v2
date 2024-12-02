import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
} from '@mui/material';
import {
  WorkspacePremium as PremiumIcon,
  Diamond as DiamondIcon,
  Analytics as AnalyticsIcon,
  LocalOffer as TagIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PremiumPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const premiumFeatures = [
    {
      title: 'Skins Exclusifs',
      description: 'Accédez à des skins uniques et personnalisez vos cartes comme jamais auparavant.',
      icon: <DiamondIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
    },
    {
      title: 'Bonus Unitos',
      description: 'Recevez 500 Unitos chaque mois pour acheter des cartes et des skins.',
      icon: <TagIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
    },
    {
      title: 'Statistiques Avancées',
      description: 'Analysez vos performances en détail avec des statistiques approfondies.',
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
    },
    {
      title: 'Tournois Premium',
      description: 'Participez à des tournois exclusifs avec des récompenses spéciales.',
      icon: <TrophyIcon sx={{ fontSize: 40, color: '#FFD700' }} />,
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
            UNIT Premium
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Débloquez tout le potentiel de UNIT Card Game
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              color: 'black',
              '&:hover': {
                background: 'linear-gradient(45deg, #FFA500, #FFD700)',
              },
            }}
            onClick={() => navigate('/profile')}
          >
            Devenir Premium
          </Button>
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
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {feature.icon}
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Prêt à passer au niveau supérieur ?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
            color: 'black',
            '&:hover': {
              background: 'linear-gradient(45deg, #FFA500, #FFD700)',
            },
          }}
          onClick={() => navigate('/profile')}
        >
          Rejoignez UNIT Premium
        </Button>
      </Box>
    </Container>
  );
};

export default PremiumPage;
