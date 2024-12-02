import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { FaTrophy, FaChartLine, FaMedal } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';
import RankingTable from './components/RankingTable';
import RankSystem from './components/RankSystem';
import ProgressGraph from './components/ProgressGraph';
import RewardsSection from './components/RewardsSection';

const RankingPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        minHeight: '100vh',
        py: 8,
        background: theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: 'Orbitron',
              color: theme.palette.primary.main,
              fontWeight: 'bold',
            }}
          >
            Classement UNIT : Gravissez les Échelons !
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
          >
            Mesurez-vous à la communauté internationale avec un système de classement dynamique basé sur vos performances.
          </Typography>

          {/* Call-to-Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 6 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<FaTrophy />}
              sx={{
                fontFamily: 'Orbitron',
                px: 4,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              Rejoindre le Classement
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<FaChartLine />}
              sx={{
                fontFamily: 'Orbitron',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
              }}
            >
              Défiez un adversaire
            </Button>
          </Box>
        </Box>

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            <RankingTable />
            <Box mt={4}>
              <ProgressGraph />
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            <RankSystem />
            <Box mt={4}>
              <RewardsSection />
            </Box>
          </Grid>
        </Grid>

        {/* Footer Links */}
        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Orbitron' }}>
              Liens rapides
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="text" size="small">
                Découvrir le système Elo
              </Button>
              <Button variant="text" size="small">
                Règles des tournois
              </Button>
              <Button variant="text" size="small">
                Rejoindre Discord
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Orbitron' }}>
              Raccourcis
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="text" size="small">
                Classement régional
              </Button>
              <Button variant="text" size="small">
                Historique tournois
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RankingPage;
