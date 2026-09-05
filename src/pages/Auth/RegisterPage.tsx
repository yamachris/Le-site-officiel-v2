import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CinePage, CineContainer } from '../../components/cine';
import { COUNTRY_OPTIONS } from './countries';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (!acceptTerms || !acceptPrivacy) {
      setError('Vous devez accepter les CGU et la politique de confidentialité');
      return;
    }
    if (username === 'new') {
      setError("Ce nom d'utilisateur est déjà pris");
      return;
    }
    if (!country) {
      setError('Veuillez sélectionner votre pays');
      return;
    }

    try {
      setLoading(true);
      await register(email, password, username);
      localStorage.setItem('userCountry', country);
      localStorage.setItem('userGender', gender);
      const redirectPath = localStorage.getItem('postLoginRedirect') || '/profile';
      localStorage.removeItem('postLoginRedirect');
      navigate(redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CinePage>
      <div className="cine-auth-shell">
        <CineContainer>
          <div className="cine-auth-grid">
            <aside className="cine-auth-visual">
              <div>
                <span className="cine-page-eyebrow" style={{ marginBottom: '1rem' }}>Compte</span>
                <h1 className="cine-page-title" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.8rem)' }}>
                  Tirez votre <em>première carte.</em>
                </h1>
                <p className="cine-page-lede">
                  Créez votre identité UNIT, choisissez votre pays, acceptez le Codex et entrez dans la saison.
                </p>
              </div>
              <div className="cine-kpi-strip" style={{ marginTop: '2rem' }}>
                <div className="cine-kpi cine-kpi--accent"><strong>01</strong><span>profil</span></div>
                <div className="cine-kpi cine-kpi--cyan"><strong>∞</strong><span>duels</span></div>
              </div>
            </aside>

            <div className="cine-auth-form">

            {error && (
              <div
                role="alert"
                style={{
                  marginTop: '1.5rem',
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

            <form onSubmit={handleRegister} style={{ marginTop: error ? 0 : undefined, display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
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
                <span className="cine-label">Email</span>
                <input
                  className="cine-input"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <fieldset
                style={{
                  border: 0,
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.7rem',
                }}
              >
                <legend className="cine-label">Genre</legend>
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                  {(['homme', 'femme'] as const).map((g) => {
                    const checked = gender === g;
                    return (
                      <label
                        key={g}
                        className={`cine-choice-pill ${checked ? 'is-active' : ''}`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={checked}
                          onChange={(e) => setGender(e.target.value)}
                          style={{ display: 'none' }}
                        />
                        {g === 'homme' ? 'Homme' : 'Femme'}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <label className="cine-field">
                <span className="cine-label">Pays</span>
                <select
                  className="cine-input"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{ appearance: 'none', cursor: 'pointer' }}
                >
                  <option value="">— Sélectionner —</option>
                  {COUNTRY_OPTIONS.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="cine-field">
                <span className="cine-label">Mot de passe</span>
                <input
                  className="cine-input"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              <label className="cine-field">
                <span className="cine-label">Confirmer le mot de passe</span>
                <input
                  className="cine-input"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginTop: '0.5rem' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.7rem',
                    color: 'var(--cine-ink-soft)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    style={{ accentColor: 'var(--cine-accent)', marginTop: 2 }}
                  />
                  <span>
                    J'accepte les{' '}
                    <RouterLink to="/terms" target="_blank" style={{ color: 'var(--cine-accent-2)' }}>
                      conditions générales d'utilisation
                    </RouterLink>
                  </span>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.7rem',
                    color: 'var(--cine-ink-soft)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={acceptPrivacy}
                    onChange={(e) => setAcceptPrivacy(e.target.checked)}
                    style={{ accentColor: 'var(--cine-accent)', marginTop: 2 }}
                  />
                  <span>
                    J'accepte la{' '}
                    <RouterLink to="/privacy" target="_blank" style={{ color: 'var(--cine-accent-2)' }}>
                      politique de confidentialité
                    </RouterLink>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="cine-button cine-button--primary"
                disabled={loading}
                style={{ marginTop: '0.5rem', justifyContent: 'center', opacity: loading ? 0.6 : 1 }}
              >
                {loading ? 'Inscription…' : "S'inscrire"}
              </button>

              <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                <RouterLink
                  to="/login"
                  className="cine-link-subtle"
                  style={{ color: 'var(--cine-accent-2)' }}
                >
                  Déjà un compte ? Se connecter →
                </RouterLink>
              </div>
            </form>
            </div>
          </div>
        </CineContainer>
      </div>
    </CinePage>
  );
};

export default RegisterPage;
