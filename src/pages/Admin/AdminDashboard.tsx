import React, { useState } from 'react';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  SportsEsports as GamesIcon,
  EmojiEvents as TournamentIcon,
  Forum as ForumIcon,
  Settings as SettingsIcon,
  Code as ConsoleIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import UserManagement from './components/UserManagement';
import ContentManagement from './components/ContentManagement';
import TournamentManagement from './components/TournamentManagement';
import SystemSettings from './components/SystemSettings';
import Overview from './components/Overview';
import AdminConsole from './components/AdminConsole';
import { CinePage } from '../../components/cine';

const MENU = [
  { id: 'overview',    label: "Vue d'ensemble", icon: <DashboardIcon fontSize="small" /> },
  { id: 'users',       label: 'Utilisateurs',    icon: <PeopleIcon fontSize="small" /> },
  { id: 'games',       label: 'Parties',         icon: <GamesIcon fontSize="small" /> },
  { id: 'tournaments', label: 'Tournois',        icon: <TournamentIcon fontSize="small" /> },
  { id: 'forum',       label: 'Forum',           icon: <ForumIcon fontSize="small" /> },
  { id: 'settings',    label: 'Paramètres',      icon: <SettingsIcon fontSize="small" /> },
  { id: 'console',     label: 'Console',         icon: <ConsoleIcon fontSize="small" /> },
];

const AdminDashboard: React.FC = () => {
  const [section, setSection] = useState('overview');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const renderContent = () => {
    switch (section) {
      case 'overview':    return <Overview />;
      case 'users':       return <UserManagement />;
      case 'games':       return <ContentManagement />;
      case 'tournaments': return <TournamentManagement />;
      case 'settings':    return <SystemSettings />;
      case 'console':     return <AdminConsole />;
      default: return <p style={{ color: 'var(--cine-ink-soft)' }}>Section en construction</p>;
    }
  };

  const sidebar = (
    <nav style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          padding: '1.5rem 1.4rem',
          borderBottom: '1px solid var(--cine-line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span className="cine-mono">UNIT</span>
          <div style={{ fontFamily: 'var(--cine-font-display)', fontSize: '1.1rem', fontWeight: 500, color: 'var(--cine-ink)', marginTop: '0.2rem' }}>
            Admin
          </div>
        </div>
        <button
          type="button"
          aria-label="Fermer"
          onClick={() => setDrawerOpen(false)}
          style={{
            display: 'none', background: 'transparent', border: 'none',
            color: 'var(--cine-ink-soft)', cursor: 'pointer',
          }}
          className="cine-admin-close"
        >
          <CloseIcon />
        </button>
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: '0.6rem 0', flex: 1 }}>
        {MENU.map((item) => {
          const active = section === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => { setSection(item.id); setDrawerOpen(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  padding: '0.85rem 1.4rem',
                  background: active ? 'var(--cine-surface-hi)' : 'transparent',
                  border: 'none',
                  borderLeft: `3px solid ${active ? 'var(--cine-accent)' : 'transparent'}`,
                  color: active ? 'var(--cine-ink)' : 'var(--cine-ink-soft)',
                  fontFamily: 'var(--cine-font-display)',
                  fontSize: '0.95rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all var(--cine-transition)',
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'var(--cine-surface)';
                    e.currentTarget.style.color = 'var(--cine-ink)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--cine-ink-soft)';
                  }
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div style={{ padding: '1rem 1.4rem', borderTop: '1px solid var(--cine-line)' }}>
        <span className="cine-mono">v1.0 · Saison 1</span>
      </div>
    </nav>
  );

  return (
    <CinePage>
      <div
        style={{
          display: 'flex',
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
        }}
      >
        {/* Sidebar desktop */}
        <aside
          className="cine-admin-sidebar"
          style={{
            width: 240,
            flexShrink: 0,
            borderRight: '1px solid var(--cine-line)',
            background: 'var(--cine-bg-soft)',
            position: 'sticky',
            top: 64,
            alignSelf: 'flex-start',
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
          }}
        >
          {sidebar}
        </aside>

        {/* Drawer mobile */}
        {drawerOpen && (
          <div
            className="cine-admin-drawer-backdrop"
            onClick={() => setDrawerOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 1500,
              background: 'rgba(2,2,3,0.78)', backdropFilter: 'blur(8px)',
            }}
          />
        )}
        <aside
          className="cine-admin-drawer"
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            bottom: 0,
            width: 280,
            background: 'var(--cine-bg-soft)',
            borderRight: '1px solid var(--cine-line)',
            zIndex: 1600,
            transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.32s ease',
            overflow: 'auto',
          }}
        >
          {sidebar}
        </aside>

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0, padding: 'clamp(20px, 3vw, 40px)' }}>
          {/* Topbar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              paddingBottom: '1.4rem',
              borderBottom: '1px solid var(--cine-line)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Ouvrir le menu"
                className="cine-admin-burger"
                style={{
                  display: 'none', background: 'transparent', border: '1px solid var(--cine-line)',
                  borderRadius: 'var(--cine-radius-md)', padding: '0.5rem',
                  color: 'var(--cine-ink)', cursor: 'pointer',
                }}
              >
                <MenuIcon fontSize="small" />
              </button>
              <div>
                <span className="cine-mono">Admin</span>
                <h1 style={{ margin: '0.2rem 0 0', fontFamily: 'var(--cine-font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 500, letterSpacing: 0, color: 'var(--cine-ink)' }}>
                  {MENU.find((m) => m.id === section)?.label}
                </h1>
              </div>
            </div>
          </div>

          <div style={{ paddingBottom: '4rem' }}>
            {renderContent()}
          </div>
        </main>

        <style>{`
          @media (max-width: 900px) {
            .cine-admin-sidebar { display: none !important; }
            .cine-admin-burger { display: inline-flex !important; }
            .cine-admin-close { display: inline-flex !important; }
          }
          @media (min-width: 901px) {
            .cine-admin-drawer { display: none !important; }
            .cine-admin-drawer-backdrop { display: none !important; }
          }
        `}</style>
      </div>
    </CinePage>
  );
};

export default AdminDashboard;
