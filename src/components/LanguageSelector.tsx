import React from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';
import { supportedLanguages } from '../i18n/languages';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const currentLanguage =
    supportedLanguages.find((item) => item.code === language) ?? supportedLanguages[0];

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="text"
        size="small"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{
          color: 'var(--unit-action-on-primary)',
          minWidth: 48,
          '&:hover': {
            color: 'var(--unit-action-on-primary)',
          },
        }}
      >
        {currentLanguage.flag} {currentLanguage.shortLabel}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: 420,
            minWidth: 220,
          },
        }}
      >
        {supportedLanguages.map((item) => (
          <MenuItem
            key={item.code}
            selected={language === item.code}
            onClick={() => {
              setLanguage(item.code);
              handleClose();
            }}
            sx={{ gap: 1.5 }}
          >
            <Box component="span" sx={{ width: 28, fontSize: '1.15rem' }}>
              {item.flag}
            </Box>
            <Box component="span" sx={{ flex: 1 }}>
              {item.label}
            </Box>
            <Typography variant="caption" color="text.secondary">
              {item.shortLabel}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
