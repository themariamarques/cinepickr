import { ReactComponent as ImdbLogo } from "../../icons/imdb.svg";
import { ReactComponent as RottenLogo } from "../../icons/rotten.svg";
import { ReactComponent as MetacriticLogo } from "../../icons/metacritic.svg";
import { ReactComponent as LetterboxdLogo } from "../../icons/letterboxd.svg";
import React from "react";
import cx from "classnames";
import Styles from "./Ratings.module.scss";

const Ratings = ({ film }) => {
  const { imdbRating, omdbRatings, letterboxdRating, imdb_id } = film;

  if (!imdbRating) {
    return null;
  }

  const shouldRenderAsLink = rating =>
    rating.Source === "Internet Movie Database" && imdb_id;

  const ratingsWebsites = {
    "Internet Movie Database": {
      theme: Styles.imdb,
      icon: <ImdbLogo />,
      link: `https://www.imdb.com/title/${imdb_id}`
    },
    "Rotten Tomatoes": {
      theme: Styles.rotten,
      icon: <RottenLogo />
    },
    Metacritic: {
      theme: Styles.metacritic,
      icon: <MetacriticLogo />
    },
    Letterboxd: {
      theme: Styles.letterboxd,
      icon: <LetterboxdLogo />
    }
  };

  const ratingContent = (ratingValue, source) => {
    return (
      <>
        <span className={Styles.icon}>{source.icon}</span>
        <p>{ratingValue}</p>
      </>
    );
  };

  return (
    <div className={Styles.container}>
      {letterboxdRating && (
        <a
          className={cx(
            Styles.ratingContainer,
            ratingsWebsites.Letterboxd.theme
          )}
          key={`letterboxd_${film.title}`}
          href={`https://letterboxd.com/tmdb/${film.id}`}
          target="_blank"
        >
          {ratingContent(`${letterboxdRating}/5`, ratingsWebsites.Letterboxd)}
        </a>
      )}
      {omdbRatings.map(rating => {
        const isLink = shouldRenderAsLink(rating);
        const Component = isLink ? "a" : "span";
        const source = ratingsWebsites[rating.Source];

        return (
          <Component
            className={cx(Styles.ratingContainer, source.theme, {
              [Styles.isLastElement]: rating.Source === "Metacritic"
            })}
            key={`${rating.Source}_${film.title}`}
            {...(isLink && {
              href: source.link,
              target: "_blank"
            })}
          >
            {ratingContent(rating.Value, source)}
          </Component>
        );
      })}
    </div>
  );
};

export default Ratings;
