import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useStores, { FormDataProps } from "./useStores";

const isInDevelopment = process.env.NODE_ENV === "development";

interface IZodiac {
  zodiacName: string;
  startDate: string;
  endDate: string;
  day: number;
}

interface ageProps {
  day: number;
  month: number;
  year: number;
}

const useHandler = () => {
  const { setIsValid, formData, setFormData, setUserData } = useStores();

  const tabs = ["Calculator", "Zodiac List"];

  const [TZodiac, setTZodiac] = useState<IZodiac[]>([]);

  const url = isInDevelopment
    ? "http://localhost:3000"
    : "https://zodiac-kwadran-lima.vercel.app";

  useEffect(() => {
    const fetchZodiac = async () => {
      await fetch(`${url}/data/TZodiac.json`)
        .then((res) => res.json())
        .then((json) => setTZodiac(json));
    };

    fetchZodiac();
  }, []);

  const getZodiac = (date: Date) => {
    const days = TZodiac.map((item) => item.day);
    const zodiacNames = TZodiac.map((item) => item.zodiacName);

    let month = date.getMonth();
    let day = date.getDate();

    if (month == 0 && day <= 20) {
      month = 11;
    } else if (day < days[month]) {
      month--;
    }

    return zodiacNames[month];
  };

  const getAge = ({ day, month, year }: ageProps) => {
    var date = new Date();
    var currentDate = date.getDate();
    var currentMonth = 1 + date.getMonth();
    var currentYear = date.getFullYear();
    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day > currentDate) {
      currentDate = currentDate + days[currentMonth - 1];
      currentMonth = currentMonth - 1;
    }
    if (month > currentMonth) {
      currentMonth = currentMonth + 12;
      currentYear = currentYear - 1;
    }
    var d = currentDate - day;
    var m = currentMonth - month;
    var y = currentYear - year;

    return {
      year: y,
      month: m,
      day: d,
    };
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { day, month, year } = formData.birthDate;
    const date = `${year}-${month}-${day}`;
    const birthDate = new Date(date);

    setIsValid(true);

    setUserData({
      name: formData.name,
      day: +day,
      month: +month,
      year: getAge({ day: +day, month: +month, year: +year }).year,
      zodiac: getZodiac(birthDate),
    });
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const data = {
      ...formData,
      [name]: value,
    };
    setFormData(data);
  };

  const handleChangeBirthDate = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const data: FormDataProps = {
      ...formData,
      birthDate: {
        ...formData.birthDate,
        [name]: value,
      },
    };
    setFormData(data);
  };

  const emptyField =
    formData.name === "" ||
    formData.birthDate.day === "" ||
    formData.birthDate.month === "" ||
    formData.birthDate.year === "";

  return {
    getZodiac,
    getAge,
    TZodiac,
    handleSubmit,
    emptyField,
    tabs,
    handleChangeName,
    handleChangeBirthDate,
  };
};

export default useHandler;
