import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import styles from "./styles/App.module.css";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import RegistrationForm from "./pages/forms/RegistrationForm";
import LoginForm from "./pages/forms/LoginForm";
import ForgotPassword from "./pages/forms/ForgotPassword";
import NewPassword from "./pages/forms/NewPassword";

import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import MobileMenu from "./components/MobileMenu";
import PlayerBar from "./components/PlayerBar";
import SideInfoBox from "./components/SideInfoBox";
import Settings from "./pages/Settings";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSideBoxOpen, setIsSideBoxOpen] = useState(true);

  return (
    <Router>
      <Routes>
        {/* Реєстрація — без layout */}
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />

        {/* Всі інші сторінки — з layout */}
        <Route
          path="*"
          element={
            <div className={styles.appContainer}>
              <Header toggleMenu={() => setIsMobileMenuOpen(prev => !prev)} />
              <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
              <div className={styles.mainLayout}>
                <Sidebar />
                <main className={styles.content}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>
                {isSideBoxOpen && <SideInfoBox onClose={() => setIsSideBoxOpen(false)} />}
              </div>
              <Footer/>
              <div className={styles.playerBar}>
                <PlayerBar onOpenSide={() => setIsSideBoxOpen(true)}/>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App