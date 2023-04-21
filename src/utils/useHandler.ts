import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useStores, { FormDataProps } from "./useStores";

const isInDevelopment = process.env.NODE_ENV === "development";

interface IZodiac {
  zodiacName: string;
  startDate: string;
  endDate: string;
  day: number;
  symbol: string;
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
  }, [url]);

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

  const daysInYear = (year: number) =>
    (year % 4 === 0 && year % 100 > 0) || year % 400 == 0 ? 366 : 365;

  const monthHas30Days = [3, 5, 8, 10];

  // get days in month
  const daysInMonth = (month: number, year: number): number => {
    let days = 0;

    switch (month) {
      case 1:
        days = 31;
      case 2:
        isLeapYear(year) ? (days = 29) : (days = 28);
      case 3:
        days = 31;
      case 4:
        days = 30;
      case 5:
        days = 31;
      case 6:
        days = 30;
      case 7:
        days = 31;
      case 8:
        days = 31;
      case 9:
        days = 30;
      case 10:
        days = 31;
      case 11:
        days = 30;
      default:
        days = 0;

        return days;
    }
  };

  // array days per month in year
  const arrDaysInYear = (year: number): number[] => [
    31,
    isLeapYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const isLeapYear = (year: number) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const getAge = ({ day, month, year }: ageProps) => {
    const date = new Date();
    let d2 = date.getDate();
    let m2 = date.getMonth() + 1;
    let y2 = date.getFullYear();

    if (day > d2) {
      d2 = d2 + arrDaysInYear(year)[m2 - 1];
      m2 = m2 - 1;
    }
    if (month > m2) {
      m2 = m2 + 12;
      y2 = y2 - 1;
    }
    const d = d2 - day;
    const m = m2 - month;
    const y = y2 - year;

    return { day: d, month: m, year: y };
  };

  const daysCount = (year: number) => {
    return arrDaysInYear(year)
      .slice(1, 12)
      .reduce((acc, curr) => acc + curr, 0);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { day, month, year } = formData.birthDate;

    const date = `${year}-${month}-${day}`;
    const birthDate = new Date(date);

    setIsValid(true);

    const currentAge = getAge({ day: +day, month: +month, year: +year });

    setUserData({
      name: formData.name,
      day: currentAge.day,
      month: currentAge.month + 1,
      year: currentAge.year,
      zodiac: getZodiac(birthDate),
      symbol: TZodiac[Number(month) - 1].symbol,
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

  const resetForm = () => {
    setIsValid(false);
    setFormData({
      name: "",
      birthDate: {
        day: "",
        month: "",
        year: "",
      },
    });
    setUserData({
      name: "",
      year: 0,
      month: 0,
      day: 0,
      zodiac: "",
      symbol: "",
    });
  };

  return {
    getZodiac,
    getAge,
    TZodiac,
    handleSubmit,
    emptyField,
    tabs,
    handleChangeName,
    handleChangeBirthDate,
    daysInYear,
    daysCount,
    monthHas30Days,
    isLeapYear,
    daysInMonth,
    arrDaysInYear,
    resetForm,
  };
};

export default useHandler;
