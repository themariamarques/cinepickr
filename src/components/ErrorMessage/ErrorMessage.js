import React from "react";
import Styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <p className={Styles.text}>Something went wrong, please refresh the page</p>
  );
};

export default ErrorMessage;
