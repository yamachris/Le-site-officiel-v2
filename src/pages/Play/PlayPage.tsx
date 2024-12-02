import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaUsers, FaTrophy } from 'react-icons/fa';
import { useSettings } from '../../contexts/SettingsContext';
import './PlayPage.css';

// @ts-ignore
const gameScreenshot = '/assets/plateau.png';

const PlayPage: React.FC = () => {
  const { mode } = useSettings();
  const gameOptions = [
    {
      id: 'solo',
      title: 'Mode Solo',
      description: 'Entraînez-vous contre l\'IA',
      icon: <FaRobot size={40} />,
      color: '#4CAF50'
    },
    {
      id: 'multiplayer',
      title: 'Mode Multijoueur',
      description: 'Affrontez d\'autres joueurs en ligne',
      icon: <FaUsers size={40} />,
      color: '#2196F3'
    },
    {
      id: 'tournament',
      title: 'Mode Tournois',
      description: 'Participez à des tournois compétitifs',
      icon: <FaTrophy size={40} />,
      color: '#9C27B0'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="play-page" data-theme={mode}>
      <motion.h1 
        className="ready-to-play"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Prêt à jouer ?
      </motion.h1>
      
      <motion.div 
        className="intro-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="intro-content">
          <h2>Une Expérience de Jeu Unique</h2>
          <p>Plongez dans l'univers stratégique de UNIT, où chaque carte compte et chaque décision peut faire basculer la partie. Affrontez des joueurs du monde entier et gravissez les échelons du classement.</p>
          
          <h3>Caractéristiques principales :</h3>
          <ul>
            <li>Interface intuitive et moderne</li>
            <li>Système de classement compétitif</li>
            <li>Matchmaking équilibré</li>
            <li>Récompenses quotidiennes</li>
          </ul>
          
          <motion.button
            className="play-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lancer une Partie
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="game-board-showcase"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <img src={gameScreenshot} alt="Interface de jeu UNIT" />
      </motion.div>

      <h2 className="game-modes-title">Modes de jeu</h2>
      <motion.div
        className="game-options"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {gameOptions.map((option) => (
          <motion.div
            key={option.id}
            className="game-option-card"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0 0 20px ${option.color}40`
            }}
          >
            <div className="option-icon" style={{ color: option.color }}>
              {option.icon}
            </div>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PlayPage;
