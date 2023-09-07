import React from "react";

const Input = ({ label, type, state, setState }) => {
  return (
    <div className="form-floating">
      <input
        type={type}
        className="form-control mb-2"
        placeholder={label}
        required=""
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <label>{label}</label>
    </div>
  );
};

export default Input;
