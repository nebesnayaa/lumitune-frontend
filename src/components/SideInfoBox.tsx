import React from "react";
import styles from "../styles/SideInfoBox.module.css";

interface SideInfoBoxProps {
  onClose: () => void;
}

const SideInfoBox: React.FC<SideInfoBoxProps> = ({ onClose }) => {
  return (
    <div className={styles.container}>
      <h2>Track info</h2>
      <button className={styles.closeBtn} onClick={onClose}>×</button>
    </div>
  );
}

export default SideInfoBox;