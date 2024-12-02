import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Grid } from '@mui/material';
import { FaBook, FaTrophy, FaGamepad, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeatureGrid: React.FC = () => {
  const features = [
    {
      icon: <FaBook />,
      title: 'Les Règles',
      description: 'Plongez dans les règles du jeu en un clic.',
      path: '/rules',
      color: '#4CAF50',
    },
    {
      icon: <FaTrophy />,
      title: 'Classement',
      description: 'Découvrez le top des joueurs compétitifs.',
      path: '/ranking',
      color: '#FFA000',
    },
    {
      icon: <FaGamepad />,
      title: 'Tournois en direct',
      description: 'Inscrivez-vous à la prochaine compétition.',
      path: '/tournaments',
      color: '#E91E63',
    },
    {
      icon: <FaUsers />,
      title: 'Communauté',
      description: 'Rejoignez une communauté passionnée.',
      path: '/community',
      color: '#2196F3',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(180deg, rgba(19,47,76,0.95) 0%, rgba(10,25,41,0.95) 100%)',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 6,
              fontFamily: 'Orbitron',
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Découvrir UNIT
          </Typography>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div variants={itemVariants}>
                  <Link 
                    to={feature.path} 
                    style={{ textDecoration: 'none' }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: `0 8px 25px ${feature.color}25`,
                          background: 'rgba(255, 255, 255, 0.08)',
                        },
                      }}
                      component={motion.div}
                      whileHover={{ scale: 1.02 }}
                    >
                      <Box
                        sx={{
                          fontSize: '2.5rem',
                          color: feature.color,
                          mb: 2,
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 1,
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </Link>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default FeatureGrid;
