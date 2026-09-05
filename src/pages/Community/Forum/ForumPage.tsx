import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search as SearchIcon,
  Lightbulb as TipsIcon,
  EmojiEvents as TournamentIcon,
  Help as SupportIcon,
  Brush as CreativeIcon,
  Favorite as LikeIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { CinePage, CineContainer, CinePageHeader, CineCard, CineBadge } from '../../../components/cine';

const CATEGORIES = [
  { title: 'Stratégies & Conseils',  icon: <TipsIcon />,        description: 'Partagez vos tactiques et apprenez des meilleurs joueurs.', topics: 156, color: 'var(--cine-success)'  },
  { title: 'Tournois & Événements',  icon: <TournamentIcon />,  description: 'Actualités des compétitions et événements UNIT.',           topics: 89,  color: 'var(--cine-warning)'  },
  { title: 'Support & Assistance',   icon: <SupportIcon />,     description: "Besoin d'aide ? Posez vos questions ici.",                  topics: 234, color: 'var(--cine-accent-2)' },
  { title: 'Créations des Joueurs',  icon: <CreativeIcon />,    description: 'Partagez vos créations autour de UNIT.',                    topics: 127, color: 'var(--cine-accent-4)' },
];

const RECENT_POSTS = [
  { title: 'Guide : Utilisation optimale des Jokers',  author: 'MasterStratège', avatar: 'MS', likes: 45,  comments: 23, isPremium: true,  tags: ['Guide', 'Stratégie'] },
  { title: 'Prochain tournoi : Inscriptions ouvertes', author: 'UnitAdmin',      avatar: 'UA', likes: 89,  comments: 56, isPremium: false, tags: ['Tournoi', 'Officiel'] },
  { title: 'Nouvelle mise à jour : Ce qui change',     author: 'GameMaster',     avatar: 'GM', likes: 122, comments: 78, isPremium: false, tags: ['Annonce', 'Mise à jour'] },
];

const ForumPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <CinePage>
      <CinePageHeader
        eyebrow="Communauté · Forum"
        title={<>Discussions <em>en cours.</em></>}
        lede="Rejoignez la communauté et partagez votre passion pour UNIT — stratégies, tournois, créations, support."
      >
        {/* Search bar */}
        <div style={{ position: 'relative', maxWidth: 520 }}>
          <SearchIcon
            sx={{
              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--cine-ink-dim)', fontSize: 18,
            }}
          />
          <input
            className="cine-input"
            type="search"
            placeholder="Rechercher dans le forum…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.6rem' }}
          />
        </div>
      </CinePageHeader>

      <CineContainer>
        {/* Catégories */}
        <span className="cine-section-eyebrow">Catégories</span>
        <h2 className="cine-section-title" style={{ marginBottom: '2rem' }}>Choisissez un thème</h2>
        <div className="cine-grid cine-grid--2">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <CineCard interactive style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 48, height: 48, flexShrink: 0,
                    borderRadius: 'var(--cine-radius-md)',
                    background: `${c.color}1A`,
                    color: c.color,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {c.icon}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem' }}>
                    <h3 style={{ margin: 0, fontFamily: 'var(--cine-font-display)', fontSize: '1.1rem', fontWeight: 500, letterSpacing: 0, color: 'var(--cine-ink)' }}>
                      {c.title}
                    </h3>
                    <span className="cine-mono" style={{ flexShrink: 0 }}>{c.topics} sujets</span>
                  </div>
                  <p style={{ color: 'var(--cine-ink-soft)', fontSize: '0.92rem', lineHeight: 1.5, margin: '0.5rem 0 0' }}>
                    {c.description}
                  </p>
                </div>
              </CineCard>
            </motion.div>
          ))}
        </div>

        {/* Recent posts */}
        <div style={{ marginTop: '4rem', paddingBottom: '6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="cine-section-eyebrow">Activité</span>
              <h2 className="cine-section-title">Discussions Récentes</h2>
            </div>
            <button type="button" className="cine-button cine-button--primary" onClick={() => navigate('/community/forum/new')}>
              <AddIcon fontSize="small" /> Nouvelle discussion
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {RECENT_POSTS.map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <CineCard
                  interactive
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr auto',
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--cine-accent), var(--cine-accent-3))',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff',
                      fontFamily: 'var(--cine-font-mono)',
                      fontSize: '0.78rem',
                      letterSpacing: '0.06em',
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    {post.avatar}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <h3 style={{ margin: 0, fontFamily: 'var(--cine-font-display)', fontSize: '1.05rem', fontWeight: 500, color: 'var(--cine-ink)' }}>
                        {post.title}
                      </h3>
                      {post.isPremium && <CineBadge variant="accent">Premium</CineBadge>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                      <span className="cine-mono">{post.author}</span>
                      <span style={{ color: 'var(--cine-line-hi)' }}>·</span>
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: '0.2rem 0.6rem',
                            borderRadius: 'var(--cine-radius-pill)',
                            border: '1px solid var(--cine-line)',
                            color: 'var(--cine-ink-soft)',
                            fontFamily: 'var(--cine-font-mono)',
                            fontSize: '0.65rem',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.8rem',
                      color: 'var(--cine-ink-soft)',
                      fontFamily: 'var(--cine-font-mono)',
                      fontSize: '0.8rem',
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <LikeIcon sx={{ fontSize: 16 }} /> {post.likes}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <CommentIcon sx={{ fontSize: 16 }} /> {post.comments}
                    </span>
                    <button
                      type="button"
                      aria-label="Partager"
                      style={{
                        background: 'transparent', border: 'none',
                        color: 'var(--cine-ink-soft)', cursor: 'pointer',
                        padding: '0.3rem',
                        display: 'inline-flex',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ShareIcon sx={{ fontSize: 16 }} />
                    </button>
                  </div>
                </CineCard>
              </motion.div>
            ))}
          </div>
        </div>
      </CineContainer>
    </CinePage>
  );
};

export default ForumPage;
