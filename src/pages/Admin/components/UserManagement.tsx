import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  IconButton,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import API_ENDPOINTS from '../../../config/api';
import { useAuth } from '../../../contexts/AuthContext';

interface User {
  id: number;
  pseudo: string;
  email: string;
  scoreElo: number;
  dateInscription: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { token } = useAuth();

  const fetchUsers = async () => {
    try {
      console.log('UserManagement - token:', token);
      
      if (!token) {
        console.log('UserManagement - No token available');
        setError('Non authentifié');
        return;
      }

      setLoading(true);
      setError(null);
      
      console.log('UserManagement - Fetching users...');
      const response = await fetch(API_ENDPOINTS.USERS, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('UserManagement - Response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 401) {
          console.log('UserManagement - Unauthorized');
          setError('Session expirée. Veuillez vous reconnecter.');
          return;
        }
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }

      const data = await response.json();
      console.log('UserManagement - Users data:', data);
      setUsers(data);
    } catch (err) {
      console.error('UserManagement - Error:', err);
      setError('Erreur lors de la récupération des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // Rafraîchir les données toutes les 30 secondes
    const interval = setInterval(fetchUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDelete = async (userId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        if (!token) {
          throw new Error('Non authentifié');
        }
        
        const response = await fetch(`${API_ENDPOINTS.USERS}/${userId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || 'Erreur lors de la suppression de l\'utilisateur');
        }

        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        const error = err as Error;
        setError(error.message || 'Une erreur est survenue');
      }
    }
  };

  const handleEditSubmit = async () => {
    if (!selectedUser) return;

    try {
      if (!token) {
        throw new Error('Non authentifié');
      }
      
      const response = await fetch(`${API_ENDPOINTS.USERS}/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(selectedUser),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Erreur lors de la mise à jour de l\'utilisateur');
      }

      const updatedUser = await response.json();
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setEditDialogOpen(false);
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Une erreur est survenue');
    }
  };

  const filteredUsers = users.filter(user =>
    user.pseudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : null}
      
      {loading ? (
        <Typography>Chargement...</Typography>
      ) : (
        <Box>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="h2">
              Gestion des Utilisateurs
            </Typography>
            <TextField
              size="small"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Pseudo</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Score Elo</TableCell>
                  <TableCell>Date d'inscription</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.pseudo}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.scoreElo}</TableCell>
                      <TableCell>{new Date(user.dateInscription).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleEdit(user)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDelete(user.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={filteredUsers.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Lignes par page"
            />
          </TableContainer>

          <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogContent>
              {selectedUser && (
                <Box sx={{ pt: 2 }}>
                  <TextField
                    fullWidth
                    label="Pseudo"
                    value={selectedUser.pseudo}
                    onChange={(e) => setSelectedUser({ ...selectedUser, pseudo: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Score Elo"
                    value={selectedUser.scoreElo}
                    onChange={(e) => setSelectedUser({ ...selectedUser, scoreElo: parseInt(e.target.value, 10) })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Date d'inscription"
                    value={selectedUser.dateInscription}
                    onChange={(e) => setSelectedUser({ ...selectedUser, dateInscription: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleEditSubmit} variant="contained">Sauvegarder</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default UserManagement;
