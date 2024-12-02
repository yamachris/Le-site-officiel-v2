import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Cancel as CrossIcon,
  Star as StarIcon,
  Analytics as AnalyticsIcon,
  EmojiEvents as TrophyIcon,
  VideoLibrary as VideoIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';

const features = [
  {
    name: 'Classement mondial',
    free: true,
    premium: true,
  },
  {
    name: 'Statistiques avancées',
    free: false,
    premium: true,
  },
  {
    name: 'Récompenses premium',
    free: false,
    premium: true,
  },
  {
    name: 'Tournois prioritaires',
    free: false,
    premium: true,
  },
  {
    name: 'Contenu exclusif',
    free: false,
    premium: true,
  },
  {
    name: 'Support prioritaire',
    free: false,
    premium: true,
  },
];

const premiumFeatures = [
  {
    icon: <AnalyticsIcon fontSize="large" />,
    title: 'Statistiques Avancées',
    description: 'Analysez en détail vos performances et progressez plus rapidement',
  },
  {
    icon: <TrophyIcon fontSize="large" />,
    title: 'Récompenses Exclusives',
    description: 'Débloquez des skins et des titres uniques réservés aux membres Premium',
  },
  {
    icon: <VideoIcon fontSize="large" />,
    title: 'Contenu Premium',
    description: 'Accédez à des tutoriels avancés et des stratégies exclusives',
  },
  {
    icon: <SpeedIcon fontSize="large" />,
    title: 'Priorité Tournois',
    description: 'Inscrivez-vous en avant-première aux tournois majeurs',
  },
];

const PremiumSection: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      {/* En-tête Premium */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Passez au niveau supérieur avec UNIT Premium
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Débloquez des fonctionnalités exclusives et améliorez votre expérience de jeu
        </Typography>
      </Box>

      {/* Grille des fonctionnalités Premium */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {premiumFeatures.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tableau comparatif */}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fonctionnalité</TableCell>
              <TableCell align="center">Gratuit</TableCell>
              <TableCell align="center">Premium</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((feature, index) => (
              <TableRow key={index}>
                <TableCell>{feature.name}</TableCell>
                <TableCell align="center">
                  {feature.free ? (
                    <CheckIcon color="success" />
                  ) : (
                    <CrossIcon color="error" />
                  )}
                </TableCell>
                <TableCell align="center">
                  <CheckIcon color="success" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Section prix et CTA */}
      <Box sx={{ textAlign: 'center' }}>
        <Card sx={{ display: 'inline-block', minWidth: 300, mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Abonnement Premium
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="h3" component="span">
                9,99€
              </Typography>
              <Typography variant="subtitle1" component="span">
                /mois
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Annulation possible à tout moment
            </Typography>
            <Button
              variant="contained"
              size="large"
              fullWidth
              startIcon={<StarIcon />}
            >
              Devenir Premium
            </Button>
          </CardContent>
        </Card>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            En vous abonnant, vous acceptez nos conditions d'utilisation
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PremiumSection;
