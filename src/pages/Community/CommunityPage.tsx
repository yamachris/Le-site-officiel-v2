import React from 'react';
import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { FaDiscord, FaTwitch, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CommunityStats from './components/CommunityStats';
import LeaderBoard from './components/LeaderBoard';
import CommunityWall from './components/CommunityWall';
import TournamentSection from './components/TournamentSection';
import { useTheme } from '@mui/material/styles';

const CommunityPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const socialLinks = [
    { icon: <FaDiscord size={24} />, name: 'Discord', url: '#' },
    { icon: <FaTwitch size={24} />, name: 'Twitch', url: '#' },
    { icon: <FaYoutube size={24} />, name: 'YouTube', url: '#' },
    { icon: <FaInstagram size={24} />, name: 'Instagram', url: '#' },
    { icon: <FaTiktok size={24} />, name: 'TikTok', url: '#' },
  ];

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
            Rejoignez la Communauté UNIT
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}
          >
            Échangez avec d'autres passionnés, participez à des tournois et gravissez les échelons du classement.
          </Typography>
          
          {/* Call-to-Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 6 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<FaDiscord />}
              sx={{
                fontFamily: 'Orbitron',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #7289DA 30%, #5865F2 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5865F2 30%, #7289DA 90%)',
                },
              }}
            >
              Rejoindre le Discord
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/community/forum')}
              sx={{
                fontFamily: 'Orbitron',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
              }}
            >
              Accéder au Forum
            </Button>
          </Box>
        </Box>

        {/* Statistics Section */}
        <CommunityStats />

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <LeaderBoard />
            <Box mt={4}>
              <CommunityWall />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <TournamentSection />
            
            {/* Social Media Links */}
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mt: 4,
                borderRadius: 2,
                background: theme.palette.background.paper,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Orbitron' }}>
                Suivez-nous
              </Typography>
              <Grid container spacing={2}>
                {socialLinks.map((social) => (
                  <Grid item xs={4} key={social.name}>
                    <Button
                      variant="text"
                      startIcon={social.icon}
                      href={social.url}
                      sx={{
                        width: '100%',
                        justifyContent: 'center',
                        color: 'text.primary',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      {social.name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CommunityPage;
