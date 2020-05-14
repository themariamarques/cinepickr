import React from "react";
import TrailerPlay from "../TrailerPlay";
import ImgLoader from "../ImgLoader";
import Styles from "./Poster.module.css";

const Poster = ({ film }) => {
  const { poster_path: path, videos, title } = film;

  const basePath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

  return (
    <div className={Styles.container}>
      <TrailerPlay videos={videos} />
      <ImgLoader
        className={Styles.img}
        src={`${basePath}${path}`}
        filmTitle={title}
      />
    </div>
  );
};

export default Poster;
