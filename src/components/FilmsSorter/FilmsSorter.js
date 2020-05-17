import React, { useContext } from "react";
import { FilmsContext } from "../../context/Films";
import { ratingSources } from "../../constants/ratingSources";
import Styles from "./FilmsSorter.module.scss";
import { Select } from "antd";
const { Option } = Select;

const FilmsSorter = () => {
  const { sortBy } = useContext(FilmsContext);

  const handleChange = value => {
    sortBy(value);
  };

  return (
    <div className={Styles.container}>
      <Select
        defaultValue="Sort by rating"
        style={{ width: 155, height: 32 }}
        onChange={handleChange}
      >
        {ratingSources.map(source => (
          <Option value={source.name}>{source.shortName || source.name}</Option>
        ))}
      </Select>
    </div>
  );
};

export default FilmsSorter;
