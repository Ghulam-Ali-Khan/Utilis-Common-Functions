import { Box, TableContainer, Table, Pagination } from '@mui/material';
import React from 'react';

import { useTableContext } from 'context/TableContext';
// import { ROWS_PER_PAGE } from 'utilities/constants';
import usePaginationChange from 'customHooks/usePaginationChange';
import MuiTableHead from './MuiTableHead';
import MuiTableBody from './MuiTableBody';
import TableLoader from '../TableLoader';

function MuiTable() {
  const { isLoading = false, dataCount, } = useTableContext();

  const { handleChangePagination, page: pageNumber } = usePaginationChange();
  return (
    <Box className="mb-4">
      <TableContainer>
        <Table stickyHeader>
          <MuiTableHead />
          {isLoading ? (
            <TableLoader colSpan={11} />
          ) : (
            <MuiTableBody />
          )}
        </Table>
        {/* {isPagination && ( */}
        {
  dataCount > 0 && (
    <Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }} className="mb-3">

      <Pagination
        color="primary"
        shape="rounded"
        count={dataCount ? Math.ceil((dataCount ?? 0) / 10) : 1}
        page={pageNumber}
        onChange={(e, newPage) => handleChangePagination(newPage)}
      />
    </Box>
  )
}

        {/* )} */}
      </TableContainer>

    </Box>
  );
}

export default MuiTable;
