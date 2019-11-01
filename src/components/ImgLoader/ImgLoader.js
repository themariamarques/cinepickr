import React, { useState } from "react";
import Styles from "./ImgLoader.module.css";
import cx from "classnames";

const ImageLoader = ({ className, src, filmTitle }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      alt={`${filmTitle} Poster`}
      className={cx(className, Styles.img, { [Styles.isLoaded]: isLoaded })}
      src={src}
      onLoad={() => {
        setIsLoaded(true);
      }}
    />
  );
};

export default ImageLoader;
