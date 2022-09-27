import "./input.styles.scss";

const FormInput = ({label, value, placeholder, type, onChange, name}) => {
  return (
    <div>
      <div className="simpleInput">
        <label className="simpleText" htmlFor="">
          <p>{label}</p>
        </label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="simple"
          required
        />
      </div>
    </div>
  );
};

export default FormInput;