import React from 'react';
import Select from 'react-select';
import { FormHelperText, Grid, Typography } from '@mui/material';
import theme from 'styles/mui/theme';

const customStyles = {
  option: (styles, state) => ({
    ...styles,
    paddingTop: '5px',
    paddingBottom: '5px',
    fontSize: '12px',
    cursor: state.isDisabled ? 'not-allowed' : 'default',
    backgroundColor: state.isSelected
      ? theme.palette.primary.main
      : styles.backgroundColor,
    color: state.isSelected ? theme.palette.common.white : styles.color,
    '&:hover': {
      backgroundColor: state.isSelected
        ? theme.palette.primary.main
        : styles.backgroundColor,
      color: state.isSelected ? theme.palette.common.white : styles.color,
    },
  }),
  singleValue: provided => ({
    ...provided,
    fontSize: '12px', // Customize font size for the selected value
  }),
  placeholder: provided => ({
    ...provided,
    fontSize: '12px',
  }),
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? `1px solid ${theme.palette.primary.main} !important`
      : `1px solid ${provided.borderColor}`,
    '&:hover': {
      borderColor: state.isFocused
        ? `2px solid ${theme.palette.primary.main} !important`
        : `1px solid ${provided.borderColor}`,
    },
  }),
  groupHeading: provided => ({
    ...provided,
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#000000',
  }),
  menu: provided => ({
    ...provided,
    minWidth: '200px',
  }),
};

function selectedValue(options, value) {
  let filtered = options.find(option => {
    if (typeof option.label === 'object') {
      return false;
    }
    if (option.options) {
      return option.options.find(item => item.value === value);
    }
    return option.value === value;
  });

  if (filtered && filtered.options) {
    filtered = filtered.options.find(item => item.value === value);
  }
  return filtered;
}

function GroupedOptionsFormikSelect({
  onBlur,
  onChange,
  name,
  options,
  touched,
  value,
  error,
  placeholder,
  menuPosition,
  disabled,
  label,
  classes,
  isRow,
  isRequired,
}) {
  const handleChange = tempValue => {
    if (onChange) onChange(name, tempValue.value);
  };

  const handleBlur = () => {
    if (onBlur) onBlur(name, true);
  };

  return (
    <Grid className={classes} spacing={1} container>
      <Grid
        item
        className="d-flex align-items-center"
        xl={isRow ? 3 : 12}
        lg={isRow ? 3 : 12}
        md={isRow ? 4 : 12}
        sm={12}
      >
        {label && (
          <Typography
            className={isRequired ? 'required' : ''}
            variant="body2"
            sx={{ mb: '2px !important' }}
          >
            {label}
          </Typography>
        )}
      </Grid>
      <Grid item xl={isRow ? 9 : 12} lg={isRow ? 9 : 12} md={isRow ? 8 : 12} sm={12}>
        <Select
          id="color"
          options={options}
          multi
          onChange={handleChange}
          onBlur={handleBlur}
          value={selectedValue(options, value)}
          placeholder={placeholder}
          classNamePrefix="react-select"
          isDisabled={disabled}
          styles={customStyles}
          menuPosition={menuPosition}
        />
        {touched && error && <FormHelperText>{error}</FormHelperText>}
      </Grid>
    </Grid>
  );
}

export default GroupedOptionsFormikSelect;
