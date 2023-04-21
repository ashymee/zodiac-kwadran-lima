import useHandler from "@/utils/useHandler";
import useStores from "@/utils/useStores";
import Link from "next/link";

const ZodiacList = () => {
  const { TZodiac } = useHandler();
  const { userData } = useStores();

  return (
    <ul className="zodiac-list-container">
      {TZodiac.map((item, index) => (
        <li key={index} className="cursor-pointer">
          <Link
            href={`https://www.astrology.com/zodiac-signs#${item.zodiacName.toLowerCase()}`}
            className={`zodiac-item-container ${
              userData.zodiac === item.zodiacName ? "active" : ""
            }`}
            target="_blank"
          >
            <div className="zodiac-name">
              {item.symbol} {item.zodiacName}
            </div>
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
