import React from 'react';
import { motion } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';
import { FaUsers, FaGamepad, FaTrophy } from 'react-icons/fa';

const StatsBar: React.FC = () => {
  const stats = [
    {
      icon: <FaUsers />,
      value: '152',
      label: 'joueurs connectés',
      hasIndicator: true,
    },
    {
      icon: <FaGamepad />,
      value: '38',
      label: 'parties en cours',
    },
    {
      icon: <FaTrophy />,
      value: '2j',
      label: 'avant le prochain tournoi',
    },
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        py: 2,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              gap: { xs: 2, md: 4 },
              flexWrap: 'wrap',
            }}
          >
            {stats.map((stat, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    color: '#ff3366',
                    fontSize: { xs: '1.5rem', md: '2rem' },
                  }}
                >
                  {stat.icon}
                  {stat.hasIndicator && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: -4,
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#4CAF50',
                        boxShadow: '0 0 10px #4CAF50',
                        animation: 'pulse 2s infinite',
                        '@keyframes pulse': {
                          '0%': {
                            boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.7)',
                          },
                          '70%': {
                            boxShadow: '0 0 0 6px rgba(76, 175, 80, 0)',
                          },
                          '100%': {
                            boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)',
                          },
                        },
                      }}
                    />
                  )}
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '1.2rem', md: '1.5rem' },
                      color: '#ff3366',
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.8rem', md: '1rem' },
                      opacity: 0.8,
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default StatsBar;
