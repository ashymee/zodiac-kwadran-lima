import { create } from "zustand";

export interface FormDataProps {
  name: string;
  birthDate: {
    day: string;
    month: string;
    year: string;
  };
}

export interface UserData {
  name: string;
  year: number;
  month: number;
  day: number;
  zodiac: string;
  symbol?: string;
}

export type Stores = {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;

  formData: FormDataProps;
  setFormData: (formData: FormDataProps) => void;

  isValid: boolean;
  setIsValid: (isValid: boolean) => void;

  userData: UserData;
  setUserData: (userData: UserData) => void;
};

const useStores = create<Stores>((set) => ({
  activeTab: "Calculator",
  setActiveTab: (activeTab) => set((state) => ({ ...state, activeTab })),

  formData: {
    name: "",
    birthDate: {
      day: "",
      month: "",
      year: "",
    },
  },
  setFormData: (formData) =>
    set((state) => ({
      ...state,
      formData,
    })),

  isValid: false,
  setIsValid: (isValid) => set((state) => ({ ...state, isValid })),

  userData: {
    name: "",
    year: 0,
    month: 0,
    day: 0,
    zodiac: "",
    symbol: "",
  },
  setUserData: (userData) =>
    set((state) => ({
      ...state,
      userData,
    })),
}));

export default useStores;
