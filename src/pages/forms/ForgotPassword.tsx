import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "../../styles/forms/Login.module.css";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  const onChange = (value: string) => {
    setEmail(value);
    setMessage(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("https://lumituneapp.azurewebsites.net/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Помилка відправки листа");
      }

      setMessage("Інструкції для скидання паролю надіслані на вашу електронну пошту.");
    } catch (err: any) {
      setError(err.message || "Щось пішло не так.");
    } finally {
      // setLoading(false);
    }
  };
  
  return (
    <div className={styles.logPage}>
      <div className={styles.container}>
        <button className={styles.prevBtn} onClick={() => navigate(-1)}>Назад</button>
        <div className={styles.logo}>
          <div className={styles.elipse}></div>
          <svg width="200" height="80" viewBox="0 0 73 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.0433 36.3537L36.3017 53.9551L47.9389 36.3537L36.3016 -0.00049013L25.0433 36.3537Z" fill="#004275"/>
            <path d="M53.0164 23.6158L52.3019 33.2827L61.5181 29.9831L67.307 13.2475L53.0164 23.6158Z" fill="#004275"/>
            <path d="M58.8633 37.9504L52.9312 40.2863L57.5171 44.8056L69.0863 43.4588L58.8633 37.9504Z" fill="#004275"/>
            <path d="M15.27 37.9504L21.2021 40.2863L16.6163 44.8056L5.04703 43.4588L15.27 37.9504Z" fill="#004275"/>
            <path d="M19.9825 23.6158L20.697 33.2827L11.4808 29.9831L5.69187 13.2475L19.9825 23.6158Z" fill="#004275"/>
            <path d="M29.6187 32.1414L36.5355 42.8533L43.6063 32.1919L36.4165 10.0931L29.6187 32.1414Z" fill="#007AC1"/>
            <path d="M55.8882 23.3243L55.4776 29.2255L61.0681 27.233L64.544 17.0277L55.8882 23.3243Z" fill="#007AC1"/>
            <path d="M59.8562 39.5682L56.2422 41.0094L59.0186 43.7533L66.058 42.9L59.8562 39.5682Z" fill="#007AC1"/>
            <path d="M14.2772 39.5682L17.8912 41.0094L15.1148 43.7533L8.07535 42.9L14.2772 39.5682Z" fill="#007AC1"/>
            <path d="M17.1123 23.3243L17.5228 29.2255L11.9324 27.233L8.45639 17.0277L17.1123 23.3243Z" fill="#007AC1"/>
            <path d="M28.8462 42.7492L36.3313 53.7987L44.0047 42.7491L36.4997 19.6457L28.8462 42.7492Z" fill="#0B89CD"/>
            <path d="M52.9048 27.3066L52.4942 33.2078L58.0847 31.2153L61.5607 21.01L52.9048 27.3066Z" fill="#0B89CD"/>
            <path d="M56.6443 38.9377L53.0304 40.3789L55.8068 43.1228L62.8462 42.2695L56.6443 38.9377Z" fill="#0B89CD"/>
            <path d="M17.489 38.9377L21.103 40.3789L18.3266 43.1228L11.2872 42.2695L17.489 38.9377Z" fill="#0B89CD"/>
            <path d="M20.0941 27.3066L20.5047 33.2078L14.9142 31.2153L11.4382 21.01L20.0941 27.3066Z" fill="#0B89CD"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M41.266 35.7215L36.4171 20.8178L31.8573 35.6073L36.5361 42.8533L41.266 35.7215Z" fill="#40CCFF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M59.2175 27.8924L61.5617 21.01L55.7548 25.2341L55.4771 29.2255L59.2175 27.8924Z" fill="#40CCFF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M58.1003 42.8451L62.8485 42.2695L58.6879 40.0344L56.2429 41.0094L58.1003 42.8451Z" fill="#40CCFF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M16.0328 42.8451L11.2847 42.2695L15.4453 40.0344L17.8903 41.0094L16.0328 42.8451Z" fill="#40CCFF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M13.7823 27.8923L11.4382 21.0099L17.245 25.2341L17.5228 29.2254L13.7823 27.8923Z" fill="#40CCFF"/>
          </svg>
        </div>
        <h2 className={styles.title}>Забули пароль?</h2>

        <div className={styles.inputSection}>
          <div className={styles.usernameSection}>
            <p className={styles.label}>Електронна пошта</p>
            <input
              type="email"
              value={email}
              placeholder="email"
              className={styles.formInput}
              onChange={(e) => onChange(e.target.value)}
              required
            />
          </div>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}
        {message && <p className={styles.successText}>{message}</p>}

        <button className={styles.submitBtn} onClick={handleSubmit}>Продовжити</button>

        <div className={styles.horizontalLine}></div>
        
        <div className={styles.registerSection}>
          <p>Згадали пароль?</p>
          <Link to="/login" className={styles.registerLink}>Увійдіть до аккаунту</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;