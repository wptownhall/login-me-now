import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const data = [
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'tom',
    label: 'Tom',
  },
];

const Selector = () => {
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
    // Add your custom logic here when an option is selected
  };

  return (
    <Select
      showSearch
      style={{ width: '100%' }}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={handleChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {data.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default Selector;
