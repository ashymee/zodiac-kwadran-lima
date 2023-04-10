import { useEffect, useState } from "react";

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
  const [TZodiac, setTZodiac] = useState<IZodiac[]>([]);

  useEffect(() => {
    const fetchZodiac = async () => {
      await fetch("http://localhost:3000/data/TZodiac.json")
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

  return {
    getZodiac,
    getAge,
    TZodiac,
  };
};

export default useHandler;
