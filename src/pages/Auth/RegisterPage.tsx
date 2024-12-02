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
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  FormHelperText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (!acceptTerms || !acceptPrivacy) {
      setError('Vous devez accepter les CGU et la politique de confidentialité');
      return;
    }

    if (username === 'new') {
      setError('Ce nom d\'utilisateur est déjà pris');
      return;
    }

    // Simuler une inscription réussie
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    navigate('/profile');
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
              Inscription
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleRegister} sx={{ width: '100%' }}>
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
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={textFieldStyle}
              />

              <FormControl 
                component="fieldset" 
                sx={{ 
                  mt: 2, 
                  width: '100%',
                  '& .MuiFormLabel-root': {
                    color: '#FFD700',
                  },
                }}
              >
                <Typography
                  sx={{
                    color: '#FFD700',
                    fontFamily: 'Orbitron',
                    mb: 1,
                  }}
                >
                  Sexe
                </Typography>
                <RadioGroup
                  row
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="homme"
                    control={
                      <Radio 
                        sx={{
                          color: '#FFD700',
                          '&.Mui-checked': {
                            color: '#FFA500',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: 'white' }}>
                        Homme
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="femme"
                    control={
                      <Radio 
                        sx={{
                          color: '#FFD700',
                          '&.Mui-checked': {
                            color: '#FFA500',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: 'white' }}>
                        Femme
                      </Typography>
                    }
                  />
                </RadioGroup>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={textFieldStyle}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmer le mot de passe"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={textFieldStyle}
              />

              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      sx={{
                        color: '#FFD700',
                        '&.Mui-checked': {
                          color: '#FFA500',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: 'white' }}>
                      J'accepte les{' '}
                      <Link 
                        href="/cgu" 
                        target="_blank"
                        sx={{
                          color: '#FFD700',
                          textDecoration: 'none',
                          '&:hover': {
                            color: '#FFA500',
                          },
                        }}
                      >
                        conditions générales d'utilisation
                      </Link>
                    </Typography>
                  }
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={acceptPrivacy}
                      onChange={(e) => setAcceptPrivacy(e.target.checked)}
                      sx={{
                        color: '#FFD700',
                        '&.Mui-checked': {
                          color: '#FFA500',
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: 'white' }}>
                      J'accepte la{' '}
                      <Link 
                        href="/privacy" 
                        target="_blank"
                        sx={{
                          color: '#FFD700',
                          textDecoration: 'none',
                          '&:hover': {
                            color: '#FFA500',
                          },
                        }}
                      >
                        politique de confidentialité
                      </Link>
                    </Typography>
                  }
                />
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
                S'inscrire
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Link 
                  href="/login"
                  sx={{
                    color: '#FFD700',
                    textDecoration: 'none',
                    fontFamily: 'Orbitron',
                    '&:hover': {
                      color: '#FFA500',
                    },
                  }}
                >
                  Déjà un compte ? Se connecter
                </Link>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
