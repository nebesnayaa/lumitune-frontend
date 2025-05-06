import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import PlayerBar from "./components/PlayerBar";
import Home from "./pages/Home";
import MobileMenu from "./components/MobileMenu";
import styles from "./styles/App.module.css";

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <Router>
      <div className={styles.appContainer}>
        <Header toggleMenu={()=>setIsMobileMenuOpen(prev => !prev)}/>
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        <div className={styles.mainLayout}>
          <Sidebar />
          <main className={styles.content}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
        </div>
        <div className={styles.playerBar}>
          <PlayerBar />
        </div>
      </div>
    </Router>
  )
}

export default App