import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  People,
  SportsEsports,
  EmojiEvents,
  Warning,
} from '@mui/icons-material';
import StatCard from './StatCard';

const Overview: React.FC = () => {
  // Mock data - À remplacer par des données réelles
  const stats = {
    activeUsers: 1234,
    gamesPlayed: 5678,
    activeTournaments: 3,
    reportedUsers: 12,
  };

  const recentActivities = [
    {
      type: 'tournament',
      message: 'Nouveau tournoi créé : Grand Prix UNIT',
      time: '2 minutes ago',
    },
    {
      type: 'user',
      message: 'Utilisateur signalé : xXDarkPlayer99Xx',
      time: '5 minutes ago',
    },
    {
      type: 'game',
      message: 'Record de parties simultanées atteint : 156',
      time: '15 minutes ago',
    },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Statistiques principales */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Utilisateurs Actifs"
            value={stats.activeUsers}
            icon={<People />}
            color="#4CAF50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Parties Jouées"
            value={stats.gamesPlayed}
            icon={<SportsEsports />}
            color="#2196F3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Tournois Actifs"
            value={stats.activeTournaments}
            icon={<EmojiEvents />}
            color="#FF9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Utilisateurs Signalés"
            value={stats.reportedUsers}
            icon={<Warning />}
            color="#f44336"
          />
        </Grid>

        {/* Graphiques et statistiques détaillées */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Activité du site
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Remplacer par un vrai graphique */}
              <Typography color="text.secondary">
                Graphique d'activité à implémenter
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Activités récentes */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Activités Récentes
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      {activity.type === 'tournament' && <EmojiEvents />}
                      {activity.type === 'user' && <People />}
                      {activity.type === 'game' && <SportsEsports />}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.message}
                      secondary={activity.time}
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Section des performances */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Performance du Système
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" gutterBottom>
                  Utilisation CPU
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={65} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography variant="caption" color="text.secondary">
                  65% utilisé
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" gutterBottom>
                  Mémoire
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={45} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography variant="caption" color="text.secondary">
                  45% utilisé
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" gutterBottom>
                  Stockage
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={30} 
                  sx={{ height: 10, borderRadius: 5 }}
                />
                <Typography variant="caption" color="text.secondary">
                  30% utilisé
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;
