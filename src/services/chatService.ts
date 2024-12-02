// Types pour les messages
export interface ChatMessage {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

// Configuration de l'API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Service pour gérer les interactions avec l'API de chat
export class ChatService {
  // Envoyer un message à l'API
  static async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la communication avec le serveur');
      }

      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      throw error;
    }
  }

  // Récupérer l'historique des messages (si implémenté côté serveur)
  static async getMessageHistory(): Promise<ChatMessage[]> {
    try {
      const response = await fetch(`${API_URL}/api/chat/history`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'historique');
      }

      const data = await response.json();
      return data.messages;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      throw error;
    }
  }

  // Vérifier si le message contient du contenu inapproprié
  static async validateMessage(message: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/api/chat/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la validation du message');
      }

      const data = await response.json();
      return data.isValid;
    } catch (error) {
      console.error('Erreur lors de la validation du message:', error);
      return false;
    }
  }
}
