import React, { useEffect, useState } from "react";
import { RegistrationFormData } from "../../../types/RegistrationFormData";
import styles from "../../../styles/forms/Registration.module.css";
import { Link, useNavigate } from "react-router";

interface StepEmailProps {
  nextStep: () => void;
  formData: RegistrationFormData;
  onChange: (field: keyof RegistrationFormData, value: string) => void;
}

const StepEmail: React.FC<StepEmailProps> = ({ nextStep, formData, onChange }) => {
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    if(formData.email){
      setIsValid(true);
      return;
    }
  }, []);

  const validateEmail = (email: string) => {
    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailRegex.test(trimmedEmail);
    const isRussianDomain = /\.ru$/.test(trimmedEmail.split('@')[1] || "");

    if (!trimmedEmail) {
      setError("");
      setIsValid(false);
    } else if (!isValidFormat) {
      setError("Невірний формат електронної пошти");
      setIsValid(false);
    } else if (isRussianDomain) {
      setError("Ми не приймаємо пошти з доменом .ru");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  };

  return (
    <div className={styles.regPage}>
      <div className={styles.container}>
        <button className={styles.prevBtn} onClick={() => navigate("/")}>Назад</button>
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
            <path fill-rule="evenodd" clip-rule="evenodd" d="M41.266 35.7215L36.4171 20.8178L31.8573 35.6073L36.5361 42.8533L41.266 35.7215Z" fill="#40CCFF"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M59.2175 27.8924L61.5617 21.01L55.7548 25.2341L55.4771 29.2255L59.2175 27.8924Z" fill="#40CCFF"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M58.1003 42.8451L62.8485 42.2695L58.6879 40.0344L56.2429 41.0094L58.1003 42.8451Z" fill="#40CCFF"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0328 42.8451L11.2847 42.2695L15.4453 40.0344L17.8903 41.0094L16.0328 42.8451Z" fill="#40CCFF"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7823 27.8923L11.4382 21.0099L17.245 25.2341L17.5228 29.2254L13.7823 27.8923Z" fill="#40CCFF"/>
          </svg>
        </div>
        <h2 className={styles.title}>Пориньте вперше</h2>
        <h2 className={styles.title}>у LumiTune</h2>
        <div className={styles.inputSection}>
          <div className={styles.emailSection}>
            <p className={styles.label}>Електронна пошта</p>
            <input
              type="email"
              value={formData.email}
              placeholder="@gmail.com"
              className={styles.formInput}
              onChange={(e) => onChange("email", e.target.value)}
              onBlur={() => validateEmail(formData.email)}
            />
            {error && <p className={styles.errorText}>{error}</p>}
          </div>
        </div>
        <button className={styles.submitBtn} onClick={nextStep} disabled={!isValid}>Далі</button>
        <div className={styles.horizontalLine}>
          <div className={styles.line}></div>
          <p className={styles.lineText}>або</p>
          <div className={styles.line}></div>
        </div>
        <button className={styles.googgleBtn}>
          <svg width="28" height="28" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.9999 16.0331C30.9999 14.7587 30.8943 13.8287 30.666 12.8643H15.8162V18.6164H24.5327C24.357 20.0459 23.408 22.1987 21.2991 23.6453L21.2696 23.8379L25.9648 27.4025L26.2901 27.4343C29.2776 24.7304 30.9999 20.752 30.9999 16.0331Z" fill="#00AEFF"/>
            <path d="M15.8161 31.1884C20.0864 31.1884 23.6714 29.8106 26.29 27.434L21.299 23.645C19.9635 24.5577 18.1709 25.195 15.8161 25.195C11.6336 25.195 8.0837 22.4911 6.81827 18.7539L6.63279 18.7693L1.75061 22.4721L1.68677 22.6461C4.28765 27.7094 9.63008 31.1884 15.8161 31.1884Z" fill="#35FFA7"/>
            <path d="M6.81854 18.7541C6.48464 17.7897 6.29141 16.7563 6.29141 15.6885C6.29141 14.6207 6.48464 13.5874 6.80097 12.623L6.79213 12.4176L1.84878 8.65527L1.68704 8.73067C0.615087 10.8318 0 13.1913 0 15.6885C0 18.1858 0.615087 20.5452 1.68704 22.6463L6.81854 18.7541Z" fill="#FBF305"/>
            <path d="M15.8161 6.1818C18.786 6.1818 20.7894 7.43903 21.9317 8.48966L26.3954 4.2185C23.654 1.72127 20.0864 0.188477 15.8161 0.188477C9.63008 0.188477 4.28765 3.66736 1.68677 8.73068L6.8007 12.623C8.0837 8.88574 11.6336 6.1818 15.8161 6.1818Z" fill="#FF286C"/>
          </svg>
          <p className={styles.googgleLabel}>Увійти з Google</p>
        </button>
        <div className={styles.horizontalLine2}></div>
        <div className={styles.signInSection}>
          <p>Є акаунт?</p>
          <Link to="/login" className={styles.signInLink}>Увійдіть до нього</Link>
        </div>
      </div>
    </div>
  );
};

export default StepEmail;