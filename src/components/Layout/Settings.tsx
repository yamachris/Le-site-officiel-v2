import React from 'react';
import { IconButton, Menu, MenuItem, Box, Tooltip } from '@mui/material';
import { Brightness4, Brightness7, Language } from '@mui/icons-material';
import { useSettings } from '../../contexts/SettingsContext';

const languages = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

export const Settings = () => {
  const { mode, toggleMode, language, setLanguage } = useSettings();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (langCode: string) => {
    setLanguage(langCode);
    handleLanguageClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Tooltip title={mode === 'dark' ? 'Mode clair' : 'Mode sombre'}>
        <IconButton onClick={toggleMode} color="inherit" size="large">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>

      <Tooltip title="Changer la langue">
        <IconButton
          onClick={handleLanguageClick}
          color="inherit"
          size="large"
        >
          <Language />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleLanguageClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={language === lang.code}
          >
            {lang.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Settings;
