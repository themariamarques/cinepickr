import React, { useContext } from "react";
import { FilmsContext } from "../../context/Films";
import { ratingSources } from "../../constants/ratingSources";
import { Select } from "antd";
const { Option } = Select;

const RatingsSorter = () => {
  const { sortBy } = useContext(FilmsContext);

  const handleChange = value => {
    sortBy(value);
  };

  return (
    <Select
      defaultValue="Sort by rating"
      style={{ width: 155, height: 32 }}
      onChange={handleChange}
    >
      {ratingSources.map(source => (
        <Option key={source.name} value={source.name}>
          {source.shortName || source.name}
        </Option>
      ))}
    </Select>
  );
};

export default RatingsSorter;
