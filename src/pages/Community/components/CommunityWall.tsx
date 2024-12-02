import React from 'react';
import { Paper, Typography, Box, Avatar, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { FaComment, FaImage, FaVideo } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  type: 'discussion' | 'image' | 'video';
  timestamp: string;
  likes: number;
  comments: number;
}

const posts: Post[] = [
  {
    id: 1,
    author: 'Joueur1',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Quelle est votre stratégie pour utiliser le 10 Révolution ?',
    type: 'discussion',
    timestamp: 'Il y a 2h',
    likes: 15,
    comments: 8,
  },
  {
    id: 2,
    author: 'StrategyPro',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Check cette combinaison incroyable avec le Joker et la Dame !',
    type: 'image',
    timestamp: 'Il y a 4h',
    likes: 42,
    comments: 12,
  },
  {
    id: 3,
    author: 'UnitMaster',
    avatar: 'https://i.pravatar.cc/150?img=3',
    content: 'Tutorial : Comment utiliser efficacement le Valet',
    type: 'video',
    timestamp: 'Il y a 6h',
    likes: 89,
    comments: 24,
  },
];

const CommunityWall: React.FC = () => {
  const theme = useTheme();

  const getIcon = (type: string) => {
    switch (type) {
      case 'discussion':
        return <FaComment />;
      case 'image':
        return <FaImage />;
      case 'video':
        return <FaVideo />;
      default:
        return <FaComment />;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        background: theme.palette.background.paper,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: 'Orbitron',
          mb: 3,
        }}
      >
        Mur de la Communauté
      </Typography>

      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Box
            sx={{
              mb: 3,
              p: 2,
              borderRadius: 1,
              backgroundColor: 'background.default',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
              }}
            >
              <Avatar src={post.avatar} sx={{ mr: 2 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {post.author}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {post.timestamp}
                </Typography>
              </Box>
              <Chip
                icon={getIcon(post.type)}
                label={post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                size="small"
                sx={{ ml: 'auto' }}
              />
            </Box>

            <Typography variant="body1" sx={{ mb: 2 }}>
              {post.content}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                color: 'text.secondary',
                fontSize: '0.875rem',
              }}
            >
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
            </Box>
          </Box>
        </motion.div>
      ))}
    </Paper>
  );
};

export default CommunityWall;
