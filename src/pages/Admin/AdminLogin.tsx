import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Visibility, VisibilityOff,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';
import { CinePage, CineContainer } from '../../components/cine';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'yamachris' && password === 'salut') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <CinePage>
      <div
        style={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(40px, 8vh, 80px) 0',
        }}
      >
        <CineContainer variant="narrow">
          <div style={{ maxWidth: 420, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div
                style={{
                  width: 64, height: 64,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 'var(--cine-radius-md)',
                  border: '1px solid var(--cine-line)',
                  background: 'var(--cine-surface)',
                  margin: '0 auto 1.4rem',
                }}
              >
                <AdminIcon sx={{ fontSize: 32, color: 'var(--cine-accent)' }} />
              </div>
              <span className="cine-page-eyebrow" style={{ marginBottom: '0.6rem' }}>Restricted</span>
              <h1 className="cine-page-title" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
                Administration <em>UNIT.</em>
              </h1>
              <p className="cine-page-lede">Accès réservé aux administrateurs.</p>
            </div>

            {error && (
              <div
                role="alert"
                style={{
                  marginBottom: '1.5rem',
                  padding: '0.9rem 1.1rem',
                  border: '1px solid rgba(248,113,113,0.4)',
                  borderRadius: 'var(--cine-radius-md)',
                  background: 'rgba(248,113,113,0.08)',
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
                <span className="cine-label">Nom d'utilisateur</span>
                <input
                  className="cine-input"
                  type="text"
                  required
                  autoFocus
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>

              <label className="cine-field">
                <span className="cine-label">Mot de passe</span>
                <div style={{ position: 'relative' }}>
                  <input
                    className="cine-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingRight: '3rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    style={{
                      position: 'absolute',
                      right: '0.6rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--cine-ink-soft)',
                      cursor: 'pointer',
                      padding: '0.4rem',
                      display: 'inline-flex',
                    }}
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </button>
                </div>
              </label>

              <button
                type="submit"
                className="cine-button cine-button--primary"
                style={{ marginTop: '0.5rem', justifyContent: 'center' }}
              >
                Se connecter
              </button>
            </form>
          </div>
        </CineContainer>
      </div>
    </CinePage>
  );
};

export default AdminLogin;
