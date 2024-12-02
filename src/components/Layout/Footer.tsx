import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { 
  FaDiscord, 
  FaTwitch, 
  FaYoutube, 
  FaInstagram, 
  FaTiktok 
} from 'react-icons/fa';

const socialLinks = [
  { icon: <FaDiscord />, url: '#', label: 'Discord' },
  { icon: <FaTwitch />, url: '#', label: 'Twitch' },
  { icon: <FaYoutube />, url: '#', label: 'YouTube' },
  { icon: <FaInstagram />, url: '#', label: 'Instagram' },
  { icon: <FaTiktok />, url: '#', label: 'TikTok' },
];

const navLinks = [
  { text: 'Règles du Jeu', url: '/rules' },
  { text: 'Jouer en Ligne', url: '/play' },
  { text: 'Classement', url: '/ranking' },
  { text: 'Communauté', url: '/community' },
  { text: 'Contact', url: '/contact' },
];

const legalLinks = [
  { text: 'CGU', url: '/terms' },
  { text: 'Politique de confidentialité', url: '/privacy' },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        background: 'linear-gradient(180deg, rgba(10,25,41,0.95) 0%, rgba(19,47,76,0.95) 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        {/* Navigation Links */}
        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          {navLinks.map((link, index) => (
            <Grid item key={index}>
              <Link
                href={link.url}
                component={motion.a}
                whileHover={{ scale: 1.1 }}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#FFD700',
                  },
                }}
              >
                {link.text}
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* Social Media Icons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          {socialLinks.map((social, index) => (
            <IconButton
              key={index}
              component={motion.a}
              href={social.url}
              whileHover={{ 
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{ duration: 0.3 }}
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mx: 1,
                '&:hover': {
                  color: '#FFD700',
                  background: 'rgba(255, 215, 0, 0.1)',
                },
              }}
              aria-label={social.label}
            >
              {social.icon}
            </IconButton>
          ))}
        </Box>

        {/* Stats Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 1 }}
          >
            49 joueurs actuellement en ligne
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            342 parties terminées aujourd'hui
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 4 }} />

        {/* Legal Links */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Link href="/terms" color="inherit" sx={{ mx: 1 }}>
            CGU
          </Link>
          <Link href="/privacy" color="inherit" sx={{ mx: 1 }}>
            Politique de Confidentialité
          </Link>
        </Box>

        {/* Copyright */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            2024 UNIT Card Game. Tous droits réservés.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
