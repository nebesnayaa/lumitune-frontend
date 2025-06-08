import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import styles from "./styles/App.module.css";

import Home from "./pages/Home";
import Mediateka from "./pages/Mediateka";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Favorites from "./pages/Favorites";
import ArtistPage from "./pages/ArtistPage";
import PlaylistPage from "./pages/PlaylistPage";
import RegistrationForm from "./pages/forms/RegistrationForm";
import LoginForm from "./pages/forms/LoginForm";
import ForgotPassword from "./pages/forms/ForgotPassword";
import NewPassword from "./pages/forms/NewPassword";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/SideBar";
import MobileMenu from "./components/layout/MobileMenu";
import PlayerBar from "./components/layout/PlayerBar";
import SideInfoBox from "./components/layout/SideInfoBox";
import Footer from "./components/layout/Footer";


const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSideBoxOpen, setIsSideBoxOpen] = useState(true);

  return (
    <Router>
      <Routes>
        {/* Сторінки — без layout */}
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
                    <Route path="/mediateka" element={<Mediateka />} />
                    <Route path="/profile" element={<Profile onOpen={() => setIsSideBoxOpen(false)}/>} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/favorite" element={<Favorites onOpen={() => setIsSideBoxOpen(false)}/>} />
                    <Route path="/artist/:id" element={<ArtistPage onOpen={() => setIsSideBoxOpen(false)}/>} />
                    <Route path="/playlist/:id" element={<PlaylistPage onOpen={() => setIsSideBoxOpen(false)}/>} />
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