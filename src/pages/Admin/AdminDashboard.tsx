import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  SportsEsports as GamesIcon,
  EmojiEvents as TournamentIcon,
  Forum as ForumIcon,
  Settings as SettingsIcon,
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import StatCard from './components/StatCard';
import UserManagement from './components/UserManagement';
import ContentManagement from './components/ContentManagement';
import TournamentManagement from './components/TournamentManagement';
import SystemSettings from './components/SystemSettings';
import Overview from './components/Overview';
import AdminConsole from './components/AdminConsole';

const drawerWidth = 240;

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('overview');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    {
      id: 'overview',
      label: 'Vue d\'ensemble',
      icon: <DashboardIcon />,
    },
    {
      id: 'users',
      label: 'Utilisateurs',
      icon: <PeopleIcon />,
    },
    {
      id: 'games',
      label: 'Parties',
      icon: <GamesIcon />,
    },
    {
      id: 'tournaments',
      label: 'Tournois',
      icon: <TournamentIcon />,
    },
    {
      id: 'forum',
      label: 'Forum',
      icon: <ForumIcon />,
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: <SettingsIcon />,
    },
    {
      id: 'console',
      label: 'Console',
      icon: <SettingsIcon />,
    },
  ];

  const renderContent = () => {
    switch (selectedSection) {
      case 'overview':
        return <Overview />;
      case 'users':
        return <UserManagement />;
      case 'games':
        return <ContentManagement />;
      case 'tournaments':
        return <TournamentManagement />;
      case 'settings':
        return <SystemSettings />;
      case 'console':
        return <AdminConsole />;
      default:
        return <Typography>Section en construction</Typography>;
    }
  };

  const drawer = (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        }}
      >
        <Typography variant="h6" noWrap component="div">
          UNIT Admin
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={selectedSection === item.id}
            onClick={() => setSelectedSection(item.id)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main + '20',
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main + '30',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedSection === item.id ? theme.palette.primary.main : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: selectedSection === item.id ? 'bold' : 'normal',
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: theme.palette.background.default,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: theme.palette.background.default,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            {mobileOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h4" component="h1" gutterBottom>
            {menuItems.find(item => item.id === selectedSection)?.label}
          </Typography>
        </Box>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
