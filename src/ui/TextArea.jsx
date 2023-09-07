import React from "react";

const TextArea = ({ label, height = "100px", state, setState }) => {
  return (
    <div className="form-floating mb-3">
      <textarea
        className="form-control"
        placeholder="Leave a comment here"
        value={state}
        onChange={(e) => setState(e.target.value)}
        id="floatingTextarea"
        style={{ height: height }}
      ></textarea>
      <label htmlFor="floatingTextarea">{label}</label>
    </div>
  );
};

export default TextArea;
