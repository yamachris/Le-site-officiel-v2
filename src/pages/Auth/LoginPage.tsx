import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérification simple des identifiants
    if (username === 'new' && password === 'hello') {
      // Stocker les informations de connexion
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      
      // Rediriger vers la page de profil
      navigate('/profile');
    } else {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation d'envoi d'email de réinitialisation
    if (resetEmail) {
      setResetSuccess(true);
      setTimeout(() => {
        setOpenForgotPassword(false);
        setResetSuccess(false);
        setResetEmail('');
      }, 3000);
    }
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#FFD700',
      },
      '&:hover fieldset': {
        borderColor: '#FFA500',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFA500',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#FFD700',
      '&.Mui-focused': {
        color: '#FFA500',
      },
    },
    '& .MuiInputBase-input': {
      color: 'white',
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(10,25,41,0.95) 0%, rgba(19,47,76,0.95) 100%)',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 8, md: 0 },
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              backgroundColor: 'rgba(10,25,41,0.9)',
              border: '1px solid #FFD700',
              borderRadius: '12px',
            }}
          >
            <Typography 
              component="h1" 
              variant="h4" 
              sx={{ 
                mb: 3,
                fontFamily: 'Orbitron',
                color: '#FFD700',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Connexion
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nom d'utilisateur"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={textFieldStyle}
              />

              <Box sx={{ textAlign: 'right', mt: 1 }}>
                <Link
                  component="button"
                  type="button"
                  onClick={() => setOpenForgotPassword(true)}
                  sx={{
                    color: '#FFD700',
                    textDecoration: 'none',
                    fontFamily: 'Orbitron',
                    fontSize: '0.875rem',
                    '&:hover': {
                      color: '#FFA500',
                    },
                  }}
                >
                  Mot de passe oublié ?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: '#FFD700',
                  color: '#000',
                  padding: '12px',
                  fontFamily: 'Orbitron',
                  fontWeight: 'bold',
                  '&:hover': {
                    bgcolor: '#FFA500',
                  },
                }}
              >
                Se connecter
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Link 
                  href="/register"
                  sx={{
                    color: '#FFD700',
                    textDecoration: 'none',
                    fontFamily: 'Orbitron',
                    '&:hover': {
                      color: '#FFA500',
                    },
                  }}
                >
                  Pas encore de compte ? S'inscrire
                </Link>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* Popup de mot de passe oublié */}
      <Dialog 
        open={openForgotPassword} 
        onClose={() => setOpenForgotPassword(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(10,25,41,0.95)',
            border: '1px solid #FFD700',
            borderRadius: '12px',
            minWidth: '300px',
          }
        }}
      >
        <DialogTitle sx={{ 
          color: '#FFD700',
          fontFamily: 'Orbitron',
          fontWeight: 'bold',
          pr: 6,
        }}>
          Réinitialisation du mot de passe
          <IconButton
            onClick={() => setOpenForgotPassword(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#FFD700',
              '&:hover': {
                color: '#FFA500',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          {resetSuccess ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Email de réinitialisation envoyé !
            </Alert>
          ) : (
            <>
              <Typography sx={{ color: 'white', mb: 2 }}>
                Entrez votre adresse email pour recevoir un lien de réinitialisation.
              </Typography>
              <TextField
                autoFocus
                margin="dense"
                id="resetEmail"
                label="Adresse email"
                type="email"
                fullWidth
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                sx={textFieldStyle}
              />
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setOpenForgotPassword(false)}
            sx={{
              color: '#FFD700',
              fontFamily: 'Orbitron',
              '&:hover': {
                color: '#FFA500',
              },
            }}
          >
            Annuler
          </Button>
          <Button 
            onClick={handleForgotPassword}
            variant="contained"
            disabled={resetSuccess}
            sx={{
              bgcolor: '#FFD700',
              color: '#000',
              fontFamily: 'Orbitron',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#FFA500',
              },
            }}
          >
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LoginPage;
