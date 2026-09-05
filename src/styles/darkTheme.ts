import { createTheme, ThemeOptions } from '@mui/material/styles';

const displayFont = '"Orbitron", "Roboto", "Helvetica", "Arial", sans-serif';
const bodyFont = '"Roboto", "Helvetica Neue", "Arial", sans-serif';

const baseTypography: ThemeOptions['typography'] = {
  fontFamily: bodyFont,
  h1: {
    fontFamily: displayFont,
    fontWeight: 800,
    fontSize: '3.5rem',
    letterSpacing: 0,
    lineHeight: 1.08,
  },
  h2: {
    fontFamily: displayFont,
    fontWeight: 800,
    fontSize: '2.5rem',
    letterSpacing: 0,
    lineHeight: 1.12,
  },
  h3: {
    fontFamily: displayFont,
    fontWeight: 700,
    fontSize: '2rem',
    letterSpacing: 0,
    lineHeight: 1.18,
  },
  h4: {
    fontFamily: displayFont,
    fontWeight: 700,
    fontSize: '1.75rem',
    letterSpacing: 0,
  },
  h5: {
    fontFamily: displayFont,
    fontWeight: 600,
    fontSize: '1.35rem',
    letterSpacing: 0,
  },
  h6: {
    fontFamily: displayFont,
    fontWeight: 700,
    fontSize: '1.08rem',
    letterSpacing: 0,
  },
  body1: {
    fontFamily: bodyFont,
    fontSize: '1rem',
    lineHeight: 1.7,
  },
  body2: {
    fontFamily: bodyFont,
    fontSize: '0.9rem',
    lineHeight: 1.6,
  },
  button: {
    fontFamily: displayFont,
    fontWeight: 700,
    letterSpacing: 0,
    textTransform: 'none',
  },
};

const componentOverrides: ThemeOptions['components'] = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        background: 'var(--unit-page-bg)',
        color: 'var(--unit-text)',
        fontFamily: bodyFont,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: 'var(--unit-surface)',
        backgroundImage: 'none',
        borderColor: 'var(--unit-border)',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        background: 'var(--unit-surface-soft)',
        border: '1px solid var(--unit-border)',
        borderRadius: 'var(--unit-radius-lg)',
        boxShadow: 'var(--unit-shadow)',
        color: 'var(--unit-text)',
        transition: 'transform var(--unit-transition), box-shadow var(--unit-transition), border-color var(--unit-transition), background var(--unit-transition)',
        '&:hover': {
          boxShadow: 'var(--unit-shadow-hover)',
          borderColor: 'var(--unit-border-strong)',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 'var(--unit-radius-sm)',
        padding: '10px 22px',
        transition: 'transform var(--unit-transition), box-shadow var(--unit-transition), background var(--unit-transition), border-color var(--unit-transition), color var(--unit-transition)',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      },
      contained: {
        background: 'var(--unit-gradient-rose)',
        color: 'var(--unit-action-on-primary)',
        boxShadow: '0 10px 28px rgba(var(--unit-accent-rose-rgb), 0.24)',
        '&:hover': {
          background: 'var(--unit-gradient-brand)',
          boxShadow: '0 14px 34px rgba(var(--unit-accent-rose-rgb), 0.32)',
        },
      },
      outlined: {
        borderColor: 'var(--unit-accent-gold)',
        color: 'var(--unit-accent-gold)',
        borderWidth: 1,
        '&:hover': {
          borderColor: 'var(--unit-accent-gold-bright)',
          backgroundColor: 'rgba(var(--unit-accent-gold-rgb), 0.1)',
          color: 'var(--unit-accent-gold-bright)',
        },
      },
      text: {
        color: 'var(--unit-accent-rose)',
        '&:hover': {
          backgroundColor: 'rgba(var(--unit-accent-rose-rgb), 0.08)',
          color: 'var(--unit-accent-rose-bright)',
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 'var(--unit-radius-pill)',
        fontWeight: 700,
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(13, 17, 23, 0.78)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: '1px solid var(--unit-border)',
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        backgroundColor: 'var(--unit-surface-soft)',
        borderRadius: 'var(--unit-radius-md)',
        color: 'var(--unit-text)',
        '& fieldset': {
          borderColor: 'var(--unit-border)',
        },
        '&:hover fieldset': {
          borderColor: 'var(--unit-accent-gold)',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'var(--unit-accent-rose)',
        },
      },
      input: {
        fontFamily: bodyFont,
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: 'var(--unit-text-muted)',
        '&.Mui-focused': {
          color: 'var(--unit-accent-rose)',
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: 'var(--unit-accent-rose)',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        color: 'var(--unit-text-muted)',
        '&.Mui-selected': {
          color: 'var(--unit-accent-rose)',
        },
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        background: 'var(--unit-surface)',
        border: '1px solid var(--unit-border)',
        borderRadius: 'var(--unit-radius-lg)',
        color: 'var(--unit-text)',
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#9f263d',
      light: '#c33a55',
      dark: '#7f1f31',
      contrastText: '#fff8ec',
    },
    secondary: {
      main: '#b98520',
      light: '#d6a13a',
      dark: '#8f671b',
      contrastText: '#1d1712',
    },
    background: {
      default: '#f3ead8',
      paper: '#fff8ec',
    },
    text: {
      primary: '#1d1712',
      secondary: '#625448',
    },
    success: { main: '#2f7d55' },
    warning: { main: '#c27b18' },
    error: { main: '#b6383c' },
    info: { main: '#386d8f' },
  },
  typography: baseTypography,
  components: componentOverrides,
} as ThemeOptions);

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d54162',
      light: '#f06c87',
      dark: '#9f263d',
      contrastText: '#fff8ec',
    },
    secondary: {
      main: '#f0c15a',
      light: '#ffd778',
      dark: '#b8860b',
      contrastText: '#0b1016',
    },
    background: {
      default: '#0b1016',
      paper: '#141c24',
    },
    text: {
      primary: '#f7efe3',
      secondary: 'rgba(247, 239, 227, 0.74)',
    },
    success: { main: '#4fc085' },
    warning: { main: '#f0a93d' },
    error: { main: '#ee5c61' },
    info: { main: '#70a6c8' },
  },
  typography: baseTypography,
  components: componentOverrides,
} as ThemeOptions);
