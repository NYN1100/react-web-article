import { useCallback } from "react";
import { useSelector } from "react-redux";

const ValidationError = () => {
  const { error } = useSelector((state) => state.auth);
  const errorMassage = useCallback(() => {
    return Object.keys(error).map((name) => {
      const msg = error[name].join(" ");
      return `${name} ${msg}`;
    });
  }, [error]);

  return (
    error !== null &&
    errorMassage().map((error) => {
      return (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      );
    })
  );
};

export default ValidationError;
