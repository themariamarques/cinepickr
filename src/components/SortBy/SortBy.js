import React, { useContext } from "react";
import { FilmsContext } from "../../context/Films";
import { ratingSources } from "../../constants/ratingSources";
import { Select } from "antd";
const { Option } = Select;

const SortBy = () => {
  const { sortBy } = useContext(FilmsContext);

  const handleChange = value => {
    sortBy(value);
  };

  return (
    <Select
      defaultValue="Sort by"
      style={{ width: 155, height: 32 }}
      onChange={handleChange}
    >
      <Option key="letterboxd" value="letterboxd">
        Letterboxd
      </Option>
      {ratingSources.map(source => (
        <Option key={source.name} value={source.name}>
          {source.shortName || source.name}
        </Option>
      ))}
      <Option key="shortruntime" value="shortruntime">
        Shortest Runtime
      </Option>
      <Option key="longruntime" value="longruntime">
        Longest Runtime
      </Option>
    </Select>
  );
};

export default SortBy;
