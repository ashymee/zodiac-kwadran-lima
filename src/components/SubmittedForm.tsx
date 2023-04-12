import useStores from "@/utils/useStores";
import BackButton from "./BackButton";

const SubmittedForm = () => {
  const { userData } = useStores();

  return (
    <div className="submitted-form-container">
      <div className="text-container">
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
      </div>

      <BackButton />
    </div>
  );
};

export default SubmittedForm;
