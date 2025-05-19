import React, { useState } from "react";
import { LoginFormData } from "../types/LoginFormData";
import { loginUser } from "../api/userService";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import styles from "../styles/registration/Login.module.css";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { setUsername } = useAuth();

  const navigate = useNavigate();
  
  const onChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);
      setUsername(data.user.username);  // Глобальний стан контексту (setUsername)
      localStorage.setItem("username", data.user.username); // Збереження в localStorage
      // console.log("Користувач увійшов: ", data.user.username);

      // alert("Успішний вхід");
      navigate("/");
    } catch (error) {
      console.error("Помилка входу:", error);
      alert("Невірне ім’я користувача або пароль.");
    }
  };
  
  return (
    <div className={styles.logPage}>
      <div className={styles.container}>
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
        <h2 className={styles.title}>Пориньте у LumiTune</h2>

        <div className={styles.inputSection}>
          <div className={styles.usernameSection}>
            <p className={styles.label}>Ім'я користувача</p>
            <input
              type="text"
              value={formData.username}
              placeholder="username"
              className={styles.formInput}
              onChange={(e) => onChange("username", e.target.value)}
            />
          </div>
          <div className={styles.passwordSection}>
            <p className={styles.label}>Пароль</p>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              className={styles.formInput}
              onChange={(e) => onChange("password", e.target.value)}
            />
            { showPassword ?
              <svg className={styles.viewPassIcon} onClick={() => setShowPassword((prev) => !prev)} width="22" height="16" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.54297 0.252074C10.4208 -0.188591 12.4744 -0.0917001 14.6016 0.864379C16.722 1.81746 18.8875 3.61109 21.0234 6.51965L21.2412 6.81653L21.0225 7.11243C19.395 9.31684 16.3996 11.9901 12.6855 12.7745C9.03294 13.5458 4.80143 12.4671 0.635742 7.6134L0.232422 7.13196L0 6.8468L0.204102 6.53918C1.82401 4.10121 4.81647 1.12671 8.54297 0.252074ZM14.1914 1.77649C12.2759 0.915548 10.4478 0.832317 8.77148 1.22571C5.53763 1.98471 2.83022 4.52943 1.24707 6.78625C5.2694 11.5664 9.20628 12.4873 12.4795 11.796C15.7148 11.1127 18.4125 8.83026 19.9912 6.81262C18.0037 4.18345 16.0441 2.60919 14.1914 1.77649Z" fill="#73BEFF"/>
                <circle cx="10.6211" cy="6.5" r="3" fill="#73BEFF"/>
              </svg>
              : 
              <svg className={styles.viewPassIcon} onClick={() => setShowPassword((prev) => !prev)} width="22" height="16" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3061 14.8492L17.5997 15.5561L2.7505 0.706902L3.45685 0L18.3061 14.8492Z" fill="#73BEFF"/>
                <path d="M9.06738 6.02374C8.78852 6.36752 8.62109 6.80538 8.62109 7.28253C8.62109 8.3871 9.51652 9.28253 10.6211 9.28253C11.0982 9.28253 11.5351 9.11408 11.8789 8.83527L12.5879 9.54425C12.061 10.0028 11.3744 10.2825 10.6211 10.2825C8.96424 10.2825 7.62109 8.93939 7.62109 7.28253C7.62109 6.52919 7.89982 5.84162 8.3584 5.31476L9.06738 6.02374ZM10.6211 4.28253C12.2779 4.28253 13.6211 5.62568 13.6211 7.28253C13.6211 7.82356 13.4752 8.3296 13.2246 8.76788L12.4775 8.02081C12.5686 7.79213 12.6211 7.54367 12.6211 7.28253C12.6211 6.17796 11.7257 5.28253 10.6211 5.28253C10.3598 5.28253 10.1107 5.33396 9.88184 5.42511L9.13477 4.67804C9.57312 4.42734 10.0799 4.28253 10.6211 4.28253Z" fill="#73BEFF"/>
                <path d="M6.11035 3.06681C4.06482 4.21718 2.37194 5.96528 1.24707 7.56877C5.2694 12.3489 9.20628 13.2698 12.4795 12.5785C13.2989 12.4055 14.0832 12.1286 14.8242 11.7807L15.5732 12.5297C14.6739 12.9822 13.7071 13.3413 12.6855 13.5571C9.03294 14.3283 4.80143 13.2496 0.635742 8.39592L0.232422 7.91447L0 7.62932L0.204102 7.3217C1.33347 5.62204 3.12976 3.66125 5.37695 2.33342L6.11035 3.06681ZM8.54297 1.03459C10.4207 0.593941 12.4745 0.690857 14.6016 1.64689C16.722 2.59996 18.8875 4.3937 21.0234 7.30217L21.2412 7.59904L21.0225 7.89494C19.9979 9.28279 18.4304 10.8556 16.4834 12.0268L15.751 11.2944C17.5188 10.2755 18.9837 8.88274 19.9912 7.59514C18.0038 4.96606 16.044 3.39169 14.1914 2.559C12.2759 1.69811 10.4478 1.61485 8.77148 2.00822C8.17866 2.14736 7.60356 2.3468 7.0498 2.59318L6.29688 1.84025C7.00925 1.49544 7.75983 1.21839 8.54297 1.03459Z" fill="#73BEFF"/>
                <path d="M11.9922 9.94855C11.5809 10.1605 11.1156 10.2825 10.6211 10.2825C8.96424 10.2825 7.62109 8.93939 7.62109 7.28253C7.62109 6.78787 7.74205 6.32181 7.9541 5.91046L11.9922 9.94855Z" fill="#73BEFF"/>
              </svg>
            }
          </div>
        </div>
        <button className={styles.submitBtn} onClick={handleSubmit}>Увійти</button>

        <div className={styles.horizontalLine}></div>
        <button className={styles.googgleBtn}>
          <svg width="28" height="28" viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.9999 16.0331C30.9999 14.7587 30.8943 13.8287 30.666 12.8643H15.8162V18.6164H24.5327C24.357 20.0459 23.408 22.1987 21.2991 23.6453L21.2696 23.8379L25.9648 27.4025L26.2901 27.4343C29.2776 24.7304 30.9999 20.752 30.9999 16.0331Z" fill="#00AEFF"/>
            <path d="M15.8161 31.1884C20.0864 31.1884 23.6714 29.8106 26.29 27.434L21.299 23.645C19.9635 24.5577 18.1709 25.195 15.8161 25.195C11.6336 25.195 8.0837 22.4911 6.81827 18.7539L6.63279 18.7693L1.75061 22.4721L1.68677 22.6461C4.28765 27.7094 9.63008 31.1884 15.8161 31.1884Z" fill="#35FFA7"/>
            <path d="M6.81854 18.7541C6.48464 17.7897 6.29141 16.7563 6.29141 15.6885C6.29141 14.6207 6.48464 13.5874 6.80097 12.623L6.79213 12.4176L1.84878 8.65527L1.68704 8.73067C0.615087 10.8318 0 13.1913 0 15.6885C0 18.1858 0.615087 20.5452 1.68704 22.6463L6.81854 18.7541Z" fill="#FBF305"/>
            <path d="M15.8161 6.1818C18.786 6.1818 20.7894 7.43903 21.9317 8.48966L26.3954 4.2185C23.654 1.72127 20.0864 0.188477 15.8161 0.188477C9.63008 0.188477 4.28765 3.66736 1.68677 8.73068L6.8007 12.623C8.0837 8.88574 11.6336 6.1818 15.8161 6.1818Z" fill="#FF286C"/>
          </svg>
          <p className={styles.googgleLabel}>Увійти з Google</p>
        </button>

        <div className={styles.horizontalLine2}>
          <div className={styles.line}></div>
        </div>

        
        
       
        
        <div className={styles.registerSection}>
          <p>Немає акаунта?</p>
          <Link to="/register" className={styles.registerLink}>Зареєструватись</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;