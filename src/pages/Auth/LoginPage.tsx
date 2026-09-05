import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CinePage, CineContainer } from '../../components/cine';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      const redirectPath = localStorage.getItem('postLoginRedirect') || '/profile';
      localStorage.removeItem('postLoginRedirect');
      navigate(redirectPath);
    } catch (err) {
      setError('Email ou mot de passe incorrect');
      console.error('Erreur de connexion:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSuccess(true);
    setTimeout(() => {
      setResetOpen(false);
      setResetSuccess(false);
      setResetEmail('');
    }, 3000);
  };

  return (
    <CinePage>
      <div className="cine-auth-shell">
        <CineContainer variant="narrow">
          <div className="cine-auth-grid">
            <aside className="cine-auth-visual">
              <div>
                <span className="cine-page-eyebrow" style={{ marginBottom: '1rem' }}>Compte</span>
                <h1 className="cine-page-title" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.8rem)' }}>
                  Reprendre la <em>partie.</em>
                </h1>
                <p className="cine-page-lede">Retrouvez votre deck, vos statistiques, vos Unitos et la table en quelques secondes.</p>
              </div>
              <div className="cine-kpi-strip" style={{ marginTop: '2rem' }}>
                <div className="cine-kpi cine-kpi--accent"><strong>MMR</strong><span>synchronisé</span></div>
                <div className="cine-kpi cine-kpi--cyan"><strong>Deck</strong><span>sauvegardé</span></div>
              </div>
            </aside>

            <div className="cine-auth-form">
              {error && (
                <div
                  role="alert"
                  style={{
                    marginBottom: '1.5rem',
                    padding: '0.9rem 1.1rem',
                    border: '1px solid rgba(248, 113, 113, 0.4)',
                    borderRadius: 'var(--cine-radius-md)',
                    background: 'rgba(248, 113, 113, 0.08)',
                    color: 'var(--cine-danger)',
                    fontFamily: 'var(--cine-font-mono)',
                    fontSize: '0.85rem',
                  }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                <label className="cine-field">
                  <span className="cine-label">Email</span>
                  <input
                    className="cine-input"
                    type="email"
                    required
                    autoFocus
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                  />
                </label>

                <label className="cine-field">
                  <span className="cine-label">Mot de passe</span>
                  <input
                    className="cine-input"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </label>

                <button
                  type="submit"
                  className="cine-button cine-button--primary"
                  disabled={loading}
                  style={{ marginTop: '0.5rem', justifyContent: 'center', opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? 'Connexion…' : 'Se connecter'}
                </button>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    marginTop: '0.5rem',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setResetOpen(true)}
                    className="cine-link-subtle"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    Mot de passe oublié ?
                  </button>
                  <RouterLink to="/register" className="cine-link-subtle" style={{ color: 'var(--cine-accent-2)' }}>
                    Créer un compte →
                  </RouterLink>
                </div>
              </form>
            </div>
          </div>
        </CineContainer>
      </div>

      {resetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 2, 3, 0.78)',
            backdropFilter: 'blur(16px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={(e) => { if (e.target === e.currentTarget && !resetSuccess) setResetOpen(false); }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 460,
              background: 'var(--cine-bg-soft)',
              border: '1px solid var(--cine-line)',
              borderRadius: 'var(--cine-radius-lg)',
              padding: '2rem',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--cine-font-display)',
                fontSize: '1.6rem',
                fontWeight: 500,
                margin: 0,
                letterSpacing: 0,
              }}
            >
              Réinitialiser le mot de passe
            </h2>
            {resetSuccess ? (
              <p
                style={{
                  marginTop: '1.5rem',
                  padding: '0.9rem 1.1rem',
                  border: '1px solid rgba(74, 222, 128, 0.4)',
                  borderRadius: 'var(--cine-radius-md)',
                  background: 'rgba(74, 222, 128, 0.08)',
                  color: 'var(--cine-success)',
                  fontFamily: 'var(--cine-font-mono)',
                  fontSize: '0.85rem',
                }}
              >
                Email de réinitialisation envoyé ✓
              </p>
            ) : (
              <form onSubmit={handleReset} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <label className="cine-field">
                  <span className="cine-label">Email</span>
                  <input
                    className="cine-input"
                    type="email"
                    required
                    autoFocus
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </label>
                <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setResetOpen(false)}
                    className="cine-button cine-button--ghost cine-button--mono"
                  >
                    Annuler
                  </button>
                  <button type="submit" className="cine-button cine-button--primary cine-button--mono">
                    Envoyer
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </CinePage>
  );
};

export default LoginPage;
