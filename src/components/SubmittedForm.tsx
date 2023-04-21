import useStores from "@/utils/useStores";
import BackButton from "./BackButton";

const SubmittedForm = () => {
  const { userData } = useStores();

  return (
    <div className="submitted-form-container">
      <div className="text-container z-10">
        <div className="font-bold">Halo {userData.name}</div>
        <div className="mb-5">
          <div className="">Usia Anda saat ini adalah :</div>
          <div className="">
            <span className="font-bold">{userData.year}</span> Tahun
          </div>
          <div className="">
            <span className="font-bold">{userData.month}</span> Bulan
          </div>
          <div className="">
            <span className="font-bold">{userData.day}</span> Hari
          </div>
        </div>
        <div className="mb-5">
          <div className="">Bintang Anda adalah :</div>
          <div className="">
            {userData.symbol}{" "}
            <span className="font-bold">{userData.zodiac}</span>
          </div>
        </div>
      </div>

      <BackButton />
    </div>
  );
};

export default SubmittedForm;
