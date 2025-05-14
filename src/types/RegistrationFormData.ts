export interface RegistrationFormData {
  email: string;
  password: string;
  username: string;
  birthDate: string;       // у форматі YYYY-MM-DD
  regionId: string;
  isArtist: boolean;
}