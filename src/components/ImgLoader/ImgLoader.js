import React, { useState } from "react";
import Styles from "./ImgLoader.module.scss";
import cx from "classnames";

const ImageLoader = ({ className, src, filmTitle }) => {
  const placeholder =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3C/svg%3E';
  const [imgSrc, setImgSrc] = useState(placeholder);

  return (
    <img
      alt={`${filmTitle} Poster`}
      loading="lazy"
      className={cx(className, Styles.img)}
      src={imgSrc}
      data-src={src}
      onLoad={() => {
        setImgSrc(src);
      }}
    />
  );
};

export default ImageLoader;
