import React, { useContext } from "react";
import { FilmsContext } from "../../context/Films";
import cx from "classnames";
import ButtonStyles from "../ButtonStyles.module.css";
import Styles from "./FilmsSorter.module.scss";

const FilmsSorter = () => {
  const { sortBy } = useContext(FilmsContext);

  return (
    <div className={Styles.container}>
      <div className={Styles.dropdownContainer}>
        <button
          className={cx(
            ButtonStyles.btn,
            ButtonStyles.primaryBtn,
            Styles.dropdownBtn
          )}
        >
          Sort by Rating
        </button>
        <div className={Styles.dropdownContent}>
          <button
            onClick={() => sortBy("Internet Movie Database")}
            className={cx(
              ButtonStyles.btn,
              ButtonStyles.secondaryBtn,
              Styles.dropdownContentBtn
            )}
          >
            Imdb
          </button>
          <button
            onClick={() => sortBy("Rotten Tomatoes")}
            className={cx(
              ButtonStyles.btn,
              ButtonStyles.secondaryBtn,
              Styles.dropdownContentBtn
            )}
          >
            Rotten Tomatoes
          </button>
          <button
            onClick={() => sortBy("Metacritic")}
            className={cx(
              ButtonStyles.btn,
              ButtonStyles.secondaryBtn,
              Styles.dropdownContentBtn
            )}
          >
            Metacritic
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilmsSorter;
