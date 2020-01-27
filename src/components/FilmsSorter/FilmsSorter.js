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
          class={cx(
            ButtonStyles.btn,
            ButtonStyles.primaryBtn,
            Styles.dropdownBtn
          )}
        >
          Sort by
        </button>
        <div class={Styles.dropdownContent}>
          <button
            onClick={() => sortBy("vote_average")}
            className={cx(
              ButtonStyles.btn,
              ButtonStyles.secondaryBtn,
              Styles.dropdownContentBtn
            )}
          >
            Tmbd Rating
          </button>
          <button
            onClick={() => sortBy("popularity")}
            className={cx(
              ButtonStyles.btn,
              ButtonStyles.secondaryBtn,
              Styles.dropdownContentBtn
            )}
          >
            Tmbd Popularity
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilmsSorter;
