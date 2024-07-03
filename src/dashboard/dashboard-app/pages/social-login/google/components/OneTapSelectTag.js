import React, { useState } from 'react';
import { Radio, Select, Space } from 'antd';

const options = ["About", "Contact"];

const handleChange = (value) => {
  console.log(`Selected: ${value}`);
};

const OneTapSelectTag = ({checkbox}) => {
  const [size, setSize] = useState('middle');

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <div className={`${checkbox === true ? "block": "hidden" } `}>
      <Space
        direction="vertical"
        style={{
          width: '100%',
        }}
      >
        <Select
          mode="tags"
          size={size}
          placeholder="Please select"
          defaultValue={["Home"]}
          onChange={handleChange}
          style={{
            width: '100%',
          }}
          options={options.map(option => ({ label: option, value: option }))}
        />
      </Space>
    </div>
  );
};

export default OneTapSelectTag;
