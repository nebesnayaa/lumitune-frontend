import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RegistrationFormData } from "../../../types/RegistrationFormData";
import { Region, fetchCountries, fetchCitiesByCountryId, fetchRegionById } from "../../../api/regionService";
import { registerUser, isUsernameUnique } from "../../../api/userService";
import styles from "../../../styles/forms/Registration.module.css";

interface StepPersonalInfoProps {
  prevStep: () => void;
  formData: RegistrationFormData;
  onChange: <K extends keyof RegistrationFormData>(
    field: K,
    value: RegistrationFormData[K]
  ) => void;
}

const MONTH_OPTIONS = [
  { value: "01", label: "Січень" },
  { value: "02", label: "Лютий" },
  { value: "03", label: "Березень" },
  { value: "04", label: "Квітень" },
  { value: "05", label: "Травень" },
  { value: "06", label: "Червень" },
  { value: "07", label: "Липень" },
  { value: "08", label: "Серпень" },
  { value: "09", label: "Вересень" },
  { value: "10", label: "Жовтень" },
  { value: "11", label: "Листопад" },
  { value: "12", label: "Грудень" },
];

const StepPersonalInfo: React.FC<StepPersonalInfoProps> = ({ prevStep, formData, onChange }) => {
  const [birthDay, setBirthDay] = useState<string>("");
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");

  const [countries, setCountries] = useState<Region[]>([]);
  const [cities, setCities] = useState<Region[]>([]);

  const [selectedCountryId, setSelectedCountryId] = useState<string>("");
  const [selectedCityId, setSelectedCityId] = useState<string>(formData.regionId || "");

  const [errorUserName, setErrorUserName] = useState<string>();
  const [errorDate, setErrorDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  
  // 1. Завантаження країн та дати народження з formData.birthDate
  useEffect(() => {
    if(countries.length === 0){
      fetchCountries()
        .then(setCountries)
        .catch((error) => console.error("Помилка при завантаженні країн", error));
    }
    if (formData.birthDate) {
      const [year, month, day] = formData.birthDate.split("-");
      setBirthDay(day);
      setBirthMonth(month);
      setBirthYear(year);
    }
  }, []);

  // 2. Завантаження регіону з formData.regionId
  useEffect(() => {
    const loadRegions = async () => {
      try {
        const cityRegion = await fetchRegionById(formData.regionId);
        setSelectedCityId(cityRegion.id);

        if (cityRegion.parentId) {
          const countryRegion = await fetchRegionById(cityRegion.parentId);
          setSelectedCountryId(countryRegion.id);
        }
      } catch (error) {
        console.error("Помилка завантаження регіонів:", error);
      }
    };

    if (formData.regionId) {
      loadRegions();
    }
  }, []);

  // 3. Завантаження міст при виборі країни
  useEffect(() => {
    if (selectedCountryId && cities.length === 0) {
      fetchCitiesByCountryId(selectedCountryId)
        .then(setCities)
        .catch((error) => console.error("Помилка при завантаженні міст", error));
    }
  }, [selectedCountryId]);

  // 4. Записати вибрану дату народження + валідація
  useEffect(() => {
    if (birthYear && birthMonth && birthDay) {
      const paddedDay = birthDay.padStart(2, "0");
      const paddedMonth = birthMonth.padStart(2, "0");
      const formattedDate = `${birthYear}-${paddedMonth}-${paddedDay}`;

      // Валідація дати перед записом в formData
      const dateObj = new Date(formattedDate);
      const isValidDate =
        dateObj.getFullYear() === Number(birthYear) &&
        dateObj.getMonth() + 1 === Number(birthMonth) &&
        dateObj.getDate() === Number(birthDay);
      
      const currentYear = new Date().getFullYear();
      const minYear = 1900;
      const maxYear = currentYear - 10;
      const isValidYear = Number(birthYear) >= minYear && Number(birthYear) <= maxYear;
      
      if (isValidDate && isValidYear) {
        setErrorDate("");
        onChange("birthDate", formattedDate);
      } else if (!isValidYear) {
        setErrorDate(`Рік має бути між ${minYear} і ${maxYear}.`);
        onChange("birthDate", "");
      } else {
        setErrorDate("Невірна дата. Перевірте правильність введення");
        onChange("birthDate", "");
      }
    } else {
    setErrorDate("");
  }
  }, [birthDay, birthMonth, birthYear]);
  
  // 5. Записати вибране місто в formData
  useEffect(() => {
    onChange("regionId", selectedCityId);
  }, [selectedCityId]);
  
  const handleUsernameBlur = async () => {
    if (!formData.username.trim()) {
      setErrorUserName("");
      return;
    }

    try {
      const isUnique = await isUsernameUnique(formData.username.trim());
      setErrorUserName(isUnique ? "" : "Ім’я вже зайняте. Спробуйте інше.");
    } catch (error) {
      console.error(error);
      setErrorUserName("Помилка перевірки імені. Спробуйте пізніше.");
    }
  };

  const handleSubmit = async () => {
    const userPayload = {
      username: formData.username,
      password: formData.password,
      avatarId: "string",
      role: "USER" as const,
      accSubscribers: 0,
      accFollowings: 0,
      userData: {
        id: "string",
        birthDate: formData.birthDate,
        regionId: formData.regionId,
        isArtist: formData.isArtist,
        email: formData.email,
      },
    };
    setError(null);
    try {
      await registerUser(userPayload);
      // ✅ Успішна реєстрація
      navigate("/login");
    } catch (error) {
      setError("Не вдалося зареєструватися. Спробуйте ще раз.");
    }
  };

  return (
    <div className={styles.regPage}>
      <div className={styles.container}>
        <button className={styles.prevBtn} onClick={prevStep}>Назад</button>
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
        <h2 className={styles.title}>Створіть профіль</h2>
        <div className={styles.stepSection}>
          <p>Крок 2 із 2</p>
          <div className={styles.stepLine}>
            <div className={styles.active2}></div>
          </div>
        </div>
        <div className={styles.inputSection}>
          <div className={styles.nameSection}>
            <p className={styles.label}>Ім'я</p>
            <p className={styles.helpLabel}>Це ім’я відображатиметься в профілі</p>
            <input
              type="text"
              value={formData.username}
              className={styles.formInput}
              placeholder="Ім'я"
              onChange={(e) => {
                onChange("username", e.target.value);
                setErrorUserName("");
              }}
              onBlur={handleUsernameBlur}
            />
            {errorUserName && (
              <p className={styles.errorText}>{errorUserName}</p>
            )}
          </div>
          
          <p className={styles.label}>Дата народження</p>
          {/* <p className={styles.helpLabel}>Для чого нам ваша дата народження?</p> */}
          <div className={styles.dateSection}> 
            <input
              type="text"
              value={birthDay}
              className={styles.dateInput}
              placeholder="дд"
              onChange={(e) => setBirthDay(e.target.value.replace(/\D/g, '').slice(0, 2))} // тільки цифри
            />
            <div className={styles.monthField}>
              <select
                className={styles.monthSelect}
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
              >
                <option value="">Місяць</option>
                {MONTH_OPTIONS.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              value={birthYear}
              className={styles.dateInput}
              placeholder="рррр"
              onChange={(e) => setBirthYear(e.target.value.replace(/\D/g, '').slice(0, 4))}
            />
          </div>
          {errorDate && <p className={styles.errorText}>{errorDate}</p>}

          <p className={styles.label}>Регіон проживання</p>
          {/* <p className={styles.helpLabel}>Для чого нам ваш регіон ?</p> */}
          <div className={styles.regionSection}>
            <div className={styles.countryField}>
              <select
                className={styles.regionSelect}
                value={selectedCountryId}
                onChange={(e) => {
                  setSelectedCountryId(e.target.value);
                  setSelectedCityId(""); // скинути місто
                }}
              >
                <option value="">Країна</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.cityField}>
              <select
                className={styles.regionSelect}
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                disabled={!selectedCountryId}
              >
                <option value="">Місто</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
        </div>
        <div className={styles.radioSection}>
          <p className={styles.label}>Хто ви?</p>

          <label className={styles.radioBtn}>
            <input 
              type="radio" 
              name="isArtist" 
              value="false"
              checked={!formData.isArtist}
              onChange={() => onChange("isArtist", false)}
              />
            <span>Я звичайний користувач</span>
          </label>

          <label className={styles.radioBtn}>
            <input 
              type="radio" 
              name="isArtist" 
              value="true"
              checked={formData.isArtist}
              onChange={() => onChange("isArtist", true)}
              disabled
              />
            <span>Я автор пісень</span>
          </label>
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        <button className={styles.submitBtn} disabled={!formData.email} onClick={handleSubmit}>Зареєструватися</button>
      </div>
    </div>
  );
};


export default StepPersonalInfo;