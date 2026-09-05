import React from 'react';
import { IconButton, Menu, MenuItem, Box, Tooltip, Typography } from '@mui/material';
import { Brightness4, Brightness7, Language } from '@mui/icons-material';
import { useSettings } from '../../contexts/SettingsContext';
import { supportedLanguages } from '../../i18n/languages';
import { t } from '../../i18n/translate';

export const Settings = () => {
  const { mode, toggleMode, language, setLanguage } = useSettings();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const currentLanguage =
    supportedLanguages.find((item) => item.code === language) ?? supportedLanguages[0];

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
      <Tooltip title={mode === 'dark' ? t('settings.theme.light') : t('settings.theme.dark')}>
        <IconButton onClick={toggleMode} color="inherit" size="large">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>

      <Tooltip title={`${t('settings.language.change')} (${currentLanguage.label})`}>
        <IconButton
          onClick={handleLanguageClick}
          color="inherit"
          size="large"
          aria-label={t('settings.language.change')}
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
        PaperProps={{
          sx: {
            maxHeight: 420,
            minWidth: 220,
          },
        }}
      >
        {supportedLanguages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={language === lang.code}
            sx={{ gap: 1.5 }}
          >
            <Box component="span" sx={{ width: 28, fontSize: '1.15rem' }}>
              {lang.flag}
            </Box>
            <Box component="span" sx={{ flex: 1 }}>
              {lang.label}
            </Box>
            <Typography variant="caption" color="text.secondary">
              {lang.shortLabel}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Settings;
