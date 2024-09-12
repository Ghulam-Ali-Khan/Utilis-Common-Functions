import React from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

function CustomDrawer({ isOpen, toggleDrawer, header, children }) {
  const styles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    borderBottom: '1px solid #ece7e7',
    padding: 3,
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer} onOpen={toggleDrawer}>
      <Box sx={styles}>
        <Typography variant="body1">{header}</Typography>
        <IconButton
          onClick={toggleDrawer}
          className="material-table__toolbar-button"
          size="small"
        >
          <Close size={24} color="#b1c3c8" />
        </IconButton>
      </Box>
      {children}
    </Drawer>
  );
}

CustomDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  header: PropTypes.element,
};

CustomDrawer.defaultProps = {
  header: null,
};

export default CustomDrawer;
