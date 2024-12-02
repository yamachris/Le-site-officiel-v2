import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Fade,
  useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

// Questions fréquemment posées
const commonQuestions = [
  "Comment fonctionne le classement Elo ?",
  "Que fait la carte 10 Révolution ?",
  "Comment utiliser mes Unitos ?",
  "Quelles sont les règles de base ?",
  "Comment obtenir des cartes Premium ?",
];

// Interface pour les messages
interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const chatContainerRef = useRef<null | HTMLDivElement>(null);

  // Fonction pour faire défiler automatiquement vers le bas
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simuler l'envoi d'un message à l'API (à remplacer par votre vraie API)
  const sendToAPI = async (message: string) => {
    setIsTyping(true);
    // Simuler un délai de réponse
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Exemple de réponse (à remplacer par l'appel API réel)
    const response = "Je suis l'assistant UNIT, je suis là pour vous aider avec toutes vos questions sur le jeu. " + 
                    "Votre question était : " + message;
    
    setIsTyping(false);
    return response;
  };

  // Gérer l'envoi d'un message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    const response = await sendToAPI(inputMessage);
    
    const assistantMessage: Message = {
      content: response,
      role: 'assistant',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
  };

  // Gérer la sélection d'une question fréquente
  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: theme.palette.primary.main,
          mb: 4,
        }}
      >
        Découvrez l'Assistant UNIT
      </Typography>
      
      <Typography
        variant="h5"
        align="center"
        sx={{
          color: theme.palette.text.secondary,
          mb: 6,
        }}
      >
        Posez vos questions sur le jeu, les stratégies ou les fonctionnalités.
        Notre assistant IA vous répond instantanément.
      </Typography>

      {/* Zone de chat principale */}
      <Paper
        elevation={3}
        sx={{
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {/* Messages */}
        <Box
          ref={chatContainerRef}
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
            bgcolor: 'background.default',
          }}
        >
          {messages.map((message, index) => (
            <Fade in key={index}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    bgcolor: message.role === 'user' ? 'primary.main' : 'background.paper',
                    color: message.role === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {message.role === 'assistant' ? (
                    <SmartToyIcon color="primary" />
                  ) : (
                    <PersonIcon />
                  )}
                  <Typography>{message.content}</Typography>
                </Paper>
              </Box>
            </Fade>
          ))}
          {isTyping && (
            <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
              <SmartToyIcon color="primary" />
              <Typography color="text.secondary">L'assistant écrit...</Typography>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Zone de saisie */}
        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Posez votre question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              sx={{ bgcolor: 'background.default' }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                '&.Mui-disabled': {
                  bgcolor: 'action.disabledBackground',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Questions fréquentes */}
      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Questions Fréquentes
        </Typography>
        <List>
          {commonQuestions.map((question, index) => (
            <ListItem
              key={index}
              component="div"
              onClick={() => handleQuestionClick(question)}
              sx={{
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemText primary={question} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ChatPage;
