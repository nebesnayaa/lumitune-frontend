import React, { useState } from "react";
import { RegistrationFormData } from "../types/RegistrationFormData";
import StepEmail from "./registration/StepEmail";
import StepPassword from "./registration/StepPassword";
import StepPersonalInfo from "./registration/StepPersonalInfo";

const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: "",
    password: "",
    username: "",
    birthDate: "",
    regionId: "",
    isArtist: false,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = <K extends keyof RegistrationFormData>(
  field: K,
  value: RegistrationFormData[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // const requestBody = {
  //   username: formData.username,
  //   password: formData.password,
  //   avatarId: "", // або null, або дефолтний ID, якщо є
  //   role: "USER",
  //   accSubscribers: 0,
  //   accFollowings: 0,
  //   userData: {
  //     id: "", // або не передавати, якщо бекенд сам генерує
  //     birthDate: formData.birthDate,
  //     regionId: formData.regionId,
  //     isArtist: formData.isArtist,
  //     email: formData.email,
  //   }
  // };

  switch (step) {
    case 1:
      return <StepEmail nextStep={nextStep} formData={formData} onChange={handleChange} />;
    case 2:
      return <StepPassword nextStep={nextStep} prevStep={prevStep} formData={formData} onChange={handleChange} />;
    case 3:
      return <StepPersonalInfo prevStep={prevStep} formData={formData} onChange={handleChange} />;
    default:
      return <div>Невідомий крок</div>;
  }
};

export default RegistrationForm;