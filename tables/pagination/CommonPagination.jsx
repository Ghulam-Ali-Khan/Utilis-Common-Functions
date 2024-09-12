import { Box, Pagination } from '@mui/material';
import usePaginationChange from 'customHooks/usePaginationChange';
import React from 'react';

import styles from 'styles/common/common-pagination.module.scss';

function CommonPagination({ dataCount, rowsPerPage, pageNumber }) {
    const { handleChangePagination, } = usePaginationChange();

  return (
    dataCount > rowsPerPage && (
    <Box className={styles.pagination}>
      <Pagination
        color="primary"
        shape="rounded"
        count={dataCount ? Math.ceil((dataCount ?? 0) / rowsPerPage) : 1}
        page={pageNumber}
        onChange={(e, newPage) => handleChangePagination(newPage)}
      />
    </Box>
        )
  );
}

export default CommonPagination;
