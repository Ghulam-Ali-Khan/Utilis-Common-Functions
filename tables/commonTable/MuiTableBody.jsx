import React from 'react';
import moment from 'moment';
import { TableCell, TableRow } from '@mui/material';

import NoFoundTable from 'containers/common/components/NoFoundTable';
import { formatAmount } from 'utilities/helpers';
import { useTableContext } from 'context/TableContext';
import { Link } from 'react-router-dom';
import { linkBlue } from 'styles/mui/themeVariables';

function MuiTableBody() {
  const { data, tableHeadings, noDataText } = useTableContext();

  if (data.length === 0) {
    return <NoFoundTable message={noDataText || 'No Record Found'} />;
  }

  return (
    <>
      {data.map(item => (
        <TableRow role="checkbox" tabIndex={-1} key={item.id}>
          {tableHeadings.map((cell, index) => {
            let content;
            if (cell?.isDate) {
              content = moment(item?.item_date).format('DD-MMM-YYYY');
            } else if (cell?.isAmount) {
              content = `${item.currency_symbol}${formatAmount(item.total)}`;
            } else if (cell?.isLink) {
              content = (
                <Link to={`${cell?.path}${item?.id}/detail`} style={{ color: linkBlue }}>
                  {item[cell?.key] || item[cell?.id]}
                </Link>
              );
            } else {
              content = item[cell?.key] || item[cell?.id];
            }

            return (
              <TableCell key={index} component="td" scope="row">
                <span style={{ fontWeight: '400 !important' }} className="pr-3">
                  {content}
                </span>
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </>
  );
}

export default MuiTableBody;
