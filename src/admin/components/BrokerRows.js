import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

const BrokerRows = ({ rows, onEdit, onDelete }) => {
  return rows.length === 0 ? (
    <TableRow>
      <TableCell colSpan={11} align="center">No brokers found.</TableCell>
    </TableRow>
  ) : (
    rows.map((broker) => (
      <TableRow key={broker.id}>
        <TableCell>{broker.fullname}</TableCell>
        <TableCell>{broker.email}</TableCell>
        <TableCell>{broker.phone}</TableCell>
        <TableCell>{broker.avatar}</TableCell>
        <TableCell>{broker.description}</TableCell>
        <TableCell>{broker.address}</TableCell>
        <TableCell>{broker.city}</TableCell>
        <TableCell>{broker.gender}</TableCell>
        <TableCell>{broker.birthday}</TableCell>
        <TableCell>
          <Button variant="outlined" onClick={() => onEdit(broker)}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={() => onDelete(broker.id)}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ))
  );
};

export default BrokerRows;
