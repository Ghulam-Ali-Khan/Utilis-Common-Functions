import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

import { Modal, Box, IconButton, Card, Typography, Button } from '@mui/material';

function CommonModal({ isOpen, toggle, children, title, func, btnName, isPopup, givenWidth, noCloseSection }) {
  return (
    <Modal
      open={isOpen}
      onClose={toggle}
      className={`d-flex justify-content-center ${isPopup ? 'mt-4 align-items-start' : 'align-items-center'} modal-scroll`}
    >
      <Card sx={{ padding: '5px 15px', minWidth: isPopup && givenWidth, maxWidth: '800px' }}>
        {!noCloseSection && (
        <Box
          className="d-flex justify-content-between align-items-center pb-2"
          sx={{ borderBottom: !isPopup && '1px solid #ccc', marginBottom: !isPopup && '10px', padding: isPopup && '0px 10px' }}
        >
          <Typography variant="body1">{title}</Typography>
          <Box className="d-flex gap-2">
            {(btnName && func) && (
            <Button onClick={func} variant="contained" size="small">
              {btnName}
            </Button>
            )}
            <IconButton onClick={toggle}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        )}

        <Box sx={{ overflowY: 'auto', maxHeight: 'calc(80vh - 48px)', }} className={!isPopup && 'px-2 py-1'}>
          {children}
        </Box>
      </Card>
    </Modal>
  );
}

CommonModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  func: PropTypes.func,
  btnName: PropTypes.string,
  isPopup: PropTypes.bool,
  givenWidth: PropTypes.string,
  noCloseSection: PropTypes.bool,
};

CommonModal.defaultProps = {
  func: null,
  btnName: null,
  isPopup: false,
  title: '',
  givenWidth: '300px',
  noCloseSection: false
};

export default CommonModal;
