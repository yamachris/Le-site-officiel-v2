import React, { useState } from 'react';
import { CinePage, CineContainer, CinePageHeader } from '../../components/cine';

interface Section {
  title: string;
  body: React.ReactNode;
}

const proseStyle: React.CSSProperties = {
  color: 'var(--cine-ink-soft)',
  lineHeight: 1.7,
  fontSize: '1rem',
  maxWidth: 760,
};

const SECTIONS: Section[] = [
  {
    title: '1. Introduction',
    body: (
      <p style={proseStyle}>
        La présente Politique de Confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre site web et jeu <strong style={{ color: 'var(--cine-ink)' }}>UNIT</strong>. Nous nous engageons à respecter votre vie privée et à protéger vos données conformément aux lois applicables, notamment le <strong style={{ color: 'var(--cine-ink)' }}>RGPD</strong>.
      </p>
    ),
  },
  {
    title: '2. Données Collectées',
    body: (
      <div style={proseStyle} className="cine-prose">
        <h3>2.1. Données fournies par l'utilisateur</h3>
        <p><strong>À l'inscription :</strong></p>
        <ul>
          <li>Nom d'utilisateur ou pseudonyme</li>
          <li>Adresse email</li>
          <li>Mot de passe (chiffré)</li>
        </ul>
        <p><strong>À l'utilisation :</strong></p>
        <ul>
          <li>Messages envoyés sur le forum</li>
          <li>Contenus partagés dans la communauté</li>
        </ul>
        <h3>2.2. Données collectées automatiquement</h3>
        <ul>
          <li>Adresse IP, navigateur, OS</li>
          <li>Logs de connexion</li>
          <li>Temps passé, actions en partie, pages visitées</li>
        </ul>
        <h3>2.3. Données financières</h3>
        <ul>
          <li>Historique des transactions</li>
          <li>Coordonnées de paiement (gérées par des prestataires sécurisés)</li>
        </ul>
      </div>
    ),
  },
  {
    title: '3. Utilisation des Données',
    body: (
      <div style={proseStyle} className="cine-prose">
        <p>Vos données sont utilisées pour :</p>
        <ul>
          <li><strong>Assurer le fonctionnement du jeu</strong> — créer/gérer votre compte, suivre vos statistiques</li>
          <li><strong>Améliorer l'expérience</strong> — analyser les comportements, personnaliser les contenus</li>
          <li><strong>Gérer les paiements</strong> — assurer les transactions sécurisées</li>
          <li><strong>Communiquer</strong> — notifications, événements, nouveautés</li>
        </ul>
      </div>
    ),
  },
  {
    title: '4. Partage des Données',
    body: (
      <div style={proseStyle} className="cine-prose">
        <p>Nous ne <strong>vendons jamais</strong> vos données. Elles peuvent être partagées :</p>
        <ul>
          <li>Avec des prestataires (paiement, hébergement)</li>
          <li>Si la loi l'exige</li>
        </ul>
      </div>
    ),
  },
  {
    title: '5. Conservation',
    body: (
      <div style={proseStyle} className="cine-prose">
        <ul>
          <li>Aussi longtemps que votre compte est actif</li>
          <li>Jusqu'à 5 ans après suppression, pour obligations légales</li>
        </ul>
      </div>
    ),
  },
  {
    title: '6. Sécurité',
    body: (
      <div style={proseStyle} className="cine-prose">
        <ul>
          <li>Chiffrement des mots de passe et des transactions</li>
          <li>Stockage sécurisé sur des serveurs protégés</li>
          <li>Accès limité aux employés autorisés</li>
        </ul>
      </div>
    ),
  },
  {
    title: '7. Vos Droits',
    body: (
      <div style={proseStyle} className="cine-prose">
        <p>Conformément au RGPD :</p>
        <ul>
          <li><strong>Accès</strong> — copie de vos données</li>
          <li><strong>Rectification</strong> — correction des informations</li>
          <li><strong>Suppression</strong> — droit à l'oubli</li>
          <li><strong>Portabilité</strong> — transfert de vos données</li>
          <li><strong>Opposition</strong> — refus du marketing</li>
          <li><strong>Retrait du consentement</strong> — à tout moment</li>
        </ul>
        <p>Pour exercer ces droits : <a href="mailto:privacy@unitcardgame.com" style={{ color: 'var(--cine-accent-2)' }}>privacy@unitcardgame.com</a></p>
      </div>
    ),
  },
  {
    title: '8. Cookies',
    body: (
      <div style={proseStyle} className="cine-prose">
        <p>Les cookies sont de petits fichiers enregistrés sur votre appareil pour collecter des informations sur vos activités.</p>
        <ul>
          <li><strong>Essentiels</strong> — nécessaires au fonctionnement</li>
          <li><strong>Analytiques</strong> — mesure d'audience</li>
          <li><strong>Publicitaires</strong> — avec consentement uniquement</li>
        </ul>
      </div>
    ),
  },
  {
    title: '9. Contact',
    body: (
      <p style={proseStyle}>
        <strong style={{ color: 'var(--cine-ink)' }}>Email :</strong>{' '}
        <a href="mailto:privacy@unitcardgame.com" style={{ color: 'var(--cine-accent-2)' }}>privacy@unitcardgame.com</a>
      </p>
    ),
  },
];

const Accordion: React.FC<{ section: Section; index: number }> = ({ section, index }) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <div style={{ borderBottom: '1px solid var(--cine-line)' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.4rem 0',
          background: 'transparent',
          border: 'none',
          color: 'var(--cine-ink)',
          fontFamily: 'var(--cine-font-display)',
          fontSize: '1.15rem',
          fontWeight: 500,
          letterSpacing: 0,
          textAlign: 'left',
          cursor: 'pointer',
        }}
      >
        <span>{section.title}</span>
        <span
          aria-hidden
          style={{
            display: 'inline-flex',
            width: 28,
            height: 28,
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--cine-line)',
            borderRadius: '50%',
            color: 'var(--cine-ink-soft)',
            fontFamily: 'var(--cine-font-mono)',
            fontSize: '0.9rem',
            transition: 'transform var(--cine-transition)',
            transform: open ? 'rotate(45deg)' : 'rotate(0)',
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: '1.6rem' }}>{section.body}</div>
      )}
    </div>
  );
};

const PrivacyPage: React.FC = () => (
  <CinePage>
    <CinePageHeader
      eyebrow="Légal"
      title={<>Politique de <em>Confidentialité.</em></>}
      lede="Dernière mise à jour : 1er décembre 2024"
    />

    <CineContainer variant="narrow">
      <div style={{ paddingBottom: '6rem' }}>
        {SECTIONS.map((s, i) => <Accordion key={s.title} section={s} index={i} />)}
      </div>
    </CineContainer>
  </CinePage>
);

export default PrivacyPage;
