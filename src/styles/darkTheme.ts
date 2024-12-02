import { createTheme } from '@mui/material/styles';

// Thème sombre global basé sur la page d'accueil
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff3366',
      light: '#ff6b6b',
      dark: '#d61f4c',
    },
    secondary: {
      main: '#FFD700',
      light: '#FFA500',
      dark: '#B8860B',
    },
    background: {
      default: '#0A1929',
      paper: '#132F4C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      background: 'linear-gradient(45deg, #ff3366, #ff6b6b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      color: '#FFFFFF',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#FFFFFF',
    },
    body1: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1rem',
      color: '#B0B0B0',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#0A1929',
          color: '#FFFFFF',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#132F4C',
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 15px rgba(255, 51, 102, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #ff3366, #ff6b6b)',
          color: '#FFFFFF',
        },
        outlined: {
          borderColor: '#ff3366',
          color: '#ff3366',
          '&:hover': {
            borderColor: '#ff6b6b',
            color: '#ff6b6b',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#132F4C',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(13, 17, 23, 0.7)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
  },
});

// Thème clair global basé sur la page d'accueil
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF4B82', // Rose vif pour les boutons principaux
      light: '#FF6B96',
      dark: '#E63E6D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFD700', // Or pour les accents
      light: '#FFE44D',
      dark: '#CCB100',
      contrastText: '#1A1A1A',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E2832', // Bleu foncé pour le texte principal
      secondary: '#4A5568',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: 'Orbitron',
      fontWeight: 700,
      fontSize: '3.5rem',
      letterSpacing: '0.02em',
      color: '#FFD700', // Titres en or
    },
    h2: {
      fontFamily: 'Orbitron',
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '0.02em',
      color: '#2B9BF4', // Bleu vif pour les sous-titres
    },
    h3: {
      fontFamily: 'Orbitron',
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontFamily: 'Orbitron',
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h5: {
      fontFamily: 'Orbitron',
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h6: {
      fontFamily: 'Orbitron',
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E2832', // Navbar foncée comme dans l'image
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 24px',
          fontFamily: 'Orbitron',
          fontWeight: 500,
        },
        contained: {
          background: 'linear-gradient(45deg, #FF4B82, #FF6B96)',
          boxShadow: '0 4px 10px rgba(255, 75, 130, 0.3)',
          '&:hover': {
            background: 'linear-gradient(45deg, #E63E6D, #FF4B82)',
            boxShadow: '0 6px 15px rgba(255, 75, 130, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#FFFFFF',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
          },
          border: '1px solid rgba(0, 0, 0, 0.05)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            borderRadius: '4px 4px 0 0',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#FFFFFF',
        },
      },
    },
  },
});
