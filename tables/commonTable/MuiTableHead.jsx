import React, { useMemo } from 'react';
import { TableHead, TableCell, TableRow, useTheme } from '@mui/material';
import { useTableContext } from 'context/TableContext';

function MuiTableHead() {
  const { order, orderBy, tableHeadings } = useTableContext();

  const { palette } = useTheme();
  const primary = useMemo(() => palette.tablePallete.headBg, []);

  return (
    <TableHead sx={{ ' & th': { backgroundColor: primary, padding: '10px' }, }}>
      <TableRow>
        {tableHeadings.map(
          head => (
            <TableCell
              className="fw-semibold"
              key={head?.key || head?.id}
              align="left"
              padding={head.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === head.key ? order : false}
            >
              {head?.title || head?.label}
            </TableCell>
          ),
        )}
      </TableRow>
    </TableHead>
  );
}

export default MuiTableHead;
