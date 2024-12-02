import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  IconButton,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  Edit as EditIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
  Star as StarIcon,
  Lock as LockIcon,
  PhotoCamera as CameraIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Types pour les données du joueur
interface PlayerStats {
  elo: number;
  rank: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  winRate: number;
}

interface EloHistory {
  date: string;
  elo: number;
}

// Données mockées
const mockPlayerStats: PlayerStats = {
  elo: 2350,
  rank: 'A',
  gamesPlayed: 456,
  wins: 278,
  losses: 178,
  winRate: 61,
};

const mockEloHistory: EloHistory[] = [
  { date: '2024-01-01', elo: 2200 },
  { date: '2024-01-08', elo: 2250 },
  { date: '2024-01-15', elo: 2280 },
  { date: '2024-01-22', elo: 2320 },
  { date: '2024-01-29', elo: 2350 },
];

// Configuration du graphique Elo
const eloChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Progression Elo',
    },
  },
  scales: {
    y: {
      min: 1800,
      max: 2600,
    },
  },
};

const eloChartData = {
  labels: mockEloHistory.map(entry => entry.date),
  datasets: [
    {
      label: 'Score Elo',
      data: mockEloHistory.map(entry => entry.elo),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const PlayerProfile: React.FC = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [username, setUsername] = useState('PlayerOne');
  const [avatarUrl, setAvatarUrl] = useState('/default-avatar.png');

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'SSS':
        return '#FFD700';
      case 'SS':
        return '#C0C0C0';
      case 'S':
        return '#CD7F32';
      case 'A':
        return '#FF4081';
      case 'B':
        return '#2196F3';
      case 'C':
        return '#4CAF50';
      case 'D':
        return '#9E9E9E';
      default:
        return '#9E9E9E';
    }
  };

  const getNextRankProgress = () => {
    const currentElo = mockPlayerStats.elo;
    let progress = 0;
    let nextRank = '';

    if (currentElo < 1400) {
      progress = (currentElo - 1000) / 4;
      nextRank = 'C';
    } else if (currentElo < 1800) {
      progress = (currentElo - 1400) / 4;
      nextRank = 'B';
    } else if (currentElo < 2200) {
      progress = (currentElo - 1800) / 4;
      nextRank = 'A';
    } else if (currentElo < 2600) {
      progress = (currentElo - 2200) / 4;
      nextRank = 'S';
    } else if (currentElo < 2900) {
      progress = (currentElo - 2600) / 3;
      nextRank = 'SS';
    } else {
      progress = (currentElo - 2900) / 3;
      nextRank = 'SSS';
    }

    return { progress, nextRank };
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* En-tête du profil */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={avatarUrl}
                sx={{ width: 120, height: 120 }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'background.paper',
                }}
                size="small"
              >
                <CameraIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4">{username}</Typography>
              <IconButton onClick={() => setOpenEditDialog(true)}>
                <EditIcon />
              </IconButton>
              <Chip
                label={mockPlayerStats.rank}
                sx={{
                  backgroundColor: getRankColor(mockPlayerStats.rank),
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            </Box>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Score Elo : {mockPlayerStats.elo}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Progression vers le rang {getNextRankProgress().nextRank}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getNextRankProgress().progress}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Statistiques */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistiques
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Parties jouées
                  </Typography>
                  <Typography variant="h5">
                    {mockPlayerStats.gamesPlayed}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Victoires
                  </Typography>
                  <Typography variant="h5" color="success.main">
                    {mockPlayerStats.wins}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Défaites
                  </Typography>
                  <Typography variant="h5" color="error.main">
                    {mockPlayerStats.losses}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Taux de victoire
                  </Typography>
                  <Typography variant="h5">
                    {mockPlayerStats.winRate}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Graphique Elo */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Line options={eloChartOptions} data={eloChartData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Section Premium */}
        <Grid item xs={12}>
          <Card sx={{ position: 'relative', overflow: 'hidden' }}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
                zIndex: 1,
              }}
            >
              <LockIcon sx={{ fontSize: 48, color: 'white' }} />
              <Typography variant="h6" color="white" align="center">
                Accédez aux statistiques avancées avec l'abonnement Premium
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<StarIcon />}
              >
                Devenir Premium
              </Button>
            </Box>
            <CardContent sx={{ height: 200, filter: 'blur(4px)' }}>
              {/* Contenu flouté */}
              <Typography variant="h6">Statistiques Avancées</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog de modification du profil */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Modifier le profil</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<CameraIcon />}
            >
              Changer l'avatar
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  // Logique pour changer l'avatar
                }}
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Annuler</Button>
          <Button
            variant="contained"
            onClick={() => setOpenEditDialog(false)}
          >
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PlayerProfile;
