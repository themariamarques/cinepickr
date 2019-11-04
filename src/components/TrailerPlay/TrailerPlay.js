import React from "react";
import IconPlay from "../IconPlay";
import Styles from "./TrailerPlay.module.css";

const TrailerPlay = ({ videos }) => {
  const trailer = findTrailer(videos);

  if (!trailer) {
    return null;
  }

  return (
    <a
      className={Styles.link}
      href={`https://www.youtube.com/watch?v=${trailer.key}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconPlay />
    </a>
  );
};

const findTrailer = videos => {
  return (
    videos &&
    videos.results &&
    videos.results.find(
      video => video.site === "YouTube" && video.type === "Trailer"
    )
  );
};

export default TrailerPlay;
