import React, { useEffect } from 'react';
import './Cinematic/cinematic.css';
import TopBar from './Cinematic/TopBar';
import SideRail from './Cinematic/SideRail';
import ActHero from './Cinematic/ActHero';
import ActLore from './Cinematic/ActLore';
import ActMechanic from './Cinematic/ActMechanic';
import ActLadder from './Cinematic/ActLadder';
import ActCommunity from './Cinematic/ActCommunity';
import ActCTA from './Cinematic/ActCTA';

const SECTIONS = [
  { id: 'act-hero',      label: 'Ouverture' },
  { id: 'act-lore',      label: 'Le Codex' },
  { id: 'act-mechanic',  label: 'Le Jeu' },
  { id: 'act-ladder',    label: "L'Arène" },
  { id: 'act-community', label: 'Communauté' },
  { id: 'act-cta',       label: 'Le Pari' },
];

const HomePage: React.FC = () => {
  // Marque le body pour permettre à App.tsx de cacher la navbar globale via CSS si besoin.
  // On utilise aussi cette classe pour neutraliser le padding-top du wrapper.
  useEffect(() => {
    document.body.classList.add('home-cinematic');
    return () => {
      document.body.classList.remove('home-cinematic');
    };
  }, []);

  return (
    <div className="cinematic-home">
      <TopBar />
      <SideRail sections={SECTIONS} />
      <ActHero />
      <ActLore />
      <ActMechanic />
      <ActLadder />
      <ActCommunity />
      <ActCTA />
    </div>
  );
};

export default HomePage;
