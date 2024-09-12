import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function MultiInputsGrid({ isRequired, label, children }) {
  return (
    <Grid className="py-0" spacing={1} container>
      <Grid item xl={3} lg={3} md={4} sm={12} className="d-flex align-items-center py-0" sx={{ paddingLeft: '7px !important' }}>
        <Typography variant="body2" className={isRequired ? 'required' : null}>{label}</Typography>
      </Grid>
      <Grid className="py-0" item xl={9} lg={9} md={8} sm={12}>
        {children}
      </Grid>
    </Grid>
  );
}

MultiInputsGrid.propTypes = {
  isRequired: PropTypes.bool.isRequired,
  label: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default MultiInputsGrid;
