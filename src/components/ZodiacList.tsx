import useHandler from "@/utils/useHandler";
import Link from "next/link";

const ZodiacList = () => {
  const { TZodiac } = useHandler();

  return (
    <ul className="zodiac-list-container">
      {TZodiac.map((item, index) => (
        <li key={index} className="cursor-pointer">
          <Link
            href={`https://www.astrology.com/zodiac-signs#${item.zodiacName.toLowerCase()}`}
            className="zodiac-item-container"
            target="_blank"
          >
            <div className="zodiac-name">{item.zodiacName}</div>
            <div className="zodiac-date">
              {item.startDate} - {item.endDate}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ZodiacList;
