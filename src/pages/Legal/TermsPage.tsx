import React, { useState } from 'react';
import { CinePage, CineContainer, CinePageHeader } from '../../components/cine';

interface Section {
  title: string;
  content: string;
}

const SECTIONS: Section[] = [
  { title: '1. Préambule', content: `Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation du site web et des services associés à UNIT (le "Jeu"). En accédant au site ou en jouant au jeu UNIT, vous acceptez expressément et sans réserve les présentes CGU.` },
  { title: '2. Définitions', content: `• Jeu : UNIT, un jeu de cartes stratégique en ligne.
• Site : Le site internet officiel de UNIT, permettant l'accès au jeu, aux forums, boutiques, et contenus communautaires.
• Utilisateur : Toute personne accédant au site ou jouant à UNIT.
• Compte : Profil utilisateur créé pour accéder aux fonctionnalités du jeu.
• Unitos : Monnaie virtuelle utilisée dans UNIT, achetable ou gagnée en jouant.
• Abonnement Premium : Accès payant à des fonctionnalités exclusives.` },
  { title: '3. Accès et Inscription', content: `3.1. Inscription
• L'inscription au jeu est gratuite.
• Les utilisateurs doivent fournir des informations exactes (email valide, pseudonyme, etc.).
• L'accès à certaines fonctionnalités, comme le Premium, nécessite un abonnement payant.

3.2. Âge Minimum
• UNIT est accessible uniquement aux utilisateurs âgés de 13 ans et plus.
• Les mineurs doivent obtenir l'autorisation de leurs représentants légaux.

3.3. Compatibilité
• L'utilisateur doit s'assurer que son matériel est compatible avec les exigences techniques du site et du jeu.` },
  { title: '4. Fonctionnalités et Services', content: `4.1. Compte Utilisateur
• Chaque joueur peut créer un compte unique.
• Le partage de comptes est strictement interdit.
• L'utilisateur est responsable de la sécurité de ses identifiants.

4.2. Abonnement Premium
• Les abonnements Premium permettent d'accéder à des fonctionnalités exclusives.
• L'abonnement est renouvelé automatiquement sauf résiliation.

4.3. Boutique et Unitos
• Les Unitos peuvent être achetés via le site ou gagnés en jouant.
• Les Unitos ne peuvent pas être échangés contre de l'argent réel.
• Tout usage abusif ou frauduleux peut entraîner la suspension du compte.` },
  { title: '5. Règles de Conduite', content: `Les utilisateurs s'engagent à :
• Respecter les autres joueurs (aucune insulte, menace, ou comportement toxique).
• Ne pas utiliser de triche ou de logiciels tiers pour altérer le jeu.
• Ne pas publier de contenu illégal, offensant, ou inapproprié sur le forum ou dans les discussions.

Sanctions possibles :
• Avertissement
• Suspension temporaire ou définitive du compte
• Signalement aux autorités compétentes en cas d'activité illégale` },
  { title: '6. Propriété Intellectuelle', content: `• Tous les contenus du site et du jeu (cartes, graphismes, interface, sons, etc.) sont protégés par des droits de propriété intellectuelle.
• L'utilisation non autorisée de ces contenus est strictement interdite.` },
  { title: '7. Limitation de Responsabilité', content: `• Le site et le jeu UNIT sont proposés "en l'état".
• L'éditeur ne garantit pas l'absence de bugs ou d'interruptions temporaires.
• L'éditeur n'est pas responsable des pertes de données, dysfonctionnements techniques, ou dommages indirects liés à l'utilisation du jeu.` },
  { title: '8. Données Personnelles', content: `• Les données collectées sont utilisées pour améliorer l'expérience utilisateur.
• UNIT s'engage à protéger vos données conformément au RGPD.
• Les utilisateurs peuvent demander la suppression de leurs données en contactant le support.` },
  { title: '9. Contact', content: `Pour toute question ou demande, veuillez contacter :
• Email : support@unitcardgame.com` },
];

const Accordion: React.FC<{ section: Section; index: number }> = ({ section, index }) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <div
      style={{
        borderBottom: '1px solid var(--cine-line)',
      }}
    >
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
        <div
          style={{
            paddingBottom: '1.6rem',
            color: 'var(--cine-ink-soft)',
            lineHeight: 1.7,
            whiteSpace: 'pre-line',
            fontSize: '1rem',
            maxWidth: 760,
          }}
        >
          {section.content}
        </div>
      )}
    </div>
  );
};

const TermsPage: React.FC = () => (
  <CinePage>
    <CinePageHeader
      eyebrow="Légal"
      title={<>Conditions <em>Générales d'Utilisation.</em></>}
      lede={`Dernière mise à jour : ${new Date().toLocaleDateString('fr-FR')}`}
    />

    <CineContainer variant="narrow">
      <div style={{ paddingBottom: '6rem' }}>
        {SECTIONS.map((s, i) => (
          <Accordion key={s.title} section={s} index={i} />
        ))}

        <p
          className="cine-mono"
          style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--cine-ink-dim)' }}
        >
          En utilisant UNIT, vous acceptez ces conditions générales d'utilisation.
        </p>
      </div>
    </CineContainer>
  </CinePage>
);

export default TermsPage;
