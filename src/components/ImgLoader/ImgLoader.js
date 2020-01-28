import React, { useState } from "react";
import Styles from "./ImgLoader.module.scss";
import cx from "classnames";

const ImageLoader = ({ className, src, filmTitle }) => {
  const placeholder =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3C/svg%3E';
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(placeholder);

  return (
    <img
      alt={`${filmTitle} Poster`}
      loading="lazy"
      className={cx(className, Styles.img, { [Styles.isLoaded]: isLoaded })}
      src={imgSrc}
      data-src={src}
      onLoad={() => {
        setImgSrc(src);
        setIsLoaded(true);
      }}
    />
  );
};

export default ImageLoader;
