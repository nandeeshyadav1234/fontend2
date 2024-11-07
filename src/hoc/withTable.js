import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from '@mui/material';

// Higher-Order Component
const withTable = (Component) => ({ rows, columns, sortConfig, onSort, ...props }) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2, maxWidth: '100%', overflowX: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                sortDirection={sortConfig.key === column.key ? sortConfig.direction : false}
                onClick={() => onSort(column.key)}
              >
                {column.sortable ? (
                  <TableSortLabel
                    active={sortConfig.key === column.key}
                    direction={sortConfig.direction}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <Component rows={rows} {...props} />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withTable;
