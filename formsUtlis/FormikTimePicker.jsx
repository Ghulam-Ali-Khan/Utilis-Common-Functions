import React, { useCallback, useEffect, useState } from 'react';
import { FormHelperText, Grid, Typography, useMediaQuery } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers';

// COMPONENTS

function FormikModernTimePicker({
  onChange,
  onBlur,
  name,
  disabled,
  placeholder,
  label,
  isRequired,
  isRow,
  classes,
  labelMarginBottom,
}) {
  const isLargeScreen = useMediaQuery(theme => theme.breakpoints.up('md'));
  const { setFieldValue } = useFormikContext();
  const [field, meta, helpers] = useField(name);
  const { setTouched } = helpers;
  const [innerValue, setInnerValue] = useState(null);

  const { onBlur: onFieldBlur, value } = field;
  const { error, touched } = meta;

  useEffect(() => {
    if (value !== undefined || value !== null) {
      setInnerValue(moment(value, 'HH:mm:ss'));
    } else {
      setInnerValue('');
    }
  }, [value]);

  const handleChange = useCallback(
    newMoment => {
      if (newMoment !== null || newMoment !== undefined) {
        const formattedValue = newMoment?.format('HH:mm:ss');
        if (moment(formattedValue, 'HH:mm:ss').isValid()) {
          setFieldValue(name, formattedValue); // formik state
          setInnerValue(newMoment); // local state
        } else {
          setFieldValue(name, 'Invalid Time'); // formik state
          setInnerValue('Invalid Time'); // local state
        }
        if (onChange) onChange(formattedValue, name);
      }
    },
    [value]
  );

  const handleBlur = useCallback(
    e => {
      onFieldBlur(e);

      if (onBlur) onBlur(e, name);
    },
    [value]
  );

  return (
    <Grid className={classes} spacing={1} container>
      {label && (
        <Grid item xl={isRow ? 3 : 12} lg={isRow ? 3 : 12} md={isRow ? 4 : 12} sm={12}>
          <Typography
            className={isRequired ? 'required' : ''}
            variant="body2"
            sx={{ mb: `${labelMarginBottom} !important` }}
          >
            {label}
          </Typography>
        </Grid>
      )}

      <Grid item xl={isRow ? 9 : 12} lg={isRow ? 9 : 12} md={isRow ? 8 : 12} sm={12}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <TimePicker
            sx={{ fontSize: '12px' }}
            className="w-100 "
            name={name}
            value={innerValue}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            onClose={() => setTouched(true)}
            placeholder={placeholder}
            desktopModeMediaQuery={
              isLargeScreen ? '@media (pointer: fine)' : '@media (pointer: coarse)'
            }
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        </LocalizationProvider>

        {touched && error && <FormHelperText error>{error}</FormHelperText>}
      </Grid>
    </Grid>
  );
}

export default FormikModernTimePicker;
