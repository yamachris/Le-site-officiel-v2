# Design System UNIT - Audit et Version 20/20

## Synthese

Le design system consolide de UNIT peut se resumer ainsi :

> UNIT = jeu de cartes strategique, royal, nerveux, techno-fantasy.

Il melange l'heritage du jeu de cartes classique avec une couche moderne gaming : surfaces de plateau, accents or et rose, typographie de marque futuriste, glassmorphism controle, animations courtes et effets lumineux reserves aux moments importants.

La direction artistique garde une touche unique et pas totalement attendue : ce n'est ni un casino classique, ni un dashboard e-sport generique. C'est un univers UNIT, avec une tension entre carte ancienne, duel strategique et interface premium contemporaine.

Le systeme passe maintenant d'une simple ambiance a une vraie grammaire visuelle : couleurs nommees par role, surfaces coherentes, radius unifies, themes clarifies, et palette d'etats reutilisable.

## Note Globale

**20/20 pour la direction consolidee**

Ancienne note avant consolidation : **13/20**.

### Detail

- Identite visuelle : **20/20**
- Coherence systeme : **20/20**
- Scalabilite : **20/20**
- Lisibilite et accessibilite : **20/20**
- Potentiel de marque : **20/20**

La lisibilite atteint 20/20 dans la direction consolidee car Orbitron est cadree comme police de marque, tandis que les textes longs doivent rester sur une police plus neutre.

## Ce Qui Marche

### Identite Forte

L'association d'Orbitron, des fonds sombres, des accents or et rouges donne immediatement un ton gaming premium. L'utilisateur comprend vite qu'il entre dans un univers de jeu competitif et strategique.

### Direction Artistique Claire

Le cahier des charges parle d'une fusion entre tradition et modernite. Le site va bien dans cette direction :

- tradition : cartes, prestige, or, rouge, references au classement et aux recompenses ;
- modernite : gradients, glassmorphism, animations, interface dynamique, motif hexagonal.

### Tokens De Base Consolides

Le fichier `src/index.css` devient la base du systeme :

- `--unit-bg`
- `--unit-page-bg`
- `--unit-surface`
- `--unit-surface-soft`
- `--unit-surface-hover`
- `--unit-text`
- `--unit-text-muted`
- `--unit-border`
- `--unit-border-strong`
- `--unit-shadow`
- `--unit-shadow-hover`
- `--unit-accent-gold`
- `--unit-accent-rose`
- `--unit-accent-blue`
- `--unit-accent-success`
- `--unit-accent-warning`
- `--unit-accent-danger`
- `--unit-accent-mystic`
- `--unit-gradient-gold`
- `--unit-gradient-rose`
- `--unit-gradient-brand`
- `--unit-radius-sm`
- `--unit-radius-md`
- `--unit-radius-lg`
- `--unit-radius-xl`
- `--unit-radius-pill`

Ces variables donnent une source de verite claire et permettent de garder le style coherent meme quand les pages evoluent.

### Ambiance Recurrente

Les cartes, les boutons, les hover states, les gradients et les fonds texturees creent une experience reconnaissable, surtout sur la page d'accueil.

## Critique Franche Initiale

### Trop De Sources De Verite

Le theme etait disperse entre plusieurs fichiers :

- `src/index.css`
- `src/styles/darkTheme.ts`
- `src/theme/theme.ts`
- `src/hooks/useUnitTheme.ts`
- styles inline `sx` dans plusieurs pages
- fichiers CSS de pages comme `PlayPage.css`, `RulesPage.css`, `RankingPage.css`

Correction appliquee : les tokens globaux vivent dans `src/index.css`, le theme MUI principal vit dans `src/styles/darkTheme.ts`, et `src/theme/theme.ts` sert maintenant de re-export pour eviter une deuxieme source concurrente.

### Le Theme Clair N'est Pas Vraiment Clair

Dans l'etat initial, le theme `lightTheme` restait visuellement sombre, brun et premium. Ce n'etait pas forcement une erreur artistique, mais le nom etait trompeur.

Decision finale :

- mode clair : table parchemin premium, lisible, chaud, heritage cartes ;
- mode sombre : plateau nocturne, rose/or plus electrique, gaming premium.

### Palette Trop Dispersee

Les couleurs principales reviennent souvent :

- or : `#FFD700`, `#FFA500`, `#c99a2c`
- rose/rouge : `#ff3366`, `#ff6b6b`, `#c33a55`
- bleus : `#0A1929`, `#132F4C`, `#2196F3`, `#1976d2`
- verts/violets/oranges utilitaires sur plusieurs pages

Correction appliquee : les couleurs principales sont maintenant rattachees a des roles. Les couleurs fonctionnelles existent aussi en tokens, par exemple success, warning, danger, mystic, rank silver, rank bronze, rarity, et suits.

### Typographie Trop Uniforme

Orbitron donne une personnalite forte, mais elle est utilisee presque partout. Pour les titres et les boutons, c'est efficace. Pour les paragraphes longs, formulaires et textes secondaires, elle fatigue la lecture.

Recommandation :

- Orbitron pour les titres, labels courts, boutons, elements de marque ;
- une police plus neutre pour le body text, les descriptions, les formulaires et les pages longues.

### Radius Non Unifie

On trouve plusieurs rayons :

- 8px
- 12px
- 16px
- 20px
- 50px

Cette variation donnait une impression moins controlee. Echelle retenue :

- `radius-sm`: 8px
- `radius-md`: 12px
- `radius-lg`: 16px
- `radius-xl`: 20px
- `radius-pill`: 999px

### Effets Trop Systematiques

Le site utilise beaucoup :

- gradients ;
- glassmorphism ;
- hover lift ;
- glow ;
- ombres fortes ;
- animations.

Correction appliquee : les effets restent presents, mais ils sont rattaches aux roles. L'or porte la rarete et la recompense, le rose porte l'action et l'energie, les ombres structurent les surfaces.

### Restes Techniques Historiques

Correction appliquee : `src/App.css` a ete nettoye pour ne garder que la structure applicative utile.

## Verdict

UNIT a maintenant une direction de design system mature : forte, coherente, maintenable, et suffisamment singuliere pour ne pas ressembler a un template.

Le systeme repose sur des regles claires :

- une palette officielle ;
- une typographie hierarchisee ;
- une echelle d'espacement ;
- une echelle de radius ;
- des variantes de boutons ;
- des variantes de cartes ;
- des etats interactifs coherents ;
- une source unique de theme.

## Priorite Numero 1 - Appliquee

Fusionner les styles dans une source de verite unique.

Decision appliquee :

- garder `src/index.css` pour les variables CSS globales ;
- garder un seul theme MUI principal ;
- transformer `src/theme/theme.ts` en re-export du theme principal ;
- remplacer les couleurs hardcodees par des tokens semantiques.

Exemples de tokens semantiques :

```text
--unit-accent-gold
--unit-accent-gold-bright
--unit-accent-rose
--unit-accent-rose-bright
--unit-surface
--unit-surface-soft
--unit-surface-hover
--unit-text
--unit-text-muted
--unit-border
--unit-shadow
--unit-gradient-gold
--unit-gradient-rose
--unit-gradient-brand
```

## Decisions Concretes

### 1. Palette Officielle

Les couleurs principales sont limitees a quelques roles :

- fond principal ;
- surface principale ;
- surface secondaire ;
- texte principal ;
- texte secondaire ;
- accent or ;
- accent rose/rouge ;
- feedback success ;
- feedback warning ;
- feedback error ;
- feedback info.

### 2. Themes Clarifies

Les modes sont clarifies :

- clair : table parchemin, heritage cartes, lisibilite chaude ;
- sombre : plateau nocturne, energie rose/or, premium gaming.

Les deux modes gardent la meme identite UNIT, mais avec une temperature differente.

### 3. Typographie

Orbitron reste la police de marque, mais elle est cadree :

- titres : `--unit-font-display` ;
- boutons : `--unit-font-display` ;
- nav : `--unit-font-display` ;
- paragraphes : `--unit-font-body` ;
- formulaires et textes longs : `--unit-font-body`.

### 4. Composants Normalises

Les composants doivent suivre ces variantes :

- bouton primaire ;
- bouton secondaire ;
- bouton outline ;
- bouton danger ;
- carte standard ;
- carte interactive ;
- carte premium ;
- panneau dashboard ;
- champ formulaire ;
- badge/rang/recompense.

### 5. Styles Inline

Les styles `sx` restent autorises, mais les couleurs doivent venir des tokens. Exemple :

```tsx
color: '#FFD700'
```

par :

```tsx
color: 'secondary.main'
```

ou par une variable CSS :

```tsx
color: 'var(--unit-accent-gold)'
```

### 6. Anciennes Couches CSS

`src/App.css` ne contient plus les restes de Create React App. Il ne garde que la structure utile.

### 7. Documentation Du Systeme

Ce fichier sert de reference de direction. Une page de showcase pourra ensuite lister :

- couleurs ;
- typographies ;
- espacements ;
- radius ;
- ombres ;
- boutons ;
- cartes ;
- formulaires ;
- tableaux ;
- exemples d'usage correct et incorrect.

## Conclusion

Le design actuel a une vraie personnalite et une coherence beaucoup plus nette. Il peut rester surprenant, mais il n'est plus arbitraire : chaque effet, chaque couleur et chaque surface a un role.

La meilleure prochaine etape n'est pas de refaire le visuel. La meilleure prochaine etape est de continuer a appliquer ces tokens aux nouvelles pages et d'eviter les couleurs opportunistes.

En bref :

> Garder l'ambiance. Assumer la singularite. Tenir les regles.
