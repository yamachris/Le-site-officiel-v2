import React from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* Background Icon */}
      <Box
        sx={{
          position: 'absolute',
          right: -20,
          bottom: -20,
          opacity: 0.1,
          transform: 'scale(2)',
          color: color,
        }}
      >
        {icon}
      </Box>

      {/* Content */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
            {value.toLocaleString()}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: color + '20',
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ color: color }}>
            {icon}
          </Box>
        </Box>
      </Box>

      {/* Menu Icon */}
      <IconButton
        size="small"
        sx={{
          position: 'absolute',
          right: 4,
          top: 4,
        }}
      >
        <MoreVert fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default StatCard;
