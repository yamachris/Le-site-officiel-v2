// Importation des dépendances nécessaires
import React, { useState, useRef } from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlay, FaBook, FaUsers } from 'react-icons/fa';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import StatsBar from './StatsBar';
import FeatureGrid from './FeatureGrid';

// Liste des messages positifs qui seront affichés sur la carte
const positiveMessages = [
  "Super boulot !",
  "Faites une pause",
  "Chaque pas compte",
  "Respirez doucement",
  "Belle progression",
  "Continuez ainsi",
  "Gardez le rythme",
  "Bravo à vous !",
  "Prenez votre temps",
  "Persévérez !",
  "Vous progressez",
  "Reposez-vous",
  "Excellent travail",
  "Appréciez l'instant",
  "Restez concentré",
  "Vous êtes capable",
  "Encore un effort",
  "Prenez votre temps",
  "Bien joué !",
  "Gardez confiance"
];

// Composant principal HeroSection
const HeroSection = () => {
  // États pour gérer l'affichage des messages et l'animation
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [frontMessage, setFrontMessage] = useState(positiveMessages[0]); // Message face avant
  const [backMessage, setBackMessage] = useState(positiveMessages[1]); // Message face arrière
  const messageHistory = useRef<string[]>([positiveMessages[0], positiveMessages[1]]); // Historique des messages pour éviter les répétitions
  const controls = useAnimation(); // Contrôleur d'animation Framer Motion
  const isSliceRef = useRef(false); // Référence pour détecter la position de "slice"

  // Durée d'une rotation complète en secondes
  const rotationDuration = 20;

  // Fonction pour obtenir un nouveau message aléatoire
  const getRandomMessage = () => {
    let newMessage;
    // Boucle jusqu'à trouver un message qui n'est pas dans l'historique récent
    do {
      newMessage = positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
    } while (
      messageHistory.current.includes(newMessage) && 
      messageHistory.current.length < positiveMessages.length
    );

    // Ajoute le nouveau message à l'historique et supprime le plus ancien si nécessaire
    messageHistory.current.push(newMessage);
    if (messageHistory.current.length > 3) {
      messageHistory.current.shift();
    }
    return newMessage;
  };

  // Gestion de la mise à jour de la rotation
  const handleRotationUpdate = (latest: { rotateY: number }) => {
    // Calcul de la rotation normalisée (entre 0 et 360 degrés)
    const normalizedRotation = Math.abs(latest.rotateY % 360);
    // Détection de la position "slice" (entre 85-95° ou 265-275°)
    const isInSlicePosition = 
      (normalizedRotation >= 85 && normalizedRotation <= 95) || 
      (normalizedRotation >= 265 && normalizedRotation <= 275);

    // Mise à jour des messages aux positions de "slice"
    if (isInSlicePosition && !isSliceRef.current) {
      isSliceRef.current = true;
      // Alterne entre la mise à jour du message avant et arrière selon la position
      if (normalizedRotation >= 85 && normalizedRotation <= 95) {
        setBackMessage(getRandomMessage());
      } else {
        setFrontMessage(getRandomMessage());
      }
    } else if (!isInSlicePosition) {
      isSliceRef.current = false;
    }
  };

  // Définition des variants d'animation
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Conteneur principal */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(180deg, rgba(10,25,41,0.95) 0%, rgba(19,47,76,0.95) 100%)',
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 8, md: 0 },
        }}
      >
        {/* Particules d'arrière-plan animées */}
        <Box
          component={motion.div}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.1,
            backgroundImage: 'url(/hexagon-pattern.svg)',
            backgroundSize: '100px 100px',
            backgroundRepeat: 'repeat',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
        />

        {/* Conteneur principal */}
        <Container maxWidth="lg">
          {/* Pile de contenu */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Contenu texte */}
            <Box sx={{ flex: 1, zIndex: 1, py: 4 }}>
              {/* Animation de texte */}
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8 }}
              >
                {/* Titre principal */}
                <Typography
                  variant="h1"
                  sx={{
                    mb: 2,
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontFamily: 'Orbitron',
                  }}
                >
                  UNIT Card Game
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    mb: 1,
                    fontFamily: 'Orbitron',
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  Maîtrisez les cartes,{' '}
                  <Box
                    component="span"
                    sx={{
                      color: '#FFD700',
                      display: 'block',
                      fontSize: { xs: '2rem', md: '2.5rem' },
                    }}
                  >
                    Dominez vos adversaires.
                  </Box>
                </Typography>

                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    opacity: 0.8,
                    color: 'white',
                  }}
                >
                  Plongez dans un univers stratégique où chaque décision compte.
                </Typography>

                <Stack 
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ mt: 4 }}
                >
                  <Button
                    component={Link}
                    to="/play"
                    variant="contained"
                    startIcon={<FaPlay />}
                    sx={{
                      bgcolor: '#FFD700',
                      color: '#000',
                      padding: '12px 24px',
                      fontFamily: 'Orbitron',
                      fontWeight: 'bold',
                      '&:hover': {
                        bgcolor: '#FFA500',
                      },
                    }}
                  >
                    Jouer Maintenant
                  </Button>

                  <Button
                    component={Link}
                    to="/rules"
                    variant="outlined"
                    startIcon={<FaBook />}
                    sx={{
                      borderColor: '#FFD700',
                      color: '#FFD700',
                      padding: '12px 24px',
                      fontFamily: 'Orbitron',
                      fontWeight: 'bold',
                      '&:hover': {
                        borderColor: '#FFA500',
                        color: '#FFA500',
                      },
                    }}
                  >
                    Découvrir les Règles
                  </Button>

                  <Button
                    component={Link}
                    to="/chat"
                    variant="outlined"
                    startIcon={<SmartToyIcon />}
                    sx={{
                      borderColor: '#FFD700',
                      color: '#FFD700',
                      padding: '12px 24px',
                      fontFamily: 'Orbitron',
                      fontWeight: 'bold',
                      '&:hover': {
                        borderColor: '#FFA500',
                        color: '#FFA500',
                      },
                    }}
                  >
                    Assistant IA
                  </Button>

                  <Button
                    component={Link}
                    to="/community"
                    variant="outlined"
                    startIcon={<FaUsers />}
                    sx={{
                      borderColor: '#FFD700',
                      color: '#FFD700',
                      padding: '12px 24px',
                      fontFamily: 'Orbitron',
                      fontWeight: 'bold',
                      '&:hover': {
                        borderColor: '#FFA500',
                        color: '#FFA500',
                      },
                    }}
                  >
                    Rejoindre la communauté
                  </Button>
                </Stack>
              </motion.div>
            </Box>

            {/* Conteneur de l'animation 3D */}
            <Box
              component={motion.div}
              sx={{
                flex: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                perspective: '1000px',
                py: 4,
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Carte rotative */}
              <Box
                component={motion.div}
                sx={{
                  width: '300px',
                  height: '420px',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  rotateY: [0, -360],
                }}
                transition={{
                  duration: rotationDuration,
                  repeat: Infinity,
                  ease: "linear"
                }}
                onUpdate={handleRotationUpdate}
              >
                {/* Face avant de la carte */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    borderRadius: '15px',
                    boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      right: '10px',
                      bottom: '10px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '10px',
                    },
                  }}
                >
                  {/* Texte de la face avant */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: 'Orbitron',
                      fontWeight: 'bold',
                      color: '#1a237e',
                      textAlign: 'center',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      maxWidth: '90%',
                      fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' },
                      lineHeight: 1.2,
                      padding: '10px',
                      wordBreak: 'break-word'
                    }}
                  >
                    {frontMessage}
                  </Typography>
                </Box>

                {/* Face arrière de la carte */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                    borderRadius: '15px',
                    boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    transform: 'rotateY(180deg)', // Rotation pour la face arrière
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      right: '10px',
                      bottom: '10px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '10px',
                    },
                  }}
                >
                  {/* Texte de la face arrière */}
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: 'Orbitron',
                      fontWeight: 'bold',
                      color: '#1a237e',
                      textAlign: 'center',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      maxWidth: '90%',
                      fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' },
                      lineHeight: 1.2,
                      padding: '10px',
                      wordBreak: 'break-word'
                    }}
                  >
                    {backMessage}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>

        {/* Barre de statistiques */}
        <StatsBar />
      </Box>

      {/* Grille de fonctionnalités */}
      <FeatureGrid />
    </>
  );
};

export default HeroSection;
