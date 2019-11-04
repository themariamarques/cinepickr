import React from "react";
import Genres from "../Genres";
import Styles from "./FilmCardInfo.module.css";

const FilmCardInfo = ({ film }) => {
  const {
    credits,
    genres,
    title,
    translations,
    release_date: date,
    original_title: originalTitle,
    original_language: originalLanguage
  } = film;

  const getPtTitle = getPortugueseTitle(
    originalLanguage,
    originalTitle,
    translations && translations.translations
  );

  return (
    <div className={Styles.container}>
      <h2 className={Styles.title}>
        {title && <span className={Styles.enTitle}>{title}</span>}
        <span className={Styles.ptTitle}>{getPtTitle || title}</span>
      </h2>
      <div className={Styles.directorsAndYear}>
        {credits && credits.crew && (
          <p className={Styles.directors}>{extractDirectors(credits.crew)}</p>
        )}
        {date && <p className={Styles.year}>({extractYear(date)})</p>}
      </div>
      {genres && <Genres genres={genres} />}
    </div>
  );
};

const checkIsPortugueseFilm = originalLanguage => {
  return originalLanguage === "pt";
};

const getPortugueseTitle = (originalLanguage, originalTitle, translations) => {
  const portugueseTranslation = extractPortugueseTitle(translations);

  if (checkIsPortugueseFilm(originalLanguage)) {
    return originalTitle;
  }

  return portugueseTranslation && portugueseTranslation.data.title;
};

const extractPortugueseTitle = translations => {
  return (
    translations &&
    translations.find(translation => translation.iso_3166_1 === "PT")
  );
};

const extractDirectors = crew => {
  const directors = [];

  crew.forEach(entry => {
    if (entry.job === "Director") {
      directors.push(entry.name);
    }
  });

  return directors.join(", ");
};

const extractYear = date => {
  return date.split("-")[0];
};

export default FilmCardInfo;
