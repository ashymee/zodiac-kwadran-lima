import useHandler from "@/utils/useHandler";
import Head from "next/head";
import { FormEvent, Fragment, useState } from "react";

const tabs = ["Calculator", "Zodiac List"];

const Home = () => {
  const [activeTab, setActiveTab] = useState("Calculator");

  const { TZodiac, getAge, getZodiac } = useHandler();

  const [formData, setFormData] = useState({
    name: "",
    birthDate: {
      day: "",
      month: "",
      year: "",
    },
  });
  const [isValid, setIsValid] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    year: 0,
    month: 0,
    day: 0,
    zodiac: "",
  });

  const emptyField =
    formData.name === "" ||
    formData.birthDate.day === "" ||
    formData.birthDate.month === "" ||
    formData.birthDate.year === "";

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

  return (
    <Fragment>
      <Head>
        <title>Zodiac | K5</title>
        <link rel="shortcut icon" href="logo_k5.jpeg" type="image/jpeg" />
      </Head>

      <main className="h-screen w-screen flex items-center justify-center bg-gradient-to-tr from-purple-700 via-purple-800 to-purple-900">
        <div className="w-96 h-96 border-4 border-purple-700 rounded-lg bg-purple-500 relative flex flex-col overflow-hidden">
          <nav className="flex border-b border-gray-100 text-sm font-medium flex-none">
            {tabs.map((item, index) => (
              <button
                key={index}
                className={`-mb-px border-b p-4 ${
                  item === activeTab
                    ? "border-current text-purple-900 font-bold"
                    : "border-transparent text-purple-700 hover:text-purple-900"
                }`}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </button>
            ))}
          </nav>

          {activeTab === "Calculator" ? (
            !isValid ? (
              <form
                className="flex flex-col justify-center p-3 h-full w-full flex-1"
                onSubmit={handleSubmit}
              >
                <div className="flex-1 h-full space-y-5">
                  <label
                    htmlFor="name"
                    className="space-x-2 flex items-center w-full"
                  >
                    <span className="block flex-none w-28 text-purple-800">
                      Nama
                    </span>
                    <input
                      id="name"
                      type="text"
                      className="flex-1 p-2 border rounded-lg w-full text-sm"
                      placeholder="Nama"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </label>

                  <label
                    htmlFor="birthDate"
                    className="space-x-2 flex items-center w-full"
                  >
                    <span className="block flex-none w-28 text-purple-800">
                      Tanggal Lahir
                    </span>

                    <div
                      id="birthDate"
                      className="flex-1 flex items-center space-x-2 w-full"
                    >
                      <input
                        type="number"
                        min={1}
                        max={31}
                        className="flex-1 p-2 border rounded-lg w-full text-sm"
                        placeholder="Tgl"
                        value={formData.birthDate.day}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            birthDate: {
                              ...prev.birthDate,
                              day: e.target.value,
                            },
                          }))
                        }
                      />
                      <input
                        type="number"
                        min={1}
                        max={12}
                        className="flex-1 p-2 border rounded-lg w-full text-sm"
                        placeholder="Bln"
                        value={formData.birthDate.month}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            birthDate: {
                              ...prev.birthDate,
                              month: e.target.value,
                            },
                          }))
                        }
                      />
                      <input
                        type="number"
                        min={1900}
                        max={2100}
                        className="flex-1 px-4 py-2 border rounded-lg w-full text-sm"
                        placeholder="Thn"
                        value={formData.birthDate.year}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            birthDate: {
                              ...prev.birthDate,
                              year: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  className={`flex-none px-4 py-2 rounded-lg text-white ${
                    emptyField
                      ? "bg-slate-500 cursor-not-allowed"
                      : "bg-purple-800 hover:bg-purple-900"
                  }`}
                  disabled={emptyField}
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="p-5 text-purple-900">
                <div className="font-bold">Halo {userData.name}</div>
                <div className="mb-5">
                  <div className="">Usia Anda saat ini adalah :</div>
                  <div className="">{userData.year} Tahun</div>
                  <div className="">{userData.month} Bulan</div>
                  <div className="">{userData.day} Hari</div>
                </div>
                <div className="mb-5">
                  <div className="">Bintang Anda adalah :</div>
                  <div className="">{userData.zodiac}</div>
                </div>

                <button
                  className="w-full px-4 py-2 rounded-lg text-white bg-slate-800"
                  onClick={() => {
                    setIsValid(false);
                    setFormData({
                      name: "",
                      birthDate: {
                        day: "",
                        month: "",
                        year: "",
                      },
                    });
                  }}
                >
                  Kembali
                </button>
              </div>
            )
          ) : (
            <ul className="p-2">
              {TZodiac.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="font-bold text-purple-800">
                    {item.zodiacName}
                  </div>
                  <div className="text-sm text-slate-700">
                    {item.startDate} - {item.endDate}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </Fragment>
  );
};

export default Home;
