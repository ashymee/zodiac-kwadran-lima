import useHandler from "@/utils/useHandler";
import useStores from "@/utils/useStores";

const Form = () => {
  const { handleSubmit, handleChangeName, handleChangeBirthDate, emptyField } =
    useHandler();
  const { formData } = useStores();

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-field-container">
        <label htmlFor="name">
          <span className="field-name">Nama</span>
          <input
            name="name"
            type="text"
            className="input-field"
            placeholder="Nama"
            value={formData.name}
            onChange={handleChangeName}
          />
        </label>

        <label htmlFor="birthDate">
          <span className="field-name">Tanggal Lahir</span>
          <div id="birthDate" className="birthDate-container">
            <input
              type="number"
              name="day"
              min={1}
              max={31}
              className="input-field"
              placeholder="Tgl"
              value={formData.birthDate.day}
              onChange={handleChangeBirthDate}
            />
            <input
              type="number"
              name="month"
              min={1}
              max={12}
              className="input-field"
              placeholder="Bln"
              value={formData.birthDate.month}
              onChange={handleChangeBirthDate}
            />
            <input
              type="number"
              name="year"
              min={1900}
              max={2100}
              className="input-field"
              placeholder="Thn"
              value={formData.birthDate.year}
              onChange={handleChangeBirthDate}
            />
          </div>
        </label>
      </div>

      <button
        type="submit"
        className={`submit-btn ${emptyField ? "not-allowed" : "allowed"}`}
        disabled={emptyField}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
