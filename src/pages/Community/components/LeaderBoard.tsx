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
  Popover,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaCrown } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

interface Player {
  rank: number;
  name: string;
  score: number;
  wins: number;
  gamesPlayed: number;
}

const players: Player[] = [
  { rank: 1, name: 'CardMaster', score: 3200, wins: 450, gamesPlayed: 600 },
  { rank: 2, name: 'StrategyKing', score: 2800, wins: 380, gamesPlayed: 520 },
  { rank: 3, name: 'TacticalGuru', score: 2400, wins: 320, gamesPlayed: 480 },
  { rank: 4, name: 'UnitPro', score: 2200, wins: 290, gamesPlayed: 450 },
  { rank: 5, name: 'GameWizard', score: 2000, wins: 260, gamesPlayed: 420 },
];

const LeaderBoard: React.FC = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement>,
    player: Player
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedPlayer(player);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedPlayer(null);
  };

  const open = Boolean(anchorEl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
          }}
        >
          <FaCrown style={{ color: '#FFD700' }} /> Meilleurs Joueurs
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rang</TableCell>
                <TableCell>Joueur</TableCell>
                <TableCell align="right">Score Elo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((player) => (
                <TableRow
                  key={player.rank}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      cursor: 'pointer',
                    },
                  }}
                  onMouseEnter={(e) => handlePopoverOpen(e, player)}
                  onMouseLeave={handlePopoverClose}
                >
                  <TableCell
                    sx={{
                      color:
                        player.rank === 1
                          ? '#FFD700'
                          : player.rank === 2
                          ? '#C0C0C0'
                          : player.rank === 3
                          ? '#CD7F32'
                          : 'inherit',
                      fontWeight: player.rank <= 3 ? 'bold' : 'normal',
                    }}
                  >
                    {player.rank}
                  </TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell align="right">{player.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          sx={{
            pointerEvents: 'none',
          }}
        >
          {selectedPlayer && (
            <Box sx={{ p: 2, maxWidth: 200 }}>
              <Typography variant="subtitle1" gutterBottom>
                {selectedPlayer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Victoires: {selectedPlayer.wins}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Parties jouées: {selectedPlayer.gamesPlayed}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ratio: {((selectedPlayer.wins / selectedPlayer.gamesPlayed) * 100).toFixed(1)}%
              </Typography>
            </Box>
          )}
        </Popover>
      </Paper>
    </motion.div>
  );
};

export default LeaderBoard;
