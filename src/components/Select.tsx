import React, { InputHTMLAttributes } from "react";
import ReactSelect from "react-select";
import styled from "styled-components";
import { SpaceProps } from "styled-system";
import { colors } from "../utils/themeColors";
import Box from "./Box";
import Typography from "./Typography";

type SelectOption = {
  label?: number | string;
  value?: string | number;
  name?: string | number;
  id?: number | string;
};

interface SelectProps
  extends InputHTMLAttributes<HTMLInputElement>,
    SpaceProps {
  options: SelectOption[];
  value?: any;
  defaultValue?: any;
  label?: string;
  errorText?: any;
  getOptionLabelBy?: string;
  getOptionValueBy?: string;
  width?: string;
  components?: any;
}

const Select: React.FC<SelectProps> = ({
  options,
  id,
  label,
  errorText,
  getOptionLabelBy,
  getOptionValueBy,
  value,
  width,
  ...props
}) => {
  // extract spacing props
  let spacingProps = {};
  for (const key in props) {
    if (key.startsWith("m") || key.startsWith("p"))
      spacingProps[key] = props[key];
  }

  return (
    <Box width={width || null} justifyContent="flex-start" {...spacingProps}>
      {label && (
        <Typography fontSize="0.875rem" mb="6px">
          {label}
        </Typography>
      )}
      <ReactSelect
        // label="Single Select"
        // placeholder="Single Select"
        // defaultValue={options[0]}
        // isDisabled={isDisabled}
        // isLoading={isLoading}
        // isClearable={true}
        // isRtl={isRtl}
        // isSearchable={isSearchable}
        // menuIsOpen={true}
        // name="color"

        options={options}
        getOptionLabel={
          getOptionLabelBy
            ? (option) => option[getOptionLabelBy]
            : (option) => option.name
        }
        getOptionValue={
          getOptionValueBy
            ? (option) => option[getOptionValueBy]
            : (option) => option.id
        }
        value={
          typeof value != "object"
            ? {
                id: value,
                name: options.find((option: any) => option?.id == value)?.name,
              }
            : value
        }
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary50: colors.gray[100],
            primary: colors.primary.main,
            neutral20: colors.text.disabled,
          },
        })}
        {...props}
      />
      {errorText && (
        <Typography color="error.main" ml="0.25rem" mt="0.25rem" as="small">
          {errorText}
        </Typography>
      )}
    </Box>
  );
};

const customStyles = {
  input: (styles) => ({
    ...styles,
    // height: 30,
    // boxShadow: "0px 0px 10px #ababab",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "inherit",
    backgroundColor: state.isFocused ? "rgba(0,0,0, 0.015)" : "inherit",
    cursor: "pointer",
  }),
};

export const CountryCodeSelect = styled(Select)`
  min-width: 70px;
`;

export default Select;
