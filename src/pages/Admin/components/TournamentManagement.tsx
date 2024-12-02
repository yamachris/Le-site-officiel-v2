import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  EmojiEvents as TrophyIcon,
  Add as AddIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

interface Tournament {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  format: string;
  maxParticipants: number;
  currentParticipants: number;
  prizePool: string;
}

const mockTournaments: Tournament[] = [
  {
    id: 1,
    name: "Grand Tournoi d'Hiver",
    startDate: '2024-01-15T10:00',
    endDate: '2024-01-16T18:00',
    status: 'upcoming',
    format: 'Élimination directe',
    maxParticipants: 64,
    currentParticipants: 45,
    prizePool: '1000 Points + Skin Exclusif'
  },
  {
    id: 2,
    name: "Championnat Mensuel",
    startDate: '2024-02-01T15:00',
    endDate: '2024-02-01T22:00',
    status: 'registration',
    format: 'Suisse',
    maxParticipants: 128,
    currentParticipants: 85,
    prizePool: '500 Points'
  }
];

const TournamentManagement: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleAddTournament = () => {
    setSelectedTournament(null);
    setStartDate('');
    setEndDate('');
    setOpenDialog(true);
  };

  const handleEditTournament = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setStartDate(tournament.startDate);
    setEndDate(tournament.endDate);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTournament(null);
    setStartDate('');
    setEndDate('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'primary';
      case 'registration':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'completed':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'À venir';
      case 'registration':
        return 'Inscriptions ouvertes';
      case 'in_progress':
        return 'En cours';
      case 'completed':
        return 'Terminé';
      default:
        return status;
    }
  };

  return (
    <Box>
      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrophyIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Tournois Actifs</Typography>
              </Box>
              <Typography variant="h4">3</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Participants</Typography>
              </Box>
              <Typography variant="h4">130</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ScheduleIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">À Venir</Typography>
              </Box>
              <Typography variant="h4">5</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tournaments Table */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="h2">
          Gestion des Tournois
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddTournament}
        >
          Créer un Tournoi
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Date de début</TableCell>
              <TableCell>Date de fin</TableCell>
              <TableCell>Format</TableCell>
              <TableCell>Participants</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTournaments.map((tournament) => (
              <TableRow key={tournament.id}>
                <TableCell>{tournament.name}</TableCell>
                <TableCell>{new Date(tournament.startDate).toLocaleString()}</TableCell>
                <TableCell>{new Date(tournament.endDate).toLocaleString()}</TableCell>
                <TableCell>{tournament.format}</TableCell>
                <TableCell>
                  {tournament.currentParticipants}/{tournament.maxParticipants}
                </TableCell>
                <TableCell>{tournament.prizePool}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(tournament.status)}
                    color={getStatusColor(tournament.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditTournament(tournament)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Tournament Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTournament ? 'Modifier le Tournoi' : 'Créer un Nouveau Tournoi'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Nom du tournoi"
              fullWidth
              value={selectedTournament?.name || ''}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Date de début"
                  type="datetime-local"
                  fullWidth
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Date de fin"
                  type="datetime-local"
                  fullWidth
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <InputLabel>Format</InputLabel>
              <Select
                value={selectedTournament?.format || ''}
                label="Format"
              >
                <MenuItem value="Élimination directe">Élimination directe</MenuItem>
                <MenuItem value="Suisse">Suisse</MenuItem>
                <MenuItem value="Poules">Poules</MenuItem>
                <MenuItem value="Double élimination">Double élimination</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nombre maximum de participants"
                  type="number"
                  fullWidth
                  value={selectedTournament?.maxParticipants || ''}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Prix"
                  fullWidth
                  value={selectedTournament?.prizePool || ''}
                />
              </Grid>
            </Grid>
            <FormControl fullWidth>
              <InputLabel>Statut</InputLabel>
              <Select
                value={selectedTournament?.status || 'upcoming'}
                label="Statut"
              >
                <MenuItem value="upcoming">À venir</MenuItem>
                <MenuItem value="registration">Inscriptions ouvertes</MenuItem>
                <MenuItem value="in_progress">En cours</MenuItem>
                <MenuItem value="completed">Terminé</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedTournament ? 'Sauvegarder' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TournamentManagement;
