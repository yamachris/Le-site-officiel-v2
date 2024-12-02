import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from './styles/darkTheme';
import { AuthProvider } from './contexts/AuthContext';
import { useSettings } from './contexts/SettingsContext';
import './i18n/config';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import HomePage from './pages/Home/HomePage';
import PlayPage from './pages/Play/PlayPage';
import RankingPage from './pages/Ranking/RankingPage';
import RulesPage from './pages/Rules/RulesPage';
import CommunityPage from './pages/Community/CommunityPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AdminRoute from './components/Auth/AdminRoute';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminConsole from './pages/Admin/components/AdminConsole';
import UserProfile from './pages/Profile/UserProfile';
import ShopPage from './pages/Shop/ShopPage';
import MyPremiumBenefits from './pages/Premium/MyPremiumBenefits';
import PremiumPage from './pages/Premium/PremiumPage';
import ForumPage from './pages/Community/Forum/ForumPage';
import TermsPage from './pages/Legal/TermsPage';
import PrivacyPage from './pages/Legal/PrivacyPage';
import ChatPage from './pages/Chat/ChatPage';
import { SettingsProvider } from './contexts/SettingsContext';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageSelector from './components/LanguageSelector';
import '@fontsource/orbitron/400.css';
import '@fontsource/orbitron/700.css';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <LanguageProvider>
        <SettingsProvider>
          <AuthProvider>
            <Router>
              <div style={{ paddingTop: '70px' }}>
                <Navbar />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/play" element={<PlayPage />} />
                    <Route path="/rules" element={<RulesPage />} />
                    <Route path="/ranking" element={<RankingPage />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/community/forum" element={<ForumPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                      path="/admin/dashboard"
                      element={
                        <AdminRoute>
                          <AdminDashboard />
                        </AdminRoute>
                      }
                    />
                    <Route
                      path="/admin/console"
                      element={
                        <AdminRoute>
                          <AdminConsole />
                        </AdminRoute>
                      }
                    />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/profile/premium-benefits" element={<MyPremiumBenefits />} />
                    <Route path="/premium-features" element={<PremiumPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </AuthProvider>
        </SettingsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
