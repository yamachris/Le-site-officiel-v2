import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Tabs,
  Tab,
  Chip,
  Badge,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Lock as LockIcon,
  Star as StarIcon,
  Diamond as DiamondIcon,
  Palette as PaletteIcon,
  Casino as CasinoIcon,
  EmojiEvents as TrophyIcon,
  LocalOffer as TagIcon,
} from '@mui/icons-material';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'exclusive' | 'legendary' | 'unique';
  category: 'skins' | 'boards' | 'effects' | 'titles' | 'exclusive';
  isPremium: boolean;
}

const mockItems: ShopItem[] = [
  {
    id: '1',
    name: 'Skin Dragon de Feu',
    description: 'Un design épique pour vos cartes avec des effets de flammes',
    price: 1000,
    image: '/skins/dragon.jpg',
    rarity: 'epic',
    category: 'skins',
    isPremium: false,
  },
  {
    id: '2',
    name: 'Plateau Mystique',
    description: 'Un plateau de jeu animé avec des effets magiques',
    price: 2000,
    image: '/boards/mystic.jpg',
    rarity: 'legendary',
    category: 'boards',
    isPremium: true,
  },
  // Ajoutez plus d'items ici
];

const getRarityColor = (rarity: ShopItem['rarity']) => {
  switch (rarity) {
    case 'common':
      return '#B0B0B0';
    case 'uncommon':
      return '#4CAF50';
    case 'rare':
      return '#2196F3';
    case 'epic':
      return '#9C27B0';
    case 'exclusive':
      return '#FF9800';
    case 'legendary':
      return '#FFD700';
    case 'unique':
      return '#FF4500';
    default:
      return '#B0B0B0';
  }
};

const ShopPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [openBuyUnitos, setOpenBuyUnitos] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const unitos = 2500; // À remplacer par la vraie valeur depuis le contexte ou l'API

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const handleItemClick = (item: ShopItem) => {
    setSelectedItem(item);
  };

  const categories = [
    { label: 'Tout', icon: <ShoppingCartIcon /> },
    { label: 'Skins', icon: <PaletteIcon /> },
    { label: 'Plateaux', icon: <CasinoIcon /> },
    { label: 'Effets', icon: <StarIcon /> },
    { label: 'Titres', icon: <TrophyIcon /> },
    { label: 'Exclusif', icon: <DiamondIcon /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 6, textAlign: 'center', position: 'relative' }}>
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          right: 0, 
          display: 'flex', 
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.1)',
          padding: '8px 16px',
          borderRadius: '20px',
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              color: '#FFD700',
              fontWeight: 'bold'
            }}
          >
            {unitos}
            <TagIcon sx={{ ml: 1, color: '#FFD700' }} />
          </Typography>
        </Box>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontFamily: 'Orbitron',
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Boutique UNIT
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Personnalisez votre expérience avec des objets uniques
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<ShoppingCartIcon />}
            onClick={() => setOpenBuyUnitos(true)}
            sx={{
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              color: 'black',
              fontWeight: 'bold',
              '&:hover': {
                background: 'linear-gradient(45deg, #FFA500, #FFD700)',
              },
            }}
          >
            Acheter des Unitos
          </Button>
        </Box>
      </Box>

      {/* Tabs de catégories */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 4 }}
      >
        {categories.map((category, index) => (
          <Tab
            key={category.label}
            icon={category.icon}
            label={category.label}
            sx={{ minWidth: 120 }}
          />
        ))}
      </Tabs>

      {/* Grille des items */}
      <Grid container spacing={3}>
        {mockItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onClick={() => handleItemClick(item)}
            >
              {item.isPremium && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    zIndex: 1,
                  }}
                >
                  <Chip
                    icon={<LockIcon />}
                    label="Premium"
                    color="primary"
                    size="small"
                  />
                </Box>
              )}
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {item.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={item.rarity.toUpperCase()}
                    sx={{
                      bgcolor: getRarityColor(item.rarity),
                      color: 'white',
                    }}
                  />
                  <Typography variant="h6">
                    {item.price} <TagIcon sx={{ verticalAlign: 'middle', fontSize: 20 }} />
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog d'achat d'Unitos */}
      <Dialog
        open={openBuyUnitos}
        onClose={() => setOpenBuyUnitos(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Acheter des Unitos</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {[
              { amount: 500, price: 5, bonus: 0 },
              { amount: 1000, price: 10, bonus: 0 },
              { amount: 2000, price: 20, bonus: 10 },
              { amount: 5000, price: 50, bonus: 15 },
              { amount: 10000, price: 100, bonus: 20 },
            ].map((pack) => (
              <Grid item xs={12} key={pack.amount}>
                <Card
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <DiamondIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="h6">
                        {pack.amount} Unitos
                        {pack.bonus > 0 && (
                          <Chip
                            label={`+${pack.bonus}%`}
                            color="secondary"
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {pack.price} €
                      </Typography>
                    </Box>
                  </Box>
                  <Button variant="contained">Acheter</Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBuyUnitos(false)}>Fermer</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de détail d'item */}
      <Dialog
        open={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedItem && (
          <>
            <DialogTitle>{selectedItem.name}</DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  style={{ width: '100%', borderRadius: 8 }}
                />
              </Box>
              <Typography variant="body1" paragraph>
                {selectedItem.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Chip
                  label={selectedItem.rarity.toUpperCase()}
                  sx={{
                    bgcolor: getRarityColor(selectedItem.rarity),
                    color: 'white',
                  }}
                />
                <Typography variant="h6">
                  {selectedItem.price} <TagIcon sx={{ verticalAlign: 'middle', fontSize: 20 }} />
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedItem(null)}>Fermer</Button>
              <Button
                variant="contained"
                color="primary"
                disabled={unitos < selectedItem.price}
              >
                Acheter
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default ShopPage;
