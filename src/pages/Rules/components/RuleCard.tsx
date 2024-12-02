import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface RuleCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  onClick: () => void;
}

const RuleCard: React.FC<RuleCardProps> = ({
  id,
  title,
  icon,
  description,
  color,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Paper
        onClick={onClick}
        sx={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.3s ease',
          height: '100%',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            '& .card-icon': {
              transform: 'scale(1.1)',
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: color,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            className="card-icon"
            sx={{
              color: color,
              fontSize: '3rem',
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
              transition: 'transform 0.3s ease',
            }}
          >
            {icon}
          </Box>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 1,
              color: 'white',
              fontFamily: 'Orbitron',
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.4,
            }}
          >
            {description}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default RuleCard;
