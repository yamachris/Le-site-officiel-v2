import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../contexts/SettingsContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { text: 'Accueil', path: '/', icon: <HomeIcon /> },
    { text: 'Jouer', path: '/play', icon: <SportsEsportsIcon /> },
    { text: 'Règles', path: '/rules', icon: <MenuBookIcon /> },
    { text: 'Classement', path: '/ranking', icon: <TrophyIcon /> },
    { text: 'Boutique', path: '/shop', icon: <ShoppingCartIcon /> },
    { text: 'Assistant IA', path: '/chat', icon: <SmartToyIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontFamily: 'Orbitron' }}>
        UNIT
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              color: location.pathname === item.path ? 'primary.main' : 'text.primary',
              textAlign: 'center',
            }}
          >
            {item.icon}
            <ListItemText primary={item.text} sx={{ ml: 1 }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        top: 0, 
        left: 0, 
        right: 0, 
        height: 70, 
        display: 'flex', 
        justifyContent: 'center',
        bgcolor: 'background.paper' 
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 70, minHeight: 70 }}>
          {/* Logo et Menu Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Logo Desktop */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Orbitron',
              fontWeight: 700,
              color: 'text.primary',
              textDecoration: 'none',
            }}
          >
            UNIT
          </Typography>

          {/* Navigation Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  my: 2,
                  mx: 1,
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {item.icon}
                <Box sx={{ ml: 1 }}>{item.text}</Box>
              </Button>
            ))}
          </Box>

          {/* Actions utilisateur */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Icône Boutique */}
            <IconButton
              component={Link}
              to="/shop"
              sx={{ 
                color: location.pathname === '/shop' ? 'primary.main' : 'text.primary',
                mr: 1
              }}
            >
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Menu Utilisateur */}
            {isAuthenticated ? (
              <>
                <Tooltip title="Ouvrir les paramètres">
                  <IconButton 
                    onClick={handleOpenUserMenu} 
                    sx={{ p: 0 }}
                  >
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem component={Link} to="/profile" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profil</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Déconnexion</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                component={Link}
                to="/login"
                variant="contained"
                sx={{
                  fontFamily: 'Orbitron',
                }}
              >
                Connexion
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Drawer Mobile */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
