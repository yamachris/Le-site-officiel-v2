import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Button,
  Badge,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Person as PersonIcon,
  Stars as StarsIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
  PhotoCamera as PhotoCameraIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface UserStats {
  elo: number;
  rank: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
  eloHistory: number[];
  isPremium: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const initialStats: UserStats = {
  elo: 1200,
  rank: "Bronze",
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  winRate: 0,
  eloHistory: [1200, 1220, 1180, 1210, 1240, 1200, 1260],
  isPremium: false,
};

const achievements: Achievement[] = [
  {
    id: 'first_win',
    title: 'Première Victoire',
    description: 'Gagnez votre première partie',
    icon: '🏆',
    unlocked: false,
  },
  {
    id: 'win_streak',
    title: 'Sur une lancée',
    description: 'Gagnez 3 parties d\'affilée',
    icon: '🔥',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
  },
  {
    id: 'rank_up',
    title: 'En progression',
    description: 'Atteignez le rang Argent',
    icon: '⭐',
    unlocked: false,
  },
  {
    id: 'collector',
    title: 'Collectionneur',
    description: 'Obtenez 50 cartes différentes',
    icon: '📚',
    unlocked: false,
    progress: 23,
    maxProgress: 50,
  },
];

const UserProfile: React.FC = () => {
  const [stats, setStats] = useState<UserStats>(initialStats);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [openAchievements, setOpenAchievements] = useState(false);
  const [openPremium, setOpenPremium] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const username = localStorage.getItem('username') || 'New';

  useEffect(() => {
    // Charger l'avatar sauvegardé
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatarUrl(savedAvatar);
    }
  }, []);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarUrl(base64String);
        localStorage.setItem('userAvatar', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePremiumPurchase = (plan: 'monthly' | 'yearly') => {
    // Simuler l'achat premium
    setStats(prev => ({ ...prev, isPremium: true }));
    localStorage.setItem('isPremium', 'true');
    setOpenPremium(false);
  };

  const getNextRank = () => {
    const ranks = ["Bronze", "Argent", "Or", "Platine", "Diamant"];
    const currentRankIndex = ranks.indexOf(stats.rank);
    return currentRankIndex < ranks.length - 1 ? ranks[currentRankIndex + 1] : stats.rank;
  };

  const getProgressToNextRank = () => {
    return ((stats.elo - 1200) % 300) / 3;
  };

  const chartData = {
    labels: ['J-6', 'J-5', 'J-4', 'J-3', 'J-2', 'J-1', 'Aujourd\'hui'],
    datasets: [
      {
        label: 'ELO',
        data: stats.eloHistory,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Évolution ELO',
      },
    },
    scales: {
      y: {
        min: Math.min(...stats.eloHistory) - 50,
        max: Math.max(...stats.eloHistory) + 50,
      },
    },
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* En-tête du profil */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <IconButton
                    size="small"
                    sx={{
                      bgcolor: 'primary.main',
                      '&:hover': { bgcolor: 'primary.dark' },
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <PhotoCameraIcon sx={{ fontSize: 20, color: 'white' }} />
                  </IconButton>
                }
              >
                <Avatar
                  src={avatarUrl || undefined}
                  sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}
                >
                  {!avatarUrl && <PersonIcon sx={{ fontSize: 60 }} />}
                </Avatar>
              </Badge>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                {username}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Membre depuis {new Date().toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                startIcon={<TrophyIcon />}
                onClick={() => setOpenAchievements(true)}
              >
                Succès
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Statistiques */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StarsIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Classement</Typography>
                </Box>
                <Typography variant="h4" gutterBottom>{stats.elo} ELO</Typography>
                <Typography variant="body2" color="textSecondary">
                  Rang actuel : {stats.rank}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Prochain rang : {getNextRank()}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={getProgressToNextRank()} 
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TrophyIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Statistiques</Typography>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Parties jouées
                    </Typography>
                    <Typography variant="h6">{stats.gamesPlayed}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Victoires
                    </Typography>
                    <Typography variant="h6">{stats.wins}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Défaites
                    </Typography>
                    <Typography variant="h6">{stats.losses}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="textSecondary">
                      Ratio V/D
                    </Typography>
                    <Typography variant="h6">{stats.winRate}%</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TimelineIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Progression</Typography>
                </Box>
                <Box sx={{ height: 200 }}>
                  <Line data={chartData} options={chartOptions} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Section Premium */}
        {!stats.isPremium ? (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StarsIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5">Passez à la version Premium !</Typography>
            </Box>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                  Avantages Premium :
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                      <Typography>Cartes exclusives</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                      <Typography>Statistiques détaillées</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                      <Typography>Avatars personnalisés</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                      <Typography>Tournois VIP</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                      <Typography>Chat exclusif</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircleIcon color="primary" sx={{ mr: 1 }} />
                      <Typography>Récompenses bonus</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setOpenPremium(true)}
                  sx={{ mb: 2 }}
                >
                  Devenir Premium
                </Button>
                <Typography variant="body2" color="textSecondary" align="center">
                  À partir de 4.99€/mois
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <StarsIcon sx={{ mr: 1 }} />
              <Typography variant="h5">Compte Premium Actif</Typography>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Profitez de tous vos avantages premium !
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => window.open('/profile/premium-benefits', '_blank')}
            >
              Voir mes avantages
            </Button>
          </Paper>
        )}

        {/* Dialog Premium */}
        <Dialog
          open={openPremium}
          onClose={() => setOpenPremium(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Choisissez votre formule Premium</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                  onClick={() => handlePremiumPurchase('monthly')}
                >
                  <Typography variant="h6" gutterBottom>
                    Mensuel
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    4.99€
                  </Typography>
                  <Typography variant="body2" color="textSecondary" align="center">
                    par mois
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Choisir
                  </Button>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                  onClick={() => handlePremiumPurchase('yearly')}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: -30,
                      bgcolor: 'secondary.main',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      transform: 'rotate(45deg)',
                    }}
                  >
                    <Typography variant="body2">-20%</Typography>
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    Annuel
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    47.88€
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }} align="center">
                    soit 3.99€/mois
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Choisir
                  </Button>
                </Paper>
              </Grid>
            </Grid>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 3, textAlign: 'center' }}>
              Paiement sécurisé • Annulation à tout moment • Satisfait ou remboursé
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPremium(false)}>Fermer</Button>
          </DialogActions>
        </Dialog>

        {/* Dialog des succès */}
        <Dialog
          open={openAchievements}
          onClose={() => setOpenAchievements(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Succès</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {achievements.map((achievement) => (
                <Grid item xs={12} key={achievement.id}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      opacity: achievement.unlocked ? 1 : 0.7,
                    }}
                  >
                    <Box sx={{ mr: 2, fontSize: '2rem' }}>
                      {achievement.unlocked ? achievement.icon : <LockIcon />}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{achievement.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {achievement.description}
                      </Typography>
                      {achievement.progress !== undefined && (
                        <LinearProgress
                          variant="determinate"
                          value={(achievement.progress / (achievement.maxProgress || 1)) * 100}
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAchievements(false)}>Fermer</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default UserProfile;
