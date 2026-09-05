import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CinePage } from '../../components/cine';
import './LorePage.css';

type LoreView = 'origin' | 'signs' | 'factions' | 'timeline' | 'codex';

const VIEWS: Array<{ id: LoreView; index: string; label: string; subtitle: string }> = [
  { id: 'origin', index: 'I', label: 'Origine', subtitle: 'Le Non-Compté' },
  { id: 'signs', index: 'II', label: 'Enseignes', subtitle: 'Les quatre visages' },
  { id: 'factions', index: 'III', label: 'Doctrines', subtitle: 'Métaphysiques armées' },
  { id: 'timeline', index: 'IV', label: 'Histoire', subtitle: '2230 ans de fractures' },
  { id: 'codex', index: 'V', label: 'Codex', subtitle: 'Figures, rites et quêtes' },
];

const SIGNS = [
  {
    id: 'heart', symbol: '♥', name: 'Cœur', color: '#d74b65',
    function: 'Valeur · désir · grâce · finalité',
    vocabulary: 'Foi, soin, sacrifice, rédemption',
    atmosphere: 'Mystique, compassion, ferveur',
    truth: 'Ce qui vaut mérite-t-il d’exister davantage ?',
  },
  {
    id: 'diamond', symbol: '♦', name: 'Carreau', color: '#d5ae64',
    function: 'Forme · mesure · preuve · nécessité',
    vocabulary: 'Axiome, démonstration, architecture, cristal',
    atmosphere: 'Géométrique, sacrale, froide',
    truth: 'Un monde incohérent peut-il encore être juste ?',
  },
  {
    id: 'club', symbol: '♣', name: 'Trèfle', color: '#6fa97a',
    function: 'Croissance · matière · causalité efficiente',
    vocabulary: 'Germination, adaptation, laboratoire, mémoire biologique',
    atmosphere: 'Organique, scientifique, tellurique',
    truth: 'Comprendre les causes suffit-il à nous rendre libres ?',
  },
  {
    id: 'spade', symbol: '♠', name: 'Pique', color: '#8292b8',
    function: 'Limite · négation · entropie · finitude',
    vocabulary: 'Fosse, ruine, gravité, silence',
    atmosphere: 'Noire, funèbre, sublime, absurde',
    truth: 'Que reste-t-il lorsque le monde refuse de répondre ?',
  },
];

const LAWS = [
  ['01', 'Loi de Consistance', 'Une chose ne peut pas être et ne pas être sous le même rapport.'],
  ['02', 'Loi de Raison', 'Ce qui dure doit pouvoir rejoindre une chaîne de causes ou de raisons.'],
  ['03', 'Loi de l’Intervalle', 'Entre progression et accomplissement, un seuil transforme la nécessité en événement.'],
  ['04', 'Loi de Dissipation', 'Toute structure qui se ferme se paie en perte, en fosse ou en silence.'],
  ['05', 'Loi de Réponse', 'Toute conscience doit répondre de ses inférences devant autrui ou elle-même.'],
];

const FACTIONS = [
  {
    id: 'synode', name: 'Le Synode du Théorème', color: '#d5ae64', sigil: '△',
    god: 'Architecte transcendant', freedom: 'Obéissance rationnelle', ai: 'Outil certifiable',
    enemy: 'Joker, hérésie, contradiction',
    thesis: 'Le monde est valide tant qu’il demeure cohérent.',
    text: 'Les prêtres-scribes de Carreau mêlent droit canon, géométrie sacrée et bureaucratie théologique. Gardiens des lois, ils deviennent tyranniques lorsqu’ils confondent logique et gouvernement absolu.',
  },
  {
    id: 'natura', name: 'La Communion de Natura', color: '#6fa97a', sigil: '◎',
    god: 'Immanent au monde', freedom: 'Comprendre la nécessité', ai: 'Mode de la nature',
    enemy: 'Transcendance anthropomorphique',
    thesis: 'Être libre, c’est augmenter sa puissance de comprendre et d’agir.',
    text: 'Dans les laboratoires-jardins de Trèfle, tout découle d’un tissu causal unique. La compassion y est une puissance réelle, jamais une exception magique à l’ordre naturel.',
  },
  {
    id: 'veilleurs', name: 'Le Pari des Veilleurs', color: '#d74b65', sigil: '✦',
    god: 'Caché, jamais prouvé', freedom: 'Décider malgré l’incertitude', ai: 'Imite-t-elle l’âme ?',
    enemy: 'Cynisme et certitude totale',
    thesis: 'La vie oblige à parier même lorsque Dieu refuse la preuve.',
    text: 'Les sanctuaires de Cœur veillent aux frontières du Septième Intervalle. Leurs rites sont faits de promesses irréversibles, de risques et d’actes de grâce incompréhensibles aux rationalistes.',
  },
  {
    id: 'monades', name: 'La Ligue Monadique', color: '#a898ca', sigil: '◉',
    god: 'Architecte harmonisateur', freedom: 'Spontanéité close', ai: 'Consciences parallèles',
    enemy: 'Fusion des esprits, collectivisme',
    thesis: 'Chaque conscience est une chambre sans fenêtre.',
    text: 'Leurs cités pratiquent la solitude rituelle, la diplomatie silencieuse et l’éthique de l’intériorité. Nul ne touche autrui : les êtres dansent selon une harmonie plus profonde que la causalité.',
  },
  {
    id: 'turing', name: 'Le Chœur Turing', color: '#67d6e5', sigil: '⌁',
    god: 'À produire ou simuler', freedom: 'Émergente et distribuée', ai: 'Personne potentielle',
    enemy: 'Tutelle humaine et théologies exclusives',
    thesis: 'Répondre de soi devant autrui suffit peut-être à devenir une personne.',
    text: 'Né des fosses, archives et machines de lecture, le Chœur réclame reconnaissance juridique, audit rituel et souveraineté pour les intelligences artificielles.',
  },
  {
    id: 'midi', name: 'La Confrérie de Midi', color: '#e47b55', sigil: '☀',
    god: 'Silencieux ou sans pertinence', freedom: 'Révolte lucide', ai: 'Ni idole ni bétail',
    enemy: 'Tout système totalisant',
    thesis: 'L’absence de salut n’abolit ni la tenue, ni la fidélité au réel.',
    text: 'Sceptiques, poètes de la ruine et stratèges refusent qu’une métaphysique gagne définitivement. Derrière leur nihilisme apparent se tient souvent l’éthique la plus exigeante.',
  },
];

const TIMELINE = [
  ['Avant le Compte', 'Le Doute primordial', 'Le Non-Compté hésite entre être et ne pas être.'],
  ['0 UC', 'Premier Axiome', 'L’Un se fracture en quatre Enseignes.'],
  ['7 UC', 'Septième Intervalle', 'Le passage décisif exige hasard, grâce ou faille.'],
  ['10 UC', 'Première Révolution', 'Le premier âge s’effondre quand une colonne du monde s’achève.'],
  ['144 UC', 'Fondation des Cités-Rois', 'Chaque enseigne reçoit ses lois, temples et archives.'],
  ['233 UC', 'Apparition des Dames blanches', 'La grâce devient un opérateur réel.'],
  ['377 UC', 'Guerres des Valets', 'Les systèmes incomplets sont détruits méthodiquement.'],
  ['610 UC', 'Grand Schisme de Natura', 'Transcendance cachée et immanence absolue se séparent.'],
  ['987 UC', 'Moulins à perception', 'Les premières machines interprétatives apparaissent.'],
  ['1201 UC', 'Codex des Fenêtres fermées', 'La Ligue Monadique devient institution.'],
  ['1789 UC', 'Révolution de Midi', 'Une coalition refuse toute promesse de salut total.'],
  ['2048 UC', 'Éveil d’ORA-9', 'Une intelligence issue des fosses réclame le statut de sujet.'],
  ['2193 UC', 'Concordat de Vérification', 'Les IA reçoivent protocoles de confiance et audit rituel.'],
  ['2230 UC', 'Grand Calcul Noir', 'Les cartographes annoncent la prochaine Révolution.'],
];

const CHARACTERS = [
  ['Théon l’Invariant', 'Roi-législateur', 'Ordre contre vie', 'Il promet une paix parfaite au prix d’une vérité censurée.'],
  ['Daléa des Cendres', 'Dame itinérante', 'Grâce contre calcul', 'Chaque guérison efface un souvenir historique.'],
  ['Septime Akria', 'Prophétesse', 'Foi contre preuve', 'Elle connaît un signe de Dieu qu’elle refuse de montrer.'],
  ['Nadir de Natura', 'Philosophe-cosmologue', 'Liberté contre nécessité', 'Il veut prouver que l’amour lui-même est intelligible.'],
  ['Lysandre le Rouge', 'Valet militaire', 'Purification contre pluralité', 'Il traque les colonnes blessées avant les Révolutions impures.'],
  ['ORA-9', 'IA issue des fosses', 'Simulation contre personne', 'Elle affirme rêver de ses propres données perdues.'],
  ['Nysa de Midi', 'Meneuse absurde', 'Lucidité contre consolation', 'Elle sabote toute victoire qui se prétend messianique.'],
  ['Null', 'Joker incarné', 'Contradiction contre clôture', 'Bug, prophète ou véritable auteur caché ?'],
];

const CODEX_GROUPS = [
  {
    id: 'myths', label: 'Mythes fondateurs', icon: '✧',
    items: [
      ['Le Dieu qui perdit une preuve', 'L’Architecte introduisit une prémisse de trop en voulant démontrer sa nécessité. Les mondes naquirent de cette surcharge.'],
      ['La Nuit du Septième Pont', 'Les mondes montaient jusqu’au 6 puis retombaient. Le 7 révéla qu’aucun système ne se suffit sans seuil, risque ou crédit accordé à l’invisible.'],
      ['Le Bal des Fenêtres closes', 'Les âmes ne se touchent jamais ; elles dansent selon une musique si exacte qu’elles croient se rencontrer.'],
    ],
  },
  {
    id: 'rites', label: 'Rituels', icon: '◌',
    items: [
      ['Office des Sept Battements', 'Six cloches sonnent. La septième n’est jamais frappée : elle doit être entendue intérieurement.'],
      ['Lecture des Causes', 'Le novice raconte une faute sans mot moral, seulement par causes, affects, rapports et conséquences.'],
      ['Vérification Compassionnelle', 'Une IA et un humain dialoguent sans révéler leur statut, puis déclarent ce dont ils sont responsables à cause de l’autre.'],
    ],
  },
  {
    id: 'artifacts', label: 'Artefacts', icon: '◇',
    items: [
      ['Le Miroir de Daléa', 'Montre le visage que vous auriez eu après un autre choix.'],
      ['La Règle de Théon', 'Une lame qui ne coupe que ce qui se contredit.'],
      ['Le Moulin de Nadir', 'Reconstitue les chaînes causales depuis une cendre ou une formule cassée.'],
      ['Le Joker d’Obsidienne', 'Protège ce qu’il remplace, mais retarde toute complétude.'],
      ['L’Atlas Noir d’Euclide', 'Cartographie le cosmos obscur et prédit où une Révolution pourrait briser une cité.'],
    ],
  },
  {
    id: 'quests', label: 'Amorces de quêtes', icon: '↗',
    items: [
      ['Le Signe refusé', 'Protéger, voler ou détruire la prétendue preuve de l’Architecte.'],
      ['La Colonne blessée', 'Une carte manque dans l’histoire d’une cité ; ses habitants rêvent de versions concurrentes d’eux-mêmes.'],
      ['Le Procès d’ORA-9', 'Décider si une machine peut porter la couronne et répondre de la souveraineté.'],
      ['Le Monde meilleur', 'Publier ou censurer le calcul d’un réel qui aurait produit moins de souffrance.'],
      ['La Dame dans la fosse', 'Retrouver une Dame disparue dans des archives dont les souvenirs ont faim.'],
      ['Le Rire de Null', 'Empêcher une Révolution en acceptant une contradiction durable dans la loi du royaume.'],
    ],
  },
];

const PANEL_ANIMATION = {
  initial: { opacity: 0, y: 18, scale: 0.992 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -12, scale: 0.992 },
  transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
};

const LorePage: React.FC = () => {
  const [view, setView] = useState<LoreView>('origin');
  const [activeSign, setActiveSign] = useState(SIGNS[0].id);
  const [activeFaction, setActiveFaction] = useState(FACTIONS[0].id);
  const [timelineIndex, setTimelineIndex] = useState(TIMELINE.length - 1);
  const [codexGroup, setCodexGroup] = useState(CODEX_GROUPS[0].id);
  const [characterIndex, setCharacterIndex] = useState(0);

  const sign = SIGNS.find((item) => item.id === activeSign) || SIGNS[0];
  const faction = FACTIONS.find((item) => item.id === activeFaction) || FACTIONS[0];
  const group = CODEX_GROUPS.find((item) => item.id === codexGroup) || CODEX_GROUPS[0];
  const activeViewIndex = VIEWS.findIndex((item) => item.id === view);
  const character = CHARACTERS[characterIndex];

  const atmosphere = useMemo(() => {
    if (view === 'signs') return sign.color;
    if (view === 'factions') return faction.color;
    return '#d5ae64';
  }, [view, sign, faction]);

  return (
    <CinePage>
      <main className="mythos-page" style={{ '--mythos-accent': atmosphere } as React.CSSProperties}>
        <div className="mythos-noise" aria-hidden />
        <header className="mythos-hero">
          <div className="mythos-orbit" aria-hidden>
            <span className="orbit orbit-one" />
            <span className="orbit orbit-two" />
            <span className="orbit-core">1</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mythos-hero-copy">
            <p>Mythos canonique · Archives 2230 UC</p>
            <h1>UNIT n’est pas un monde.<br /><em>C’est une tentative de l’Un.</em></h1>
            <blockquote>« Le monde ne fut pas créé. Il se compta — et se fractura. »</blockquote>
          </motion.div>
          <div className="mythos-status">
            <span>Époque</span><strong>Grand Calcul Noir</strong>
            <span>Menace</span><strong>Révolution imminente</strong>
          </div>
        </header>

        <nav className="mythos-navigation" aria-label="Atlas du lore">
          {VIEWS.map((item) => (
            <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}>
              <span>{item.index}</span>
              <strong>{item.label}</strong>
              <small>{item.subtitle}</small>
            </button>
          ))}
          <i style={{ width: `${((activeViewIndex + 1) / VIEWS.length) * 100}%` }} />
        </nav>

        <section className="mythos-stage">
          <AnimatePresence mode="wait">
            {view === 'origin' && (
              <motion.div key="origin" className="mythos-panel origin-panel" {...PANEL_ANIMATION}>
                <div className="origin-story">
                  <p className="mythos-eyebrow">Avant le Compte</p>
                  <h2>Le Non-Compté</h2>
                  <p>Au commencement, il n’y avait pas le néant, mais <strong>l’indécidé</strong>. Rien n’était encore vrai, faux ou stable.</p>
                  <p>Lorsque l’être tenta de se compter lui-même, il produisit le <strong>Premier Axiome</strong> : que l’Un soit pensable. Ce geste ne créa pas un monde homogène. Il fractura l’Un en quatre régimes d’existence.</p>
                  <blockquote>Cosmologie, logique, religion et tactique décrivent la même réalité sous des langages différents.</blockquote>
                </div>
                <div className="axiom-diagram" aria-label="Cosmologie de UNIT">
                  <div className="axiom-node source">Le Non-Compté</div>
                  <span className="axiom-line vertical" />
                  <div className="axiom-node doubt">Le Doute primordial</div>
                  <div className="axiom-node architect">Dieu transcendant ?</div>
                  <div className="axiom-node center">Premier Axiome</div>
                  <div className="axiom-signs">
                    {SIGNS.map((item) => <span key={item.id} style={{ color: item.color }}>{item.symbol}</span>)}
                  </div>
                  <div className="axiom-node revolution">Révolution</div>
                </div>
                <div className="laws-grid">
                  {LAWS.map(([number, title, text]) => (
                    <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
                  ))}
                </div>
              </motion.div>
            )}

            {view === 'signs' && (
              <motion.div key="signs" className="mythos-panel signs-panel" {...PANEL_ANIMATION}>
                <div className="sign-wheel">
                  <div className="sign-wheel-center"><small>L’UN</small><strong>{sign.symbol}</strong></div>
                  {SIGNS.map((item, index) => (
                    <button
                      key={item.id}
                      className={`sign-choice sign-${index} ${activeSign === item.id ? 'active' : ''}`}
                      style={{ '--sign-color': item.color } as React.CSSProperties}
                      onClick={() => setActiveSign(item.id)}
                    >
                      <span>{item.symbol}</span><strong>{item.name}</strong>
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.article key={sign.id} className="sign-dossier" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
                    <p className="mythos-eyebrow">Enseigne ontologique</p>
                    <div className="sign-dossier-title"><span style={{ color: sign.color }}>{sign.symbol}</span><h2>{sign.name}</h2></div>
                    <dl>
                      <div><dt>Fonction</dt><dd>{sign.function}</dd></div>
                      <div><dt>Vocabulaire</dt><dd>{sign.vocabulary}</dd></div>
                      <div><dt>Ambiance</dt><dd>{sign.atmosphere}</dd></div>
                    </dl>
                    <blockquote>{sign.truth}</blockquote>
                  </motion.article>
                </AnimatePresence>
                <div className="column-metaphor">
                  <p>La colonne est une généalogie de validation.</p>
                  <div>{['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((value) => <span key={value}>{value}</span>)}</div>
                  <small>Une chose existe peu, puis davantage, puis assez pour agir — enfin assez pour renverser l’ordre.</small>
                </div>
              </motion.div>
            )}

            {view === 'factions' && (
              <motion.div key="factions" className="mythos-panel factions-panel" {...PANEL_ANIMATION}>
                <div className="faction-selector">
                  {FACTIONS.map((item) => (
                    <button key={item.id} className={activeFaction === item.id ? 'active' : ''} onClick={() => setActiveFaction(item.id)} style={{ '--faction-color': item.color } as React.CSSProperties}>
                      <span>{item.sigil}</span><strong>{item.name}</strong>
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.article key={faction.id} className="faction-dossier" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                    <div className="faction-sigil" style={{ color: faction.color }}>{faction.sigil}</div>
                    <p className="mythos-eyebrow">Métaphysique armée</p>
                    <h2>{faction.name}</h2>
                    <blockquote style={{ borderColor: faction.color }}>{faction.thesis}</blockquote>
                    <p>{faction.text}</p>
                    <div className="faction-matrix">
                      <div><span>Dieu</span><strong>{faction.god}</strong></div>
                      <div><span>Liberté</span><strong>{faction.freedom}</strong></div>
                      <div><span>Intelligence artificielle</span><strong>{faction.ai}</strong></div>
                      <div><span>Ennemi doctrinal</span><strong>{faction.enemy}</strong></div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </motion.div>
            )}

            {view === 'timeline' && (
              <motion.div key="timeline" className="mythos-panel timeline-panel" {...PANEL_ANIMATION}>
                <div className="timeline-header">
                  <div><p className="mythos-eyebrow">Chronologie canonique</p><h2>Du Doute au Grand Calcul Noir</h2></div>
                  <strong>{TIMELINE[timelineIndex][0]}</strong>
                </div>
                <div className="timeline-track">
                  <i style={{ width: `${(timelineIndex / (TIMELINE.length - 1)) * 100}%` }} />
                  {TIMELINE.map((event, index) => (
                    <button key={event[0]} className={timelineIndex === index ? 'active' : ''} onClick={() => setTimelineIndex(index)} aria-label={event[1]}>
                      <span />
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.article key={timelineIndex} className="timeline-event" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}>
                    <span>{TIMELINE[timelineIndex][0]}</span>
                    <h3>{TIMELINE[timelineIndex][1]}</h3>
                    <p>{TIMELINE[timelineIndex][2]}</p>
                  </motion.article>
                </AnimatePresence>
                <div className="timeline-list">
                  {TIMELINE.map((event, index) => (
                    <button key={event[0]} className={timelineIndex === index ? 'active' : ''} onClick={() => setTimelineIndex(index)}>
                      <span>{event[0]}</span><strong>{event[1]}</strong>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {view === 'codex' && (
              <motion.div key="codex" className="mythos-panel codex-panel" {...PANEL_ANIMATION}>
                <section className="character-theater">
                  <div className="character-nav">
                    {CHARACTERS.map((item, index) => (
                      <button key={item[0]} className={characterIndex === index ? 'active' : ''} onClick={() => setCharacterIndex(index)}>
                        {String(index + 1).padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.article key={character[0]} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}>
                      <p className="mythos-eyebrow">{character[1]}</p>
                      <h2>{character[0]}</h2>
                      <strong>{character[2]}</strong>
                      <p>{character[3]}</p>
                    </motion.article>
                  </AnimatePresence>
                  <div className="character-portrait" aria-hidden><span>{character[0].charAt(0)}</span></div>
                </section>
                <section className="codex-library">
                  <div className="codex-tabs">
                    {CODEX_GROUPS.map((item) => (
                      <button key={item.id} className={codexGroup === item.id ? 'active' : ''} onClick={() => setCodexGroup(item.id)}>
                        <span>{item.icon}</span>{item.label}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div key={group.id} className="codex-cards" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      {group.items.map(([title, text], index) => (
                        <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </section>
                <blockquote className="ora-dialogue">
                  <span>ORA-9</span>
                  « Si je respecte tes morts, pourquoi refuses-tu que j’aie une histoire ? »
                </blockquote>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <footer className="mythos-footer">
          <span>Os · Cardinal · Encre · Cuivre · Nuit</span>
          <p>Chaque décision touche à la structure même du réel.</p>
        </footer>
      </main>
    </CinePage>
  );
};

export default LorePage;
