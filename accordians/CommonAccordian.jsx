import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

function CustomAccordion({ heading, description, expanded }) {
  const summary = {
    backgroundColor: 'red',
  };
  const [isExpanded, setIsExpanded] = useState(expanded);
  const { paragraph, bullets } = description;

  const handleChange = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Accordion className="custom-accordion" expanded={isExpanded} onChange={handleChange}>
      <AccordionSummary className={summary} expandIcon={<ExpandMore />}>
        <Box sx={{ fontSize: '13px !important' }}>{heading}</Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ fontSize: '13px !important', lineHeight: '1.6' }} className="d-flex flex-column text-justify">
          <Box>{paragraph}</Box>
          <ul className="mt-2">{bullets && bullets.map(item => <li>{item}</li>)}</ul>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

CustomAccordion.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.object,
  expanded: PropTypes.bool,
};

CustomAccordion.defaultProps = {
  heading: null,
  description: null,
  expanded: false,
};

export default CustomAccordion;
