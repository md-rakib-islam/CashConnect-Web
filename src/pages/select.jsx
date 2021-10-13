import React from 'react';
import Select from 'react-select';

const country_codes = [{label: "sakib1",value: "sakib1"}, {label: "sakib2",value: "sakib2"}, {label: "sakib3",value: "sakib3"}]

const CustomOption = ({ innerProps, isDisabled, data}) => {

    console.log(data.label)
  return !isDisabled ? (
    <div {...innerProps}><img src="https://flagcdn.com/w20/bd.png"></img> {data.label}</div>
  ) : null;
}

function Component () {
    return <Select components={{ Option: CustomOption }} options={country_codes}/>;
}

export default Component