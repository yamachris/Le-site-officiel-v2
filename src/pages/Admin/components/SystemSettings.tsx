import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const SystemSettings: React.FC = () => {
  // États pour les différents paramètres
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [maxPlayers, setMaxPlayers] = useState(1000);
  const [matchmakingTimeout, setMatchmakingTimeout] = useState(60);
  const [defaultLanguage, setDefaultLanguage] = useState('fr');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoModeration, setAutoModeration] = useState(true);
  const [maxDeckSize, setMaxDeckSize] = useState(60);
  const [backupFrequency, setBackupFrequency] = useState(24);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSave = () => {
    // Simuler la sauvegarde des paramètres
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  return (
    <Box>
      {/* Alertes de succès/erreur */}
      {showSuccessAlert && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Les paramètres ont été sauvegardés avec succès.
        </Alert>
      )}

      {/* Paramètres Système */}
      <Grid container spacing={3}>
        {/* Statut du Système */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SpeedIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Statut du Système</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={maintenanceMode}
                        onChange={(e) => setMaintenanceMode(e.target.checked)}
                      />
                    }
                    label="Mode Maintenance"
                  />
                  <Tooltip title="Active le mode maintenance pour effectuer des mises à jour">
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={registrationEnabled}
                        onChange={(e) => setRegistrationEnabled(e.target.checked)}
                      />
                    }
                    label="Inscriptions Ouvertes"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Paramètres de Jeu */}
        <Grid item xs={12}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SecurityIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Paramètres de Jeu</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre maximum de joueurs"
                    type="number"
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Timeout matchmaking (secondes)"
                    type="number"
                    value={matchmakingTimeout}
                    onChange={(e) => setMatchmakingTimeout(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography gutterBottom>Taille maximum du deck</Typography>
                  <Slider
                    value={maxDeckSize}
                    onChange={(e, newValue) => setMaxDeckSize(newValue as number)}
                    min={30}
                    max={100}
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 30, label: '30' },
                      { value: 60, label: '60' },
                      { value: 100, label: '100' },
                    ]}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Paramètres Régionaux */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LanguageIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Paramètres Régionaux</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth>
                <InputLabel>Langue par défaut</InputLabel>
                <Select
                  value={defaultLanguage}
                  label="Langue par défaut"
                  onChange={(e) => setDefaultLanguage(e.target.value)}
                >
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Paramètres de Notifications */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <NotificationsIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Notifications</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                  }
                  label="Notifications par email"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoModeration}
                      onChange={(e) => setAutoModeration(e.target.checked)}
                    />
                  }
                  label="Modération automatique"
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Paramètres de Sauvegarde */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StorageIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Sauvegardes</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Fréquence des sauvegardes (heures)"
                    type="number"
                    value={backupFrequency}
                    onChange={(e) => setBackupFrequency(Number(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={() => {/* Logique de sauvegarde manuelle */}}
                  >
                    Lancer une sauvegarde manuelle
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Paramètres Email */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Configuration Email</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Serveur SMTP"
                    placeholder="smtp.example.com"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Port SMTP"
                    type="number"
                    placeholder="587"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email expéditeur"
                    placeholder="noreply@unit-game.com"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nom expéditeur"
                    placeholder="UNIT Game"
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      {/* Boutons d'action */}
      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={() => {/* Logique de réinitialisation */}}
        >
          Réinitialiser
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Sauvegarder les modifications
        </Button>
      </Box>
    </Box>
  );
};

export default SystemSettings;
