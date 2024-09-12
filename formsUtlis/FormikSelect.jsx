import React, { useCallback, useMemo } from 'react';
import { FormHelperText, Typography, Button, Grid } from '@mui/material';
import Select from 'react-select';
import { useField } from 'formik';

import useGetThemeColor from 'customHooks/useGetThemeColor';


export const fieldStyles = primaryColor => ({
    control: (provided, state) => ({
      ...provided,
      minHeight: '35px',
      // height: '35px',
      fontSize: '12px',
      border: state.isFocused
        ? `1.8px solid ${primaryColor} !important`
        : `1px solid ${provided.borderColor}`,
      '&:hover': {
        borderColor: state.isFocused
          ? `1.8px solid ${primaryColor} !important`
          : `1px solid ${provided.borderColor}`,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? primaryColor : provided.backgroundColor,
      color: state.isSelected ? '#fff' : provided.color,
      fontSize: '12px',
      '&:hover': {
        backgroundColor: state.isSelected ? primaryColor : provided.backgroundColor,
        color: state.isSelected ? '#fff' : provided.color,
      },
    }),
  });
  
const CUSTOM_BUTTON_VALUE = 'custom-menu-button';

function FormikSelect({
  name,
  options,
  disabled,
  onChange,
  onBlur,
  isGrouped,
  isClearable,
  onMenuCustomButtonClick,
  menuCustomButtonLabel,
  label,
  placeholder,
  menuPosition,
  menuPlacement,
  menuShouldBlockScroll,
  formatOptionLabel,
  isRequired,
  isRow,
  classes,
  isOpen,
  depenpencyArray,
  onKeyDown
}) {
  const [field, meta, helpers] = useField(name);

  const { value, onBlur: onFieldBlur } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const primaryColor = useGetThemeColor();

  const handleChange = useCallback(selectedOption => {
    if (selectedOption?.value === CUSTOM_BUTTON_VALUE) return;

    const fieldValue = selectedOption?.value || null;
    setValue(fieldValue);

    if (onChange) onChange(fieldValue);
  }, [...depenpencyArray]);

  const handleBlur = useCallback(event => {
    onFieldBlur(event);

    if (onBlur) onBlur(name, event);
  }, [...depenpencyArray, value]);

  const allOptions = useMemo(
    () => (isGrouped ? options.map(item => item.options).flatMap(item => item) : [...options]),
    [options]
  );
  const selectedOption = useMemo(
    () => allOptions.find(option => option?.value === value ?? ''),
    [allOptions, value]
  );

  const customButtonOption = {
    label: (
      <Button color="primary" onClick={onMenuCustomButtonClick}>
        {menuCustomButtonLabel}
      </Button>
    ),
    value: CUSTOM_BUTTON_VALUE,
  };

  const modifiedOptions = useMemo(
    () => [...options, ...(onMenuCustomButtonClick ? [customButtonOption] : [])],
    [options, onMenuCustomButtonClick]
  );

  return (
    <Grid
      className={classes}
      sx={{ '& .react-select__option--is-selected, & .react-select__option--is-selected:hover': { backgroundColor: primaryColor } }}
      spacing={1}
      container
    >
      <Grid
        className="d-flex align-items-center"
        item
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
          autoComplete="false"
          menuIsOpen={isOpen}
          options={modifiedOptions}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          value={selectedOption || null}
          classNamePrefix="react-select"
          isDisabled={disabled}
          disabled={disabled}
          isClearable={isClearable}
          styles={fieldStyles(primaryColor)}
          placeholder={placeholder}
          menuPosition={menuPosition}
          menuPlacement={menuPlacement}
          menuShouldBlockScroll={menuShouldBlockScroll}
          formatOptionLabel={formatOptionLabel}
        />
        {touched && error && <FormHelperText error>{error}</FormHelperText>}
      </Grid>
    </Grid>
  );
}

export default FormikSelect;
