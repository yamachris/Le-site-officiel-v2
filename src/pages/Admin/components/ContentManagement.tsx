import React, { useState } from 'react';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Image as ImageIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`content-tabpanel-${index}`}
      aria-labelledby={`content-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface CardItem {
  id: number;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
  rarity: string;
}

const mockCards: CardItem[] = [
  {
    id: 1,
    name: "Dragon de Feu",
    type: "Créature",
    description: "Une créature puissante qui crache du feu",
    imageUrl: "/images/cards/dragon.jpg",
    rarity: "Rare"
  },
  {
    id: 2,
    name: "Bouclier Magique",
    type: "Sort",
    description: "Protège une créature des dégâts",
    imageUrl: "/images/cards/shield.jpg",
    rarity: "Commun"
  }
];

const ContentManagement: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddCard = () => {
    setSelectedCard(null);
    setOpenDialog(true);
  };

  const handleEditCard = (card: CardItem) => {
    setSelectedCard(card);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCard(null);
  };

  return (
    <Box>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="content management tabs"
        >
          <Tab label="Cartes" />
          <Tab label="Règles du Jeu" />
          <Tab label="Tutoriels" />
          <Tab label="Médias" />
        </Tabs>
      </Paper>

      {/* Cards Management */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Gestion des Cartes</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCard}
          >
            Ajouter une Carte
          </Button>
        </Box>

        <Grid container spacing={3}>
          {mockCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card>
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    backgroundColor: 'grey.300',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ImageIcon sx={{ fontSize: 60, color: 'grey.500' }} />
                </CardMedia>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h6">{card.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {card.type} • {card.rarity}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => handleEditCard(card)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      {/* Game Rules Management */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          Gestion des Règles
        </Typography>
        {/* Add rules management content here */}
      </TabPanel>

      {/* Tutorials Management */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>
          Gestion des Tutoriels
        </Typography>
        {/* Add tutorials management content here */}
      </TabPanel>

      {/* Media Management */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6" gutterBottom>
          Gestion des Médias
        </Typography>
        {/* Add media management content here */}
      </TabPanel>

      {/* Add/Edit Card Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedCard ? 'Modifier la Carte' : 'Ajouter une Nouvelle Carte'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Nom de la carte"
              fullWidth
              value={selectedCard?.name || ''}
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={selectedCard?.type || ''}
                label="Type"
              >
                <MenuItem value="Créature">Créature</MenuItem>
                <MenuItem value="Sort">Sort</MenuItem>
                <MenuItem value="Artefact">Artefact</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Rareté</InputLabel>
              <Select
                value={selectedCard?.rarity || ''}
                label="Rareté"
              >
                <MenuItem value="Commun">Commun</MenuItem>
                <MenuItem value="Rare">Rare</MenuItem>
                <MenuItem value="Épique">Épique</MenuItem>
                <MenuItem value="Légendaire">Légendaire</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={selectedCard?.description || ''}
            />
            <Button
              variant="outlined"
              startIcon={<ImageIcon />}
              component="label"
            >
              Télécharger une Image
              <input
                type="file"
                hidden
                accept="image/*"
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            {selectedCard ? 'Sauvegarder' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContentManagement;
