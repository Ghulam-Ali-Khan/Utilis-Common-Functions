import React, { useCallback, useEffect, useState } from 'react';
import { Grid, FormHelperText, Typography, useMediaQuery } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import moment from 'moment';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function FormikDatePicker({
  name,
  views,
  placeholder,
  onChange,
  minDate,
  maxDate,
  disabled,
  excludeDates,
  disableFuture,
  disablePast,
  label,
  isRow,
  isRequired,
  classes,
  dependencyArray,
}) {
  const isLargeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const { values } = useFormikContext();
  const [field, meta, helpers] = useField(name || '');
  const { setValue } = helpers;
  const { value } = field;
  const { error, touched } = meta;

  const [innerValue, setInnerValue] = useState(null);

  useEffect(() => {
    if (value !== '' && value !== undefined && value !== null) {
      setInnerValue(moment(value, 'YYYY-MM-DD'));
    } else {
      setInnerValue(null);
    }
  }, [value]);

  const handleChange = useCallback(
    newMoment => {
      const formattedValue = newMoment?.format('YYYY-MM-DD');

      if (newMoment !== null || newMoment !== undefined) {
        setValue(formattedValue);
        setInnerValue(newMoment);
      } else {
        setValue('');
        setInnerValue('');
      }

      if (onChange) onChange(formattedValue, name);
    },
    [values, ...dependencyArray]
  );

  return (
    <Grid className={`${classes}`} spacing={1} container>
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
            id={name}
          >
            {label}
          </Typography>
        )}
      </Grid>
      <Grid item xl={isRow ? 9 : 12} lg={isRow ? 9 : 12} md={isRow ? 8 : 12} sm={12}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            className="w-100"
            name={name}
            views={views}
            value={innerValue}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            disablePast={disablePast}
            disableFuture={disableFuture}
            minDate={minDate}
            maxDate={maxDate}
            shouldDisableDate={date => {
              let newDate = '';

              excludeDates?.forEach(item => {
                if (date.format('YYYY-MM-DD') === item) {
                  newDate = item;
                }
              });

              return !!newDate;
            }}
            desktopModeMediaQuery={
              isLargeScreen ? '@media (pointer: fine)' : '@media (pointer: coarse)'
            }
            slotProps={{ textField: { size: 'small' } }}
            sx={{
              '& .MuiInputBase-root': {
                height: '35px !important',
                fontSize: '12px !important',
              },
              '& button': {
                padding: '3px',
                marginRight: '-5px',
              },
            }}
          />

          {touched && error && <FormHelperText error>{error}</FormHelperText>}
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
}

export default FormikDatePicker;
