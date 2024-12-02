import React from 'react';
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

const PrivacyPage: React.FC = () => {
  const sections = [
    {
      title: "1. Introduction",
      content: (
        <>
          <Typography paragraph>
            La présente Politique de Confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles lorsque vous utilisez notre site web et jeu <strong>UNIT</strong>. Nous nous engageons à respecter votre vie privée et à protéger vos données conformément aux lois applicables, notamment le <strong>Règlement Général sur la Protection des Données (RGPD)</strong>.
          </Typography>
        </>
      )
    },
    {
      title: "2. Données Collectées",
      content: (
        <>
          <Typography variant="h6" gutterBottom>2.1. Données fournies par l'utilisateur :</Typography>
          <Typography paragraph>
            <strong>Lors de l'inscription :</strong>
            <ul>
              <li>Nom d'utilisateur ou pseudonyme</li>
              <li>Adresse email</li>
              <li>Mot de passe (crypté et sécurisé)</li>
            </ul>
            <strong>Lors de l'utilisation :</strong>
            <ul>
              <li>Messages envoyés sur le forum</li>
              <li>Contenus partagés dans la communauté</li>
            </ul>
          </Typography>
          <Typography variant="h6" gutterBottom>2.2. Données collectées automatiquement :</Typography>
          <Typography paragraph>
            <strong>Données techniques :</strong>
            <ul>
              <li>Adresse IP</li>
              <li>Type de navigateur et système d'exploitation</li>
              <li>Logs de connexion</li>
            </ul>
            <strong>Données d'utilisation :</strong>
            <ul>
              <li>Temps passé sur le jeu</li>
              <li>Actions réalisées dans les parties (statistiques)</li>
              <li>Pages visitées sur le site</li>
            </ul>
          </Typography>
          <Typography variant="h6" gutterBottom>2.3. Données financières :</Typography>
          <Typography paragraph>
            Lors d'un achat dans la boutique ou d'un abonnement Premium :
            <ul>
              <li>Historique des transactions</li>
              <li>Coordonnées de paiement (gérées par des prestataires tiers sécurisés)</li>
            </ul>
          </Typography>
        </>
      )
    },
    {
      title: "3. Utilisation des Données",
      content: (
        <Typography paragraph>
          Vos données sont utilisées pour :
          <ul>
            <li><strong>Assurer le fonctionnement du jeu :</strong>
              <ul>
                <li>Créer et gérer votre compte</li>
                <li>Suivre vos performances et statistiques</li>
              </ul>
            </li>
            <li><strong>Améliorer l'expérience utilisateur :</strong>
              <ul>
                <li>Analyser les comportements des joueurs pour optimiser le gameplay</li>
                <li>Proposer des contenus personnalisés</li>
              </ul>
            </li>
            <li><strong>Gérer les paiements :</strong>
              <ul>
                <li>Assurer les transactions sécurisées</li>
              </ul>
            </li>
            <li><strong>Communiquer avec vous :</strong>
              <ul>
                <li>Notifications liées au jeu ou au compte</li>
                <li>Informations sur des événements et nouveautés</li>
              </ul>
            </li>
          </ul>
        </Typography>
      )
    },
    {
      title: "4. Partage des Données",
      content: (
        <Typography paragraph>
          Nous ne vendons jamais vos données personnelles à des tiers. Cependant, certaines données peuvent être partagées dans les cas suivants :
          <ul>
            <li><strong>Prestataires de services tiers :</strong>
              <ul>
                <li>Plateformes de paiement pour gérer les transactions</li>
                <li>Services d'hébergement pour assurer la disponibilité du site et du jeu</li>
              </ul>
            </li>
            <li><strong>Obligations légales :</strong>
              <ul>
                <li>Si la loi l'exige, vos données peuvent être communiquées aux autorités compétentes</li>
              </ul>
            </li>
          </ul>
        </Typography>
      )
    },
    {
      title: "5. Conservation des Données",
      content: (
        <Typography paragraph>
          Vos données personnelles sont conservées :
          <ul>
            <li>Aussi longtemps que votre compte est actif</li>
            <li>Jusqu'à 5 ans après la suppression de votre compte, pour des obligations légales ou des litiges potentiels</li>
          </ul>
        </Typography>
      )
    },
    {
      title: "6. Sécurité des Données",
      content: (
        <Typography paragraph>
          Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données :
          <ul>
            <li>Cryptage des mots de passe et des transactions</li>
            <li>Stockage sécurisé des données sur des serveurs protégés</li>
            <li>Limitation des accès aux données personnelles aux seuls employés autorisés</li>
          </ul>
        </Typography>
      )
    },
    {
      title: "7. Vos Droits",
      content: (
        <Typography paragraph>
          Conformément au RGPD, vous disposez des droits suivants :
          <ul>
            <li><strong>Accès :</strong> Vous pouvez demander une copie de vos données personnelles</li>
            <li><strong>Rectification :</strong> Vous pouvez corriger les informations inexactes</li>
            <li><strong>Suppression :</strong> Vous avez le droit de demander la suppression de vos données</li>
            <li><strong>Portabilité :</strong> Vous pouvez demander un transfert de vos données</li>
            <li><strong>Opposition :</strong> Vous pouvez vous opposer à l'utilisation de vos données à des fins marketing</li>
            <li><strong>Retrait du consentement :</strong> Vous pouvez retirer votre consentement à tout moment</li>
          </ul>
          Pour exercer ces droits, contactez-nous à : <strong>privacy@unitcardgame.com</strong>
        </Typography>
      )
    },
    {
      title: "8. Cookies",
      content: (
        <>
          <Typography variant="h6" gutterBottom>8.1. Qu'est-ce qu'un cookie ?</Typography>
          <Typography paragraph>
            Les cookies sont de petits fichiers enregistrés sur votre appareil pour collecter des informations sur vos activités en ligne.
          </Typography>
          <Typography variant="h6" gutterBottom>8.2. Types de cookies utilisés :</Typography>
          <Typography paragraph>
            <ul>
              <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
              <li><strong>Cookies analytiques :</strong> Pour mesurer l'audience et améliorer le jeu</li>
              <li><strong>Cookies publicitaires :</strong> Pour afficher des publicités pertinentes (avec consentement)</li>
            </ul>
          </Typography>
        </>
      )
    },
    {
      title: "9. Contact",
      content: (
        <Typography paragraph>
          Pour toute question ou réclamation concernant vos données personnelles :
          <ul>
            <li><strong>Email :</strong> privacy@unitcardgame.com</li>
          </ul>
        </Typography>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Politique de Confidentialité
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          {sections.map((section, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6">{section.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {section.content}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Dernière mise à jour : 1er décembre 2024
          </Typography>
        </Box>
      </Container>
    </motion.div>
  );
};

export default PrivacyPage;
