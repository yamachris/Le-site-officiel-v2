import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaGamepad, FaTrophy, FaUsers, FaUser, FaSearch, FaSignInAlt, FaUserPlus, FaShoppingCart } from 'react-icons/fa';
import Settings from './Settings';
import './Navbar.css';

interface NavLink {
  path: string;
  icon: React.ReactNode;
  text: string;
  isHighlighted?: boolean;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { path: '/', icon: <FaHome />, text: 'Accueil' },
    { path: '/rules', icon: <FaBook />, text: 'Règles du jeu' },
    { path: '/play', icon: <FaGamepad />, text: 'Jouer', isHighlighted: true },
    { path: '/ranking', icon: <FaTrophy />, text: 'Classement' },
    { path: '/community', icon: <FaUsers />, text: 'Communauté' },
    { path: '/shop', icon: <FaShoppingCart />, text: 'Boutique' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">UNIT</Link>
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''} ${
                link.isHighlighted ? 'highlighted' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.text}</span>
            </Link>
          ))}
        </div>

        {/* Right Side Icons */}
        <div className="nav-icons">
          <button className="icon-button" aria-label="Search">
            <FaSearch />
          </button>
          <Settings />
          <Link to="/login" className="icon-button" aria-label="Connexion">
            <FaSignInAlt />
          </Link>
          <Link to="/register" className="icon-button" aria-label="Inscription">
            <FaUserPlus />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
