import React, { useContext } from "react";
import { FilmsContext } from "../../context/Films";
import { genres } from "../../constants/genres";
import { Select } from "antd";

const { Option } = Select;

const GenreFilter = () => {
  const { filterByGenre, availableGenres } = useContext(FilmsContext);

  const handleChange = value => {
    filterByGenre(value);
  };

  return (
    <Select
      mode="multiple"
      style={{ width: "100%", paddingRight: "5px" }}
      placeholder="Filter by genre"
      onChange={handleChange}
    >
      {genres.map(item => (
        <Option key={item.name} disabled={!availableGenres.includes(item.id)}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
};

export default GenreFilter;
