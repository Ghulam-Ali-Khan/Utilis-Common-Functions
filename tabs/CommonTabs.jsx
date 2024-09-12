/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Paper } from '@mui/material';
import useGetSearchParams from 'customHooks/useGetSearchParams';
import { useNavigate } from 'react-router-dom';
import useGetThemeColor from 'customHooks/useGetThemeColor';

function DetailPageTabs({ tabs = [], defaultTab, isParams, noPaper }) {
  const primaryColor = useGetThemeColor();
  const { active_tab } = useGetSearchParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState((isParams ? defaultTab : active_tab) || defaultTab);

  const handleChange = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
    navigate({ search: `?active_tab=${newActiveTab}` });
  };

  const content = (
    <>
      <Tabs
        variant="scrollable"
        scrollButtons="auto"
        value={activeTab}
        onChange={handleChange}
        sx={{ borderBottom: '1px solid #dee2e6', }}
      >
        {tabs.map(item => (
          item && <Tab key={item?.tabID} label={item?.title} value={item?.tabID} />
        ))}
      </Tabs>
      {tabs.map(item => (
        <Box key={item.tabID} hidden={activeTab !== item.tabID} sx={{ px: noPaper ? 0 : 2 }} className="mt-2">
          {activeTab === item.tabID && item.content}
        </Box>
      ))}
    </>
  );

  return noPaper ? content : (
    <Paper className="p-2 w-100 mb-3 detailed-tabs">
      {content}
    </Paper>
  );
}

DetailPageTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  defaultTab: PropTypes.string.isRequired,
  isParams: PropTypes.bool,
  noPaper: PropTypes.bool,
};

DetailPageTabs.defaultProps = {
  isParams: false,
  noPaper: false,
};

export default DetailPageTabs;
