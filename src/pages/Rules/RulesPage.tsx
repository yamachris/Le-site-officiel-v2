import React, { useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import RuleCard from './components/RuleCard';
import CardDetails from './components/CardDetails';
import { GiChessKing, GiChessQueen, GiChessKnight, GiCardPlay, GiCardRandom } from 'react-icons/gi';
import { FaJedi, FaDice } from 'react-icons/fa';

const cardTypes = [
  {
    id: 'general',
    title: 'Règles générales',
    icon: <GiCardPlay />,
    description: 'Les bases du jeu et les principes fondamentaux',
    color: '#4A90E2',
  },
  {
    id: 'king',
    title: 'Le Roi',
    icon: <GiChessKing />,
    description: 'Contrôlez le plateau avec le Roi',
    color: '#FFD700',
  },
  {
    id: 'queen',
    title: 'La Dame',
    icon: <GiChessQueen />,
    description: 'Utilisez la puissance de la Dame',
    color: '#E85B81',
  },
  {
    id: 'jack',
    title: 'Le Valet',
    icon: <GiChessKnight />,
    description: 'Maîtrisez les mouvements du Valet',
    color: '#50C878',
  },
  {
    id: 'joker',
    title: 'Le Joker',
    icon: <FaJedi />,
    description: 'Découvrez les pouvoirs spéciaux du Joker',
    color: '#9B59B6',
  },
  {
    id: 'lucky7',
    title: '7 de Chance',
    icon: <FaDice />,
    description: 'Tentez votre chance avec le 7',
    color: '#E67E22',
  },
  {
    id: 'revolution10',
    title: '10 Révolution',
    icon: <GiCardRandom />,
    description: 'Changez le cours du jeu avec le 10',
    color: '#E74C3C',
  },
  {
    id: 'units',
    title: 'Les Unités',
    icon: <GiCardPlay />,
    description: 'Apprenez à utiliser les cartes de base',
    color: '#3498DB',
  },
];

const RulesPage = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(10,25,41,0.95) 0%, rgba(19,47,76,0.95) 100%)',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
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
            Règles du Jeu
          </Typography>

          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 8,
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Découvrez toutes les règles et devenez un maître du jeu UNIT. Cliquez sur une carte pour en savoir plus.
          </Typography>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedCard ? (
            <Grid container spacing={3}>
              {cardTypes.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={card.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <RuleCard
                      {...card}
                      onClick={() => setSelectedCard(card.id)}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <CardDetails
                cardType={selectedCard}
                onBack={() => setSelectedCard(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default RulesPage;
