import React, { useState } from 'react';
import {
  ShoppingCart as ShoppingCartIcon,
  Lock as LockIcon,
  Star as StarIcon,
  Diamond as DiamondIcon,
  Palette as PaletteIcon,
  Casino as CasinoIcon,
  EmojiEvents as TrophyIcon,
  LocalOffer as TagIcon,
} from '@mui/icons-material';
import {
  CinePage,
  CineContainer,
  CinePageHeader,
  CineCard,
  CineBadge,
  CineKpiStrip,
  CineTabs,
} from '../../components/cine';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'exclusive' | 'legendary' | 'unique';
  category: 'skins' | 'boards' | 'effects' | 'titles' | 'exclusive';
  isPremium: boolean;
}

const MOCK_ITEMS: ShopItem[] = [
  {
    id: '1',
    name: 'Skin Dragon de Feu',
    description: 'Un design épique pour vos cartes avec des effets de flammes',
    price: 1000,
    image: '/skins/dragon.jpg',
    rarity: 'epic',
    category: 'skins',
    isPremium: false,
  },
  {
    id: '2',
    name: 'Plateau Mystique',
    description: 'Un plateau de jeu animé avec des effets magiques',
    price: 2000,
    image: '/boards/mystic.jpg',
    rarity: 'legendary',
    category: 'boards',
    isPremium: true,
  },
  {
    id: '3',
    name: 'Effet Aurores',
    description: 'Particules cinétiques sur chaque carte jouée',
    price: 600,
    image: '',
    rarity: 'rare',
    category: 'effects',
    isPremium: false,
  },
  {
    id: '4',
    name: 'Titre — Maître des Élus',
    description: 'Affichez votre prestige dans tout le ladder',
    price: 1500,
    image: '',
    rarity: 'exclusive',
    category: 'titles',
    isPremium: false,
  },
];

const RARITY_COLOR: Record<ShopItem['rarity'], string> = {
  common:    'var(--cine-ink-dim)',
  uncommon:  'var(--cine-success)',
  rare:      'var(--cine-accent-2)',
  epic:      'var(--cine-accent-4)',
  exclusive: 'var(--cine-accent-3)',
  legendary: 'var(--cine-accent-3)',
  unique:    'var(--cine-accent)',
};

const CATEGORIES = [
  { key: 'all',       label: 'Tout',      icon: <ShoppingCartIcon fontSize="small" /> },
  { key: 'skins',     label: 'Skins',     icon: <PaletteIcon fontSize="small" /> },
  { key: 'boards',    label: 'Plateaux',  icon: <CasinoIcon fontSize="small" /> },
  { key: 'effects',   label: 'Effets',    icon: <StarIcon fontSize="small" /> },
  { key: 'titles',    label: 'Titres',    icon: <TrophyIcon fontSize="small" /> },
  { key: 'exclusive', label: 'Exclusif',  icon: <DiamondIcon fontSize="small" /> },
];

const SHOP_KPIS = [
  { value: '4', label: 'collections', tone: 'accent' as const },
  { value: '2 500', label: 'Unitos', tone: 'gold' as const },
  { value: '15%', label: 'bonus max', tone: 'cyan' as const },
];

const ITEM_ICON: Record<ShopItem['category'], React.ReactNode> = {
  skins:     <PaletteIcon sx={{ fontSize: 64 }} />,
  boards:    <CasinoIcon sx={{ fontSize: 64 }} />,
  effects:   <StarIcon sx={{ fontSize: 64 }} />,
  titles:    <TrophyIcon sx={{ fontSize: 64 }} />,
  exclusive: <DiamondIcon sx={{ fontSize: 64 }} />,
};

const ShopPage: React.FC = () => {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [buyOpen, setBuyOpen] = useState(false);
  const [selected, setSelected] = useState<ShopItem | null>(null);
  const unitos = 2500;

  const items = activeCat === 'all'
    ? MOCK_ITEMS
    : MOCK_ITEMS.filter((i) => i.category === activeCat);

  return (
    <CinePage>
      <CinePageHeader
        eyebrow="La Boutique"
        title={<>Personnalisez <em>votre table.</em></>}
        lede="Skins, plateaux, effets, titres — donnez à vos parties votre signature visuelle."
      >
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="button" className="cine-button cine-button--primary" onClick={() => setBuyOpen(true)}>
            <DiamondIcon fontSize="small" /> Acheter des Unitos
          </button>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              border: '1px solid var(--cine-line)',
              borderRadius: 'var(--cine-radius-pill)',
              fontFamily: 'var(--cine-font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              color: 'var(--cine-accent-3)',
            }}
          >
            <TagIcon fontSize="small" />
            {unitos.toLocaleString('fr-FR')} Unitos
          </div>
        </div>
      </CinePageHeader>

      <CineContainer>
        <CineKpiStrip items={SHOP_KPIS} style={{ marginBottom: '2rem' }} />

        <div className="cine-section-slab" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
            <div>
              <span className="cine-mono" style={{ color: 'var(--cine-accent-3)' }}>Marché cosmétique</span>
              <h2 className="cine-section-title" style={{ marginTop: '0.5rem' }}>Collections UNIT</h2>
            </div>
            <span className="cine-mono">{items.length} objets affichés</span>
          </div>
          <CineTabs
            items={CATEGORIES.map((c) => ({ id: c.key, label: c.label, icon: c.icon }))}
            active={activeCat}
            onChange={setActiveCat}
            ariaLabel="Catégories de la boutique"
          />
        </div>

        <div className="cine-grid cine-grid--3" style={{ paddingBottom: '6rem' }}>
          {items.map((item) => (
            <CineCard
              key={item.id}
              interactive
              onClick={() => setSelected(item)}
              style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              {/* Visuel */}
              <div
                style={{
                  position: 'relative',
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: RARITY_COLOR[item.rarity],
                  background:
                    `radial-gradient(circle at 30% 20%, ${RARITY_COLOR[item.rarity]}26, transparent 60%),` +
                    'linear-gradient(135deg, var(--cine-bg-soft), var(--cine-surface))',
                  borderBottom: '1px solid var(--cine-line)',
                }}
              >
                {ITEM_ICON[item.category]}
                {item.isPremium && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.3rem 0.7rem',
                      background: 'var(--cine-accent)',
                      color: '#fff',
                      borderRadius: 'var(--cine-radius-pill)',
                      fontFamily: 'var(--cine-font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <LockIcon sx={{ fontSize: 12 }} />
                    Premium
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div style={{ padding: '1.4rem 1.6rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <span
                    className="cine-badge"
                    style={{
                      borderColor: `${RARITY_COLOR[item.rarity]}66`,
                      color: RARITY_COLOR[item.rarity],
                    }}
                  >
                    {item.rarity}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--cine-font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 500,
                    letterSpacing: 0,
                    margin: 0,
                    color: 'var(--cine-ink)',
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    color: 'var(--cine-ink-soft)',
                    fontSize: '0.92rem',
                    lineHeight: 1.5,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {item.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.8rem',
                    borderTop: '1px solid var(--cine-line)',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--cine-accent-3)', fontFamily: 'var(--cine-font-mono)', fontSize: '0.95rem', letterSpacing: '0.04em' }}>
                    <TagIcon sx={{ fontSize: 16 }} />
                    {item.price.toLocaleString('fr-FR')}
                  </span>
                  <span className="cine-mono" style={{ color: 'var(--cine-accent-2)' }}>
                    Voir →
                  </span>
                </div>
              </div>
            </CineCard>
          ))}
        </div>
      </CineContainer>

      {/* Dialog : Acheter Unitos */}
      {buyOpen && (
        <Modal onClose={() => setBuyOpen(false)} title="Acheter des Unitos">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              { amount: 500,   price: 5,   bonus: 0  },
              { amount: 1000,  price: 10,  bonus: 0  },
              { amount: 2000,  price: 20,  bonus: 10 },
              { amount: 5000,  price: 50,  bonus: 15 },
              { amount: 10000, price: 100, bonus: 20 },
            ].map((p) => (
              <div
                key={p.amount}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.2rem',
                  border: '1px solid var(--cine-line)',
                  borderRadius: 'var(--cine-radius-md)',
                  background: 'var(--cine-surface)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <DiamondIcon sx={{ color: 'var(--cine-accent-3)' }} />
                  <div>
                    <div style={{ fontFamily: 'var(--cine-font-display)', fontSize: '1.1rem', color: 'var(--cine-ink)' }}>
                      {p.amount.toLocaleString('fr-FR')} Unitos
                      {p.bonus > 0 && (
                        <span style={{ marginLeft: '0.6rem' }}>
                          <CineBadge variant="success">+{p.bonus}%</CineBadge>
                        </span>
                      )}
                    </div>
                    <div className="cine-mono" style={{ marginTop: '0.2rem' }}>{p.price} €</div>
                  </div>
                </div>
                <button type="button" className="cine-button cine-button--primary cine-button--mono">Acheter</button>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Dialog : détail item */}
      {selected && (
        <Modal onClose={() => setSelected(null)} title={selected.name}>
          <div
            style={{
              height: 240,
              borderRadius: 'var(--cine-radius-md)',
              border: '1px solid var(--cine-line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: RARITY_COLOR[selected.rarity],
              background: `radial-gradient(circle at 50% 30%, ${RARITY_COLOR[selected.rarity]}26, transparent 70%), var(--cine-bg-soft)`,
            }}
          >
            {ITEM_ICON[selected.category]}
          </div>
          <p style={{ color: 'var(--cine-ink-soft)', lineHeight: 1.6, marginTop: '1.2rem' }}>{selected.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
            <span className="cine-badge" style={{ borderColor: `${RARITY_COLOR[selected.rarity]}66`, color: RARITY_COLOR[selected.rarity] }}>
              {selected.rarity}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--cine-accent-3)', fontFamily: 'var(--cine-font-mono)', fontSize: '1.1rem' }}>
              <TagIcon /> {selected.price.toLocaleString('fr-FR')}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end', marginTop: '1.8rem' }}>
            <button type="button" className="cine-button cine-button--ghost cine-button--mono" onClick={() => setSelected(null)}>
              Fermer
            </button>
            <button
              type="button"
              className="cine-button cine-button--primary cine-button--mono"
              disabled={unitos < selected.price}
              style={{ opacity: unitos < selected.price ? 0.5 : 1 }}
            >
              Acheter
            </button>
          </div>
        </Modal>
      )}
    </CinePage>
  );
};

/* === Modal réutilisable === */
const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div
    role="dialog"
    aria-modal="true"
    style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(2, 2, 3, 0.78)',
      backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem',
    }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
  >
    <div
      style={{
        width: '100%',
        maxWidth: 540,
        maxHeight: '90vh',
        overflow: 'auto',
        background: 'var(--cine-bg-soft)',
        border: '1px solid var(--cine-line)',
        borderRadius: 'var(--cine-radius-lg)',
        padding: '2rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
        <h2 style={{ margin: 0, fontFamily: 'var(--cine-font-display)', fontSize: '1.5rem', fontWeight: 500, letterSpacing: 0 }}>
          {title}
        </h2>
        <button type="button" onClick={onClose} className="cine-button cine-button--ghost cine-button--mono" style={{ padding: '0.5rem 0.9rem' }}>
          ✕
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default ShopPage;
