import useStores from "@/utils/useStores";

const BackButton = () => {
  const { setIsValid, setFormData } = useStores();

  return (
    <button
      className="back-btn"
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
  );
};

export default BackButton;
