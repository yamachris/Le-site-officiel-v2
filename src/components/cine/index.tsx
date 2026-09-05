import React from 'react';
import './cine.css';

/* =========================================================================
   Composants React utilitaires pour pages cinématiques
   ========================================================================= */

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

export const CinePage: React.FC<PageProps> = ({ children, className = '' }) => (
  <div className={`cine-page ${className}`}>
    <span className="cine-page-aurora cine-page-aurora--one" aria-hidden />
    <span className="cine-page-aurora cine-page-aurora--two" aria-hidden />
    <span className="cine-page-noise" aria-hidden />
    <div className="cine-page-content">{children}</div>
  </div>
);

export const CineContainer: React.FC<PageProps & { variant?: 'default' | 'narrow' | 'wide' }> = ({
  children,
  className = '',
  variant = 'default',
}) => (
  <div className={`cine-container ${variant !== 'default' ? `cine-container--${variant}` : ''} ${className}`}>
    {children}
  </div>
);

interface HeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  align?: 'left' | 'center';
}

export const CinePageHeader: React.FC<HeaderProps> = ({ eyebrow, title, lede, children, align = 'left' }) => (
  <header className={`cine-page-header cine-page-header--${align}`}>
    <CineContainer>
      <div className="cine-page-header-grid">
        <div className="cine-page-copy">
          {eyebrow && <span className="cine-page-eyebrow">{eyebrow}</span>}
          <h1 className="cine-page-title">{title}</h1>
          {lede && <p className="cine-page-lede">{lede}</p>}
          {children && <div className="cine-page-actions">{children}</div>}
        </div>
        <div className="cine-page-orbit" aria-hidden>
          <span className="cine-orbit-ring cine-orbit-ring--outer" />
          <span className="cine-orbit-ring cine-orbit-ring--middle" />
          <span className="cine-orbit-ring cine-orbit-ring--inner" />
          <span className="cine-orbit-core" />
          <span className="cine-orbit-line cine-orbit-line--one" />
          <span className="cine-orbit-line cine-orbit-line--two" />
          <span className="cine-orbit-label">UNIT / SIGNAL</span>
        </div>
      </div>
    </CineContainer>
  </header>
);

interface SectionProps {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const CineSection: React.FC<SectionProps> = ({ eyebrow, title, children, className = '' }) => (
  <section className={`cine-section ${className}`}>
    <CineContainer>
      {eyebrow && <span className="cine-section-eyebrow">{eyebrow}</span>}
      {title && <h2 className="cine-section-title">{title}</h2>}
      <div style={{ marginTop: title || eyebrow ? '2rem' : 0 }}>{children}</div>
    </CineContainer>
  </section>
);

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const CineCard: React.FC<CardProps> = ({
  children,
  variant = 'default',
  interactive = false,
  className = '',
  onClick,
  style,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={[
        'cine-card',
        variant === 'accent' ? 'cine-card--accent' : '',
        interactive ? 'cine-card--interactive' : '',
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      style={style}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent' | 'success';
}

export const CineBadge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => (
  <span className={`cine-badge ${variant !== 'default' ? `cine-badge--${variant}` : ''}`}>
    {children}
  </span>
);

interface StatProps {
  value: React.ReactNode;
  label: React.ReactNode;
}

export const CineStat: React.FC<StatProps> = ({ value, label }) => (
  <div>
    <div className="cine-stat-value">{value}</div>
    <div className="cine-stat-label">{label}</div>
  </div>
);

interface KpiItem {
  value: React.ReactNode;
  label: React.ReactNode;
  tone?: 'default' | 'accent' | 'cyan' | 'gold' | 'success';
}

export const CineKpiStrip: React.FC<{ items: KpiItem[]; className?: string; style?: React.CSSProperties }> = ({
  items,
  className = '',
  style,
}) => (
  <div className={`cine-kpi-strip ${className}`} style={style}>
    {items.map((kpi, index) => (
      <div key={index} className={`cine-kpi ${kpi.tone && kpi.tone !== 'default' ? `cine-kpi--${kpi.tone}` : ''}`}>
        <strong>{kpi.value}</strong>
        <span>{kpi.label}</span>
      </div>
    ))}
  </div>
);

export interface CineTabItem<T extends string = string> {
  id: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface CineTabsProps<T extends string = string> {
  items: CineTabItem<T>[];
  active: T;
  onChange: (id: T) => void;
  ariaLabel?: string;
  className?: string;
}

export function CineTabs<T extends string = string>({
  items,
  active,
  onChange,
  ariaLabel,
  className = '',
}: CineTabsProps<T>) {
  return (
    <div className={`cine-tabs ${className}`} role="tablist" aria-label={ariaLabel}>
      {items.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className={`cine-tab ${active === tab.id ? 'is-active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon && <span className="cine-tab-icon" aria-hidden>{tab.icon}</span>}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
