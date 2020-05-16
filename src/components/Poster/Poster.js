import React from "react";
import TrailerPlay from "../TrailerPlay";
import ImgLoader from "../ImgLoader";
import cx from "classnames";
import Styles from "./Poster.module.css";

const Poster = ({ film }) => {
  const { poster_path: path, videos, title } = film;

  const basePath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";

  const trailer =
    videos &&
    videos.results &&
    videos.results.find(
      video => video.site === "YouTube" && video.type === "Trailer"
    );

  return (
    <div
      className={cx(Styles.container, {
        [Styles.hasTrailer]: trailer
      })}
    >
      <TrailerPlay trailer={trailer} />
      <ImgLoader
        className={Styles.img}
        src={`${basePath}${path}`}
        filmTitle={title}
      />
    </div>
  );
};

export default Poster;
