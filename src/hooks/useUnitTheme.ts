import { useTheme } from '@mui/material/styles';

export const useUnitTheme = () => {
  const theme = useTheme();

  const commonStyles = {
    container: {
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      backgroundImage: 'linear-gradient(180deg, #1E2832 0%, #2B3844 100%)',
      py: 8,
    },
    pageTitle: {
      color: '#2B9BF4',
      fontFamily: 'Orbitron',
      fontWeight: 700,
      textAlign: 'center',
      mb: 3,
      fontSize: { xs: '2rem', md: '2.5rem' },
    },
    pageSubtitle: {
      color: '#4A5568',
      textAlign: 'center',
      mb: 6,
      maxWidth: '800px',
      mx: 'auto',
      fontSize: { xs: '1rem', md: '1.25rem' },
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      border: '1px solid rgba(0, 0, 0, 0.05)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
      },
    },
    button: {
      fontFamily: 'Orbitron',
      textTransform: 'none',
      borderRadius: '8px',
      padding: '12px 24px',
      background: 'linear-gradient(45deg, #FF4B82, #FF6B96)',
      color: '#FFFFFF',
      boxShadow: '0 4px 10px rgba(255, 75, 130, 0.3)',
      '&:hover': {
        background: 'linear-gradient(45deg, #E63E6D, #FF4B82)',
        boxShadow: '0 6px 15px rgba(255, 75, 130, 0.4)',
      },
    },
    cardIcon: {
      fontSize: '2.5rem',
      marginBottom: 2,
      color: theme.palette.primary.main,
    },
    cardTitle: {
      fontFamily: 'Orbitron',
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#1E2832',
      marginBottom: 1,
    },
    cardDescription: {
      color: '#4A5568',
      fontSize: '0.875rem',
    },
  };

  return {
    theme,
    styles: commonStyles,
  };
};
