import React, { useContext } from "react";
import { FilmsContext } from "../../context/Films";
import cx from "classnames";
import FilmCard from "../FilmCard";
import Styles from "./FilmsList.module.css";

const FilmsList = () => {
  const { films, sortBy } = useContext(FilmsContext);

  return (
    <div className={Styles.container}>
      <div className={Styles.sorter}>
        <div className={Styles.dropdownContainer}>
          <button class={cx(Styles.btn, Styles.primaryBtn, Styles.dropdownBtn)}>
            Dropdown
          </button>
          <div class={Styles.dropdownContent}>
            <button
              onClick={() => sortBy("popularity")}
              className={cx(
                Styles.btn,
                Styles.secondaryBtn,
                Styles.dropdownContentBtn
              )}
            >
              Sort by popularity
            </button>
            <button
              onClick={() => sortBy("vote_average")}
              className={cx(
                Styles.btn,
                Styles.secondaryBtn,
                Styles.dropdownContentBtn
              )}
            >
              Sort by vote
            </button>
          </div>
        </div>
      </div>
      <div className={Styles.content}>
        {films.map((film, index) => (
          <FilmCard key={index} film={film} />
        ))}
      </div>
    </div>
  );
};

export default FilmsList;
