import React, { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { CinePage, CineContainer, CinePageHeader, CineCard } from '../../components/cine';

const COMMON_QUESTIONS = [
  'Comment fonctionne le classement Elo ?',
  'Que fait la carte 10 Révolution ?',
  'Comment utiliser mes Unitos ?',
  'Quelles sont les règles de base ?',
  'Comment obtenir des cartes Premium ?',
];

interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendToAPI = async (message: string) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsTyping(false);
    return `Je suis l'assistant UNIT, je suis là pour vous aider. Votre question : « ${message} »`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMessage: Message = { content: inputMessage, role: 'user', timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    const response = await sendToAPI(userMessage.content);
    setMessages((prev) => [...prev, { content: response, role: 'assistant', timestamp: new Date() }]);
  };

  return (
    <CinePage>
      <CinePageHeader
        eyebrow="Assistant"
        title={<>Posez vos <em>questions.</em></>}
        lede="Notre IA répond instantanément à toutes vos questions sur UNIT — règles, stratégies, fonctionnalités."
      />

      <CineContainer>
        <div className="cine-shell-grid" style={{ paddingBottom: '5rem', alignItems: 'start' }}>
          <CineCard
            style={{
              padding: 0,
              height: 'min(68vh, 680px)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {messages.length === 0 && (
                <div
                  style={{
                    margin: 'auto',
                    textAlign: 'center',
                    color: 'var(--cine-ink-dim)',
                    fontFamily: 'var(--cine-font-mono)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  La conversation commencera ici
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.6rem',
                      alignItems: 'flex-start',
                      maxWidth: '78%',
                      padding: '0.8rem 1.1rem',
                      borderRadius: 'var(--cine-radius-md)',
                      background: m.role === 'user' ? 'var(--cine-accent)' : 'var(--cine-surface-hi)',
                      color: m.role === 'user' ? '#fff' : 'var(--cine-ink)',
                      border: m.role === 'assistant' ? '1px solid var(--cine-line)' : 'none',
                      fontSize: '0.95rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {m.role === 'assistant' ? <SmartToyIcon sx={{ fontSize: 18, color: 'var(--cine-accent-2)', flexShrink: 0, mt: '2px' }} /> : <PersonIcon sx={{ fontSize: 18, flexShrink: 0, mt: '2px' }} />}
                    <span>{m.content}</span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--cine-ink-soft)', fontSize: '0.9rem' }}>
                  <SmartToyIcon sx={{ fontSize: 18, color: 'var(--cine-accent-2)' }} />
                  <span style={{ fontFamily: 'var(--cine-font-mono)', fontSize: '0.78rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                    L'assistant écrit…
                  </span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              style={{
                borderTop: '1px solid var(--cine-line)',
                padding: '1rem 1.2rem',
                background: 'var(--cine-bg-soft)',
                display: 'flex',
                gap: '0.6rem',
              }}
            >
              <input
                className="cine-input"
                type="text"
                placeholder="Posez votre question…"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="cine-button cine-button--primary"
                style={{
                  padding: '0 1rem',
                  opacity: inputMessage.trim() ? 1 : 0.4,
                  cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                }}
                aria-label="Envoyer"
              >
                <SendIcon fontSize="small" />
              </button>
            </div>
          </CineCard>

          <div className="cine-section-slab">
            <span className="cine-section-eyebrow">Questions fréquentes</span>
            <h2 className="cine-section-title">Console d'aide</h2>
            <p style={{ color: 'var(--cine-ink-soft)', lineHeight: 1.55, marginTop: '0.8rem' }}>
              Démarrez une conversation avec un sujet récurrent ou posez votre propre question à l'assistant UNIT.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {COMMON_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setInputMessage(q)}
                  style={{
                    textAlign: 'left',
                    padding: '0.9rem 1.2rem',
                    background: 'var(--cine-surface)',
                    border: '1px solid var(--cine-line)',
                    borderRadius: 'var(--cine-radius-md)',
                    color: 'var(--cine-ink-soft)',
                    cursor: 'pointer',
                    fontFamily: 'var(--cine-font-body)',
                    fontSize: '0.95rem',
                    transition: 'border-color var(--cine-transition), color var(--cine-transition), background var(--cine-transition)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--cine-line-hi)';
                    e.currentTarget.style.color = 'var(--cine-ink)';
                    e.currentTarget.style.background = 'var(--cine-surface-hi)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--cine-line)';
                    e.currentTarget.style.color = 'var(--cine-ink-soft)';
                    e.currentTarget.style.background = 'var(--cine-surface)';
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CineContainer>
    </CinePage>
  );
};

export default ChatPage;
