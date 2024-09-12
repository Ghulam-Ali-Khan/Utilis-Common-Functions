import React from 'react';
import { useField } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormHelperText, Grid, Typography } from '@mui/material';

function FormikTextEditor({
  name,
  onChange,
  onBlur,
  disabled = false,
  classes,
  isRequired,
  isRow,
  label,
  labelMarginBottom,
}) {
  const [{ value: fieldValue }, { touched, error }, { setValue }] = useField(
    name || ''
  );

  const handleChange = (event, editor) => {
    const data = editor.getData();
    if (onChange) onChange(data);
  };

  const handleBlur = (event, editor) => {
    const data = editor.getData();
    setValue(data);
    if (onBlur) onBlur(name, data);
  };

  return (
    <Grid className={classes} spacing={1} container>
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
          sx={{ mb: `${labelMarginBottom} !important` }}
        >
          {label}
        </Typography>
        )}
      </Grid>
      <Grid item xl={isRow ? 9 : 12} lg={isRow ? 9 : 12} md={isRow ? 8 : 12} sm={12}>
        <CKEditor
          editor={ClassicEditor}
          data={fieldValue || ''}
          onChange={disabled ? undefined : handleChange}
          onBlur={handleBlur}
        />
        {touched && error && (
        <FormHelperText className="form__form-group-error">{error}</FormHelperText>
        )}
      </Grid>
    </Grid>
  );
}

export default FormikTextEditor;
