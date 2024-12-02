import React from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { IoMdArrowBack } from 'react-icons/io';
import { FaQuestionCircle } from 'react-icons/fa';

interface CardDetailsProps {
  cardType: string;
  onBack: () => void;
}

const cardData = {
  general: {
    title: 'Règles générales',
    description: 'Les bases du jeu et les principes fondamentaux',
    rules: [
      'Le jeu se joue avec un deck de 52 cartes',
      'Chaque joueur commence avec 7 cartes en main',
      'Le but est d\'être le premier à se débarrasser de toutes ses cartes',
    ],
    strategies: [
      'Gardez un œil sur le nombre de cartes de vos adversaires',
      'Planifiez vos combinaisons à l\'avance',
      'Utilisez les cartes spéciales stratégiquement',
    ],
    faq: [
      {
        question: 'Combien de cartes peut-on jouer par tour ?',
        answer: 'Vous pouvez jouer autant de cartes que vous le souhaitez tant qu\'elles forment une combinaison valide.',
      },
      {
        question: 'Que se passe-t-il si je ne peux pas jouer ?',
        answer: 'Si vous ne pouvez pas jouer, vous devez piocher une carte.',
      },
    ],
  },
  king: {
    title: 'Le Roi',
    description: 'La carte la plus puissante du jeu',
    rules: [
      'Le Roi peut être joué sur n\'importe quelle carte',
      'Il peut changer la couleur du jeu',
      'Vous pouvez jouer plusieurs Rois à la fois',
    ],
    strategies: [
      'Gardez le Roi pour les moments critiques',
      'Utilisez-le pour bloquer les adversaires',
      'Combinez-le avec d\'autres cartes puissantes',
    ],
    faq: [
      {
        question: 'Peut-on jouer un Roi sur un autre Roi ?',
        answer: 'Oui, vous pouvez jouer un Roi sur un autre Roi.',
      },
    ],
  },
  queen: {
    title: 'La Dame',
    description: 'Une carte très versatile',
    rules: [
      'La Dame peut être jouée sur toute carte de même couleur',
      'Elle permet de piocher une carte supplémentaire',
      'Peut être combinée avec d\'autres Dames',
    ],
    strategies: [
      'Utilisez la Dame pour rafraîchir votre main',
      'Créez des combos avec plusieurs Dames',
      'Gardez-la comme carte de secours',
    ],
    faq: [
      {
        question: 'Doit-on piocher immédiatement après avoir joué une Dame ?',
        answer: 'Oui, la pioche doit être effectuée immédiatement après avoir joué la Dame.',
      },
    ],
  },
  jack: {
    title: 'Le Valet',
    description: 'Le maître du changement',
    rules: [
      'Le Valet permet de changer la couleur du jeu',
      'Il peut être joué sur n\'importe quelle carte',
      'Annonce la couleur suivante obligatoire',
    ],
    strategies: [
      'Utilisez le Valet pour faciliter vos prochains coups',
      'Choisissez une couleur dont vous avez plusieurs cartes',
      'Bloquez les adversaires en choisissant une couleur qu\'ils n\'ont pas',
    ],
    faq: [
      {
        question: 'Peut-on jouer une carte d\'une autre couleur après un Valet ?',
        answer: 'Non, la prochaine carte doit être de la couleur annoncée par le Valet.',
      },
    ],
  },
  joker: {
    title: 'Le Joker',
    description: 'La carte la plus imprévisible',
    rules: [
      'Le Joker peut copier n\'importe quelle carte',
      'Il peut être joué à tout moment',
      'Son effet dure jusqu\'au prochain tour',
    ],
    strategies: [
      'Gardez le Joker pour les situations critiques',
      'Copiez les effets des cartes puissantes',
      'Utilisez-le pour surprendre vos adversaires',
    ],
    faq: [
      {
        question: 'Peut-on utiliser le Joker comme une carte normale ?',
        answer: 'Non, le Joker doit toujours copier une carte déjà jouée.',
      },
    ],
  },
  lucky7: {
    title: '7 de Chance',
    description: 'La carte qui peut tout changer',
    rules: [
      'Le 7 inverse l\'ordre du jeu',
      'Il peut être joué sur n\'importe quelle carte',
      'Plusieurs 7 peuvent être joués à la suite',
    ],
    strategies: [
      'Utilisez le 7 pour perturber les plans des adversaires',
      'Jouez-le quand un adversaire a peu de cartes',
      'Combinez-le avec d\'autres cartes spéciales',
    ],
    faq: [
      {
        question: 'Que se passe-t-il si plusieurs 7 sont joués ?',
        answer: 'Chaque 7 inverse le sens du jeu, donc deux 7 s\'annulent.',
      },
    ],
  },
  revolution10: {
    title: '10 Révolution',
    description: 'La carte qui change les règles',
    rules: [
      'Le 10 change toutes les valeurs du jeu',
      'Les cartes faibles deviennent fortes et vice-versa',
      'L\'effet dure jusqu\'au prochain 10',
    ],
    strategies: [
      'Jouez le 10 quand vous avez beaucoup de petites cartes',
      'Attendez le bon moment pour maximiser son effet',
      'Utilisez-le pour contrer les stratégies adverses',
    ],
    faq: [
      {
        question: 'Les effets spéciaux des cartes sont-ils aussi inversés ?',
        answer: 'Non, seules les valeurs numériques sont affectées par le 10.',
      },
    ],
  },
  units: {
    title: 'Les Unités',
    description: 'Les cartes de base du jeu',
    rules: [
      'Les unités vont de 1 à 10',
      'Elles doivent être jouées sur une carte de même couleur ou valeur',
      'Peuvent être combinées en suites ou paires',
    ],
    strategies: [
      'Construisez des suites pour vous débarrasser de plusieurs cartes',
      'Gardez un équilibre entre les couleurs',
      'Utilisez les unités pour préparer vos cartes spéciales',
    ],
    faq: [
      {
        question: 'Peut-on jouer plusieurs unités à la fois ?',
        answer: 'Oui, si elles forment une suite ou sont de même valeur.',
      },
    ],
  },
};

const CardDetails: React.FC<CardDetailsProps> = ({ cardType, onBack }) => {
  const data = cardData[cardType as keyof typeof cardData];

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
      <Button
        onClick={onBack}
        startIcon={<IoMdArrowBack />}
        sx={{
          mb: 4,
          color: 'white',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        Retour
      </Button>

      <Paper
        sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontFamily: 'Orbitron',
            color: 'white',
          }}
        >
          {data.title}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          {data.description}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: 'white',
                fontFamily: 'Orbitron',
              }}
            >
              Règles
            </Typography>
            <Box component="ul" sx={{ color: 'rgba(255, 255, 255, 0.8)', pl: 2 }}>
              {data.rules.map((rule, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  {rule}
                </Box>
              ))}
            </Box>

            <Typography
              variant="h6"
              sx={{
                mt: 4,
                mb: 2,
                color: 'white',
                fontFamily: 'Orbitron',
              }}
            >
              Stratégies
            </Typography>
            <Box component="ul" sx={{ color: 'rgba(255, 255, 255, 0.8)', pl: 2 }}>
              {data.strategies.map((strategy, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  {strategy}
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: 'white',
                fontFamily: 'Orbitron',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <FaQuestionCircle /> FAQ
            </Typography>
            <Box>
              {data.faq.map((item, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      mb: 1,
                    }}
                  >
                    {item.question}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                    }}
                  >
                    {item.answer}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CardDetails;
