/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';

function ActionBtns({ initialValues, submitText, resetText }) {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormikContext();

  const { isSubmitting, resetForm, touched, errors, setErrors } = formik;

  useEffect(() => {
    if (errors?.detail) {
      enqueueSnackbar(errors.detail, { variant: 'error' });
      setErrors({ ...errors, detail: '' });
    }
  }, [errors]);

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <Button variant="contained" size="small" type="submit" disabled={isSubmitting}>
        {isSubmitting && <CircularProgress size={20} />}
        {submitText}
      </Button>

      <Button
        variant="contained"
        //  color="mutedColor"
        size="small"
        type="button"
        onClick={() => {
          resetForm(initialValues);
        }}
        disabled={!touched || isSubmitting}
      >
        {resetText}
      </Button>
    </Stack>
  );
}

ActionBtns.propTypes = {
  initialValues: PropTypes.object,
  submitText: PropTypes.string,
  resetText: PropTypes.string,
};

ActionBtns.defaultProps = {
  initialValues: null,
  submitText: 'Save',
  resetText: 'Clear',
};

export default ActionBtns;
