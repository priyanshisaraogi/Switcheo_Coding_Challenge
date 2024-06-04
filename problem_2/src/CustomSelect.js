import React from 'react';
import Select from 'react-select';

const CustomSelect = ({ options, onChange, value }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2a1b4a',
      borderColor: 'transparent',
      color: 'white'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
      display: 'flex',
      alignItems: 'center'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#3b2a5a' : '#2a1b4a',
      color: 'white',
      display: 'flex',
      alignItems: 'center'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#2a1b4a',
    }),
    input: (provided) => ({
      ...provided,
      color: 'white',
    })
  };

  const formatOptionLabel = ({ value, label }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src={`${process.env.PUBLIC_URL}/tokens/${value}.svg`}
        alt={label}
        style={{ width: 20, height: 20, marginRight: 10 }}
      />
      {label}
    </div>
  );

  return (
    <Select
      styles={customStyles}
      options={options}
      onChange={onChange}
      value={value}
      formatOptionLabel={formatOptionLabel}
    />
  );
};

export default CustomSelect;
