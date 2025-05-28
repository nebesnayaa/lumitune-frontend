import React, { useState } from "react";
import { RegistrationFormData } from "../../types/RegistrationFormData";
import StepEmail from "./registrationSteps/StepEmail";
import StepPassword from "./registrationSteps/StepPassword";
import StepPersonalInfo from "./registrationSteps/StepPersonalInfo";

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