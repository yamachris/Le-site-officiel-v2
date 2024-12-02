import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaSearch, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

interface Player {
  id: number;
  rank: number;
  name: string;
  avatar: string;
  elo: number;
  wins: number;
  losses: number;
  region: string;
}

const players: Player[] = [
  {
    id: 1,
    rank: 1,
    name: 'CardMaster',
    avatar: 'https://i.pravatar.cc/150?img=1',
    elo: 3200,
    wins: 450,
    losses: 150,
    region: 'EU',
  },
  {
    id: 2,
    rank: 2,
    name: 'StrategyKing',
    avatar: 'https://i.pravatar.cc/150?img=2',
    elo: 2800,
    wins: 380,
    losses: 140,
    region: 'NA',
  },
  {
    id: 3,
    rank: 3,
    name: 'TacticalGuru',
    avatar: 'https://i.pravatar.cc/150?img=3',
    elo: 2400,
    wins: 320,
    losses: 160,
    region: 'EU',
  },
  // Ajoutez plus de joueurs ici
];

const RankingTable: React.FC = () => {
  const theme = useTheme();
  const [filter, setFilter] = useState('global');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaTrophy style={{ color: '#FFD700' }} />;
      case 2:
        return <FaMedal style={{ color: '#C0C0C0' }} />;
      case 3:
        return <FaMedal style={{ color: '#CD7F32' }} />;
      default:
        return rank;
    }
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        background: theme.palette.background.paper,
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Orbitron' }}>
          Classement des joueurs
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 2,
          }}
        >
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilterChange}
            aria-label="ranking filter"
            size="small"
          >
            <ToggleButton value="global" aria-label="global ranking">
              <FaGlobe style={{ marginRight: '8px' }} /> Global
            </ToggleButton>
            <ToggleButton value="regional" aria-label="regional ranking">
              <FaMapMarkerAlt style={{ marginRight: '8px' }} /> Régional
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            size="small"
            placeholder="Rechercher un joueur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <FaSearch style={{ marginRight: '8px' }} />,
            }}
          />
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rang</TableCell>
              <TableCell>Joueur</TableCell>
              <TableCell align="right">Score Elo</TableCell>
              <TableCell align="right">V/D</TableCell>
              <TableCell align="right">Ratio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPlayers.map((player, index) => (
              <motion.tr
                key={player.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                style={{
                  display: 'table-row',
                }}
              >
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    {getRankIcon(player.rank)}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={player.avatar} />
                    <Typography
                      sx={{
                        fontWeight: player.rank <= 3 ? 'bold' : 'normal',
                        color: player.rank === 1 ? '#FFD700' : 'inherit',
                      }}
                    >
                      {player.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{player.elo}</TableCell>
                <TableCell align="right">
                  {player.wins}/{player.losses}
                </TableCell>
                <TableCell align="right">
                  {((player.wins / (player.wins + player.losses)) * 100).toFixed(1)}%
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RankingTable;
