import useHandler from "@/utils/useHandler";

const BackButton = () => {
  const { resetForm } = useHandler();

  return (
    <button className="back-btn" onClick={resetForm}>
      Kembali
    </button>
  );
};

export default BackButton;
