import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Forum as ForumIcon,
  Lightbulb as TipsIcon,
  EmojiEvents as TournamentIcon,
  Help as SupportIcon,
  Brush as CreativeIcon,
  Favorite as LikeIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ForumPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      title: 'Stratégies et Conseils',
      icon: <TipsIcon />,
      description: 'Partagez vos tactiques et apprenez des meilleurs joueurs',
      topics: 156,
      color: '#4CAF50',
    },
    {
      title: 'Tournois et Événements',
      icon: <TournamentIcon />,
      description: 'Actualités des compétitions et événements UNIT',
      topics: 89,
      color: '#FFC107',
    },
    {
      title: 'Support et Assistance',
      icon: <SupportIcon />,
      description: "Besoin d'aide ? Posez vos questions ici",
      topics: 234,
      color: '#2196F3',
    },
    {
      title: 'Créations des Joueurs',
      icon: <CreativeIcon />,
      description: 'Partagez vos créations autour de UNIT',
      topics: 127,
      color: '#9C27B0',
    },
  ];

  const recentPosts = [
    {
      title: 'Guide: Utilisation optimale des Jokers',
      author: 'MasterStratège',
      avatar: '/avatars/user1.jpg',
      likes: 45,
      comments: 23,
      isPremium: true,
      tags: ['Guide', 'Stratégie'],
    },
    {
      title: 'Prochain tournoi: Inscriptions ouvertes!',
      author: 'UnitAdmin',
      avatar: '/avatars/admin.jpg',
      likes: 89,
      comments: 56,
      isPremium: false,
      tags: ['Tournoi', 'Officiel'],
    },
    {
      title: 'Nouvelle mise à jour: Ce qui change',
      author: 'GameMaster',
      avatar: '/avatars/user3.jpg',
      likes: 122,
      comments: 78,
      isPremium: false,
      tags: ['Annonce', 'Mise à jour'],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontFamily: 'Orbitron',
              fontWeight: 700,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <ForumIcon sx={{ fontSize: 40 }} />
            Forum UNIT
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Rejoignez la communauté et partagez votre passion pour UNIT
          </Typography>
        </motion.div>

        {/* Search Bar */}
        <Box sx={{ mt: 4, mb: 6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Rechercher dans le forum..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Categories Grid */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: category.color, mr: 2 }}>
                      {category.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{category.title}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {category.topics} sujets
                      </Typography>
                    </Box>
                  </Box>
                  <Typography color="text.secondary">
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Recent Posts */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">Discussions Récentes</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/community/forum/new')}
          >
            Nouvelle Discussion
          </Button>
        </Box>
        <List>
          {recentPosts.map((post, index) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={post.avatar} alt={post.author} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1">{post.title}</Typography>
                      {post.isPremium && (
                        <Chip
                          label="Premium"
                          size="small"
                          sx={{
                            bgcolor: 'warning.main',
                            color: 'warning.contrastText',
                          }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {post.author}
                      </Typography>
                      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        {post.tags.map((tag, tagIndex) => (
                          <Chip
                            key={tagIndex}
                            label={tag}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  }
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton size="small">
                    <LikeIcon />
                  </IconButton>
                  <Typography variant="caption">{post.likes}</Typography>
                  <IconButton size="small">
                    <CommentIcon />
                  </IconButton>
                  <Typography variant="caption">{post.comments}</Typography>
                  <IconButton size="small">
                    <ShareIcon />
                  </IconButton>
                </Box>
              </ListItem>
              {index < recentPosts.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default ForumPage;
