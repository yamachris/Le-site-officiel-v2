import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CinePage } from '../../components/cine';
import './RulesPage.css';

type RuleChapter = {
  id: string;
  number: string;
  title: string;
  markdown: string;
};

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const parseChapters = (source: string): RuleChapter[] => {
  const matches = Array.from(source.matchAll(/^## (\d+)\.\s+(.+)$/gm));
  return matches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? source.length;
    const number = match[1];
    const title = match[2].trim();
    return {
      id: `${number}-${slugify(title)}`,
      number,
      title,
      markdown: source.slice(start, end).trim(),
    };
  });
};

const renderInline = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|«[^»]+»)/g);
  return parts.filter(Boolean).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
};

const MarkdownTable: React.FC<{ lines: string[] }> = ({ lines }) => {
  const rows = lines
    .filter((line) => !/^\|?\s*:?-+/.test(line.replace(/\|/g, '')))
    .map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()));
  if (!rows.length) return null;
  return (
    <div className="official-table-wrap">
      <table className="official-table">
        <thead>
          <tr>{rows[0].map((cell, index) => <th key={index}>{renderInline(cell)}</th>)}</tr>
        </thead>
        <tbody>
          {rows.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{renderInline(cell)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MarkdownBlocks: React.FC<{ markdown: string }> = ({ markdown }) => {
  const lines = markdown.split('\n');
  const output: React.ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line || line === '---') {
      index += 1;
      continue;
    }
    if (line.startsWith('### ')) {
      output.push(<h3 key={index}>{line.slice(4)}</h3>);
      index += 1;
      continue;
    }
    if (line.startsWith('**') && line.endsWith('**')) {
      output.push(<h4 key={index}>{renderInline(line)}</h4>);
      index += 1;
      continue;
    }
    if (line.startsWith('> ')) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('> ')) {
        quote.push(lines[index].trim().slice(2));
        index += 1;
      }
      output.push(<blockquote key={`quote-${index}`}>{quote.map((item, i) => <p key={i}>{renderInline(item)}</p>)}</blockquote>);
      continue;
    }
    if (line.startsWith('|')) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      output.push(<MarkdownTable key={`table-${index}`} lines={tableLines} />);
      continue;
    }
    if (/^[-*]\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s/, ''));
        index += 1;
      }
      output.push(<ul key={`list-${index}`}>{items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}</ul>);
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s/, ''));
        index += 1;
      }
      output.push(<ol key={`ordered-${index}`}>{items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}</ol>);
      continue;
    }
    if (line.startsWith('![')) {
      output.push(
        <figure key={index} className="board-figure">
          <img src="/assets/plateau.png" alt="Plateau de jeu UNIT" />
          <figcaption>Plateau officiel UNIT</figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(### |>|[-*]\s|\d+\.\s|\||!\[|\*\*[^*]+\*\*$)/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    output.push(<p key={`paragraph-${index}`}>{renderInline(paragraph.join(' '))}</p>);
  }

  return <>{output}</>;
};

const ChapterContent: React.FC<{ markdown: string }> = ({ markdown }) => {
  const sectionMatches = Array.from(markdown.matchAll(/^###\s+(.+)$/gm));
  if (!sectionMatches.length) return <MarkdownBlocks markdown={markdown} />;

  const intro = markdown.slice(0, sectionMatches[0].index).trim();
  const sections = sectionMatches.map((match, index) => ({
    title: match[1].trim(),
    content: markdown
      .slice(
        (match.index ?? 0) + match[0].length,
        sectionMatches[index + 1]?.index ?? markdown.length,
      )
      .trim(),
  }));

  return (
    <>
      {intro && <MarkdownBlocks markdown={intro} />}
      <div className="rules-subsections">
        {sections.map((section, index) => (
          <details key={section.title} open={index === 0}>
            <summary>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{section.title}</strong>
              <i>+</i>
            </summary>
            <div className="rules-subsection-content">
              <MarkdownBlocks markdown={section.content} />
            </div>
          </details>
        ))}
      </div>
    </>
  );
};

const RulesPage: React.FC = () => {
  const [source, setSource] = useState('');
  const [activeId, setActiveId] = useState('');
  const [query, setQuery] = useState('');
  const [showIndex, setShowIndex] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/UNIT_Regles_du_jeu-copie.md')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then(setSource)
      .catch(() => setError("Le livre de règles officiel n'a pas pu être chargé."));
  }, []);

  const chapters = useMemo(() => parseChapters(source), [source]);
  const filteredChapters = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('fr');
    if (!normalized) return chapters;
    return chapters.filter((chapter) =>
      `${chapter.title} ${chapter.markdown}`.toLocaleLowerCase('fr').includes(normalized),
    );
  }, [chapters, query]);

  useEffect(() => {
    if (!activeId && chapters.length) setActiveId(chapters[0].id);
  }, [activeId, chapters]);

  const activeIndex = Math.max(0, chapters.findIndex((chapter) => chapter.id === activeId));
  const activeChapter = chapters[activeIndex];

  const selectChapter = (id: string) => {
    setActiveId(id);
    setShowIndex(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeChapter = (direction: number) => {
    const nextIndex = Math.min(chapters.length - 1, Math.max(0, activeIndex + direction));
    if (chapters[nextIndex]) selectChapter(chapters[nextIndex].id);
  };

  return (
    <CinePage>
      <main className="official-rules-page">
        <section className="official-rules-hero">
          <div className="official-rules-suits" aria-hidden>♠ <span>♥</span> ♦ ♣</div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="official-kicker">
            Document officiel · édition 3.1
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
            Les règles complètes de <em>UNIT</em>
          </motion.h1>
          <p className="official-rules-intro">
            Le livre de référence intégral : mise en place, unités, attaques, Révolution,
            têtes de jeu, 7 de chance, Joker et interactions avancées.
          </p>
          <div className="official-rule-stats">
            <span><strong>54</strong> cartes par joueur</span>
            <span><strong>10</strong> points de vie</span>
            <span><strong>13</strong> chapitres</span>
            <span><strong>100 %</strong> règles officielles</span>
          </div>
        </section>

        <section className="rules-reader">
          <div className="rules-reader-toolbar">
            <button className="rules-index-toggle" onClick={() => setShowIndex((current) => !current)}>
              <span className="rules-index-icon">☷</span>
              {showIndex ? 'Fermer le sommaire' : 'Explorer les chapitres'}
            </button>
            <div className="rules-progress-label">
              <span>{String(activeIndex + 1).padStart(2, '0')}</span>
              <div className="rules-progress-track">
                <i style={{ width: `${((activeIndex + 1) / Math.max(chapters.length, 1)) * 100}%` }} />
              </div>
              <span>{String(chapters.length).padStart(2, '0')}</span>
            </div>
            <label className="rules-search-compact">
              <span>⌕</span>
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setShowIndex(true);
                }}
                placeholder="Chercher une règle…"
              />
            </label>
          </div>

          <AnimatePresence>
            {showIndex && (
              <motion.div
                className="rules-chapter-deck"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="rules-chapter-deck-grid">
                  {filteredChapters.map((chapter, index) => (
                    <motion.button
                      key={chapter.id}
                      className={activeId === chapter.id ? 'active' : ''}
                      onClick={() => selectChapter(chapter.id)}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.025 }}
                    >
                      <span>{chapter.number.padStart(2, '0')}</span>
                      <strong>{chapter.title}</strong>
                      <i>Ouvrir →</i>
                    </motion.button>
                  ))}
                </div>
                {source && !filteredChapters.length && (
                  <div className="official-empty">Aucun chapitre ne correspond à « {query} ».</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <article className="official-rules-book">
            {!source && !error && <div className="official-loading">Ouverture du livre de règles…</div>}
            {error && <div className="official-error">{error}</div>}
            <AnimatePresence mode="wait">
              {activeChapter && (
                <motion.section
                  key={activeChapter.id}
                  className="official-rule-chapter"
                  initial={{ opacity: 0, x: 24, scale: .99 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -24, scale: .99 }}
                  transition={{ duration: .32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="official-chapter-heading">
                    <span>{activeChapter.number.padStart(2, '0')}</span>
                    <div>
                      <small>Chapitre {activeChapter.number} sur {chapters.length}</small>
                      <h2>{activeChapter.title}</h2>
                    </div>
                  </div>
                  <div className="official-chapter-content">
                    <ChapterContent markdown={activeChapter.markdown} />
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </article>

          {activeChapter && (
            <nav className="rules-reader-navigation" aria-label="Navigation entre les chapitres">
              <button onClick={() => changeChapter(-1)} disabled={activeIndex === 0}>
                <span>←</span>
                <small>Précédent</small>
                <strong>{chapters[activeIndex - 1]?.title || 'Début'}</strong>
              </button>
              <button className="rules-reader-center" onClick={() => setShowIndex(true)}>
                <span>◆</span>
                <small>Sommaire</small>
                <strong>{activeIndex + 1} / {chapters.length}</strong>
              </button>
              <button onClick={() => changeChapter(1)} disabled={activeIndex === chapters.length - 1}>
                <span>→</span>
                <small>Suivant</small>
                <strong>{chapters[activeIndex + 1]?.title || 'Fin'}</strong>
              </button>
            </nav>
          )}
        </section>
      </main>
    </CinePage>
  );
};

export default RulesPage;
