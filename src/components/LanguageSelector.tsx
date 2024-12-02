import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <ButtonGroup variant="text" size="small">
      <Button
        onClick={() => setLanguage('fr')}
        sx={{
          color: language === 'fr' ? '#fff' : 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            color: '#fff',
          },
        }}
      >
        FR
      </Button>
      <Button
        onClick={() => setLanguage('en')}
        sx={{
          color: language === 'en' ? '#fff' : 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            color: '#fff',
          },
        }}
      >
        EN
      </Button>
    </ButtonGroup>
  );
};

export default LanguageSelector;
