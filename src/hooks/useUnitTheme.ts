import { useTheme } from '@mui/material/styles';

export const useUnitTheme = () => {
  const theme = useTheme();

  const commonStyles = {
    container: {
      minHeight: '100vh',
      background: 'var(--unit-page-bg)',
      py: 8,
    },
    pageTitle: {
      background: 'var(--unit-gradient-gold)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      fontFamily: 'var(--unit-font-display)',
      fontWeight: 800,
      textAlign: 'center',
      mb: 3,
      fontSize: { xs: '2rem', md: '2.5rem' },
    },
    pageSubtitle: {
      color: 'var(--unit-text-muted)',
      textAlign: 'center',
      mb: 6,
      maxWidth: '800px',
      mx: 'auto',
      fontSize: { xs: '1rem', md: '1.25rem' },
    },
    card: {
      background: 'var(--unit-surface-soft)',
      borderRadius: 'var(--unit-radius-lg)',
      boxShadow: 'var(--unit-shadow)',
      transition: 'transform var(--unit-transition), box-shadow var(--unit-transition), border-color var(--unit-transition)',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 'var(--unit-shadow-hover)',
        borderColor: 'var(--unit-border-strong)',
      },
      border: '1px solid var(--unit-border)',
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
      fontFamily: 'var(--unit-font-display)',
      textTransform: 'none',
      borderRadius: 'var(--unit-radius-sm)',
      padding: '12px 24px',
      background: 'var(--unit-gradient-rose)',
      color: 'var(--unit-action-on-primary)',
      boxShadow: '0 10px 28px rgba(var(--unit-accent-rose-rgb), 0.24)',
      '&:hover': {
        background: 'var(--unit-gradient-brand)',
        boxShadow: '0 14px 34px rgba(var(--unit-accent-rose-rgb), 0.32)',
      },
    },
    cardIcon: {
      fontSize: '2.5rem',
      marginBottom: 2,
      color: 'var(--unit-accent-gold)',
    },
    cardTitle: {
      fontFamily: 'var(--unit-font-display)',
      fontWeight: 600,
      fontSize: '1.25rem',
      color: 'var(--unit-text)',
      marginBottom: 1,
    },
    cardDescription: {
      color: 'var(--unit-text-muted)',
      fontSize: '0.875rem',
    },
  };

  return {
    theme,
    styles: commonStyles,
  };
};
