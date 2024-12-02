import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { GiBrain, GiTrophy, GiSmartphone } from 'react-icons/gi';
import { BsChatDots } from 'react-icons/bs';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          height: '100%',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
          },
        }}
      >
        <Box
          sx={{
            fontSize: '3rem',
            color: '#FFD700',
            mb: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
          sx={{
            textAlign: 'center',
            fontFamily: 'Orbitron',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const UniqueFeatures = () => {
  const features = [
    {
      icon: <GiBrain />,
      title: 'Stratégie infinie',
      description: 'Découvrez un gameplay qui mêle tactique, anticipation et créativité.',
    },
    {
      icon: <GiTrophy />,
      title: 'Tournois compétitifs',
      description: 'Affrontez les meilleurs joueurs et grimpez dans le classement mondial.',
    },
    {
      icon: <GiSmartphone />,
      title: 'Accessibilité universelle',
      description: 'Jouez où vous voulez, quand vous voulez, grâce à notre design responsive.',
    },
    {
      icon: <BsChatDots />,
      title: 'Communauté vivante',
      description: 'Rejoignez une communauté passionnée de joueurs prêts à relever tous les défis.',
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        background: 'linear-gradient(180deg, rgba(19,47,76,0.95) 0%, rgba(10,25,41,0.95) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              mb: 6,
              fontFamily: 'Orbitron',
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Pourquoi UNIT est le jeu qu'il vous faut ?
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default UniqueFeatures;
