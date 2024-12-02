import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaTrophy, FaCalendarAlt, FaMedal } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

interface Tournament {
  id: number;
  name: string;
  date: string;
  participants: number;
  prizePool: string;
}

interface PastWinner {
  rank: number;
  name: string;
  tournament: string;
  prize: string;
}

const upcomingTournaments: Tournament[] = [
  {
    id: 1,
    name: 'UNIT World Championship',
    date: '15 décembre 2024',
    participants: 128,
    prizePool: '1000€',
  },
  {
    id: 2,
    name: 'Tournoi Hebdomadaire',
    date: '25 novembre 2024',
    participants: 32,
    prizePool: '100€',
  },
];

const pastWinners: PastWinner[] = [
  {
    rank: 1,
    name: 'CardMaster',
    tournament: 'UNIT Masters 2023',
    prize: '500€',
  },
  {
    rank: 2,
    name: 'StrategyKing',
    tournament: 'UNIT Open 2023',
    prize: '300€',
  },
  {
    rank: 3,
    name: 'TacticalGuru',
    tournament: 'Weekly Challenge',
    prize: '100€',
  },
];

const TournamentSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        background: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: 'Orbitron',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mb: 3,
        }}
      >
        <FaTrophy style={{ color: '#FFD700' }} /> Tournois
      </Typography>

      {/* Upcoming Tournaments */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Prochains événements
        </Typography>
        {upcomingTournaments.map((tournament, index) => (
          <motion.div
            key={tournament.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Box
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 1,
                backgroundColor: 'background.default',
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {tournament.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FaCalendarAlt />
                  <span>{tournament.date}</span>
                </Box>
                <span>|</span>
                <span>{tournament.participants} participants</span>
                <span>|</span>
                <span>Prix : {tournament.prizePool}</span>
              </Box>
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderRadius: 1,
                  textTransform: 'none',
                }}
              >
                S'inscrire
              </Button>
            </Box>
          </motion.div>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Past Winners */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Derniers vainqueurs
        </Typography>
        <List>
          {pastWinners.map((winner, index) => (
            <motion.div
              key={winner.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor:
                        winner.rank === 1
                          ? '#FFD700'
                          : winner.rank === 2
                          ? '#C0C0C0'
                          : '#CD7F32',
                    }}
                  >
                    <FaMedal />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={winner.name}
                  secondary={`${winner.tournament} - ${winner.prize}`}
                />
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default TournamentSection;
