import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../title/title.component';

// Generate Order Data
function createData(date, time, name, status, testedOn, testedBy) {
  return { date, time, name, status, testedOn, testedBy };
}

const rows = [
  createData(
    '05.02.2024',
    '11:30:00',
    '42006573WVS',
    'OK',
    'Test table №1',
    'pevi5001'
  ),
  createData(
    '05.02.2024',
    '11:20:00',
    '42036573WVS',
    'OK',
    'Test table №2',
    'movi5001'
  ),
  createData(
  '05.02.2024',
  '11:24:00',
  '42039573WVS',
  'OK',
  'Test table №1',
  'pevi5001'
  ),
  createData(
    '05.02.2024',
    '11:10:00',
    '42836573WVS',
    'OK',
    'Test table №2',
    'movi5001'
  ),
  createData(
    '05.02.2024',
    '11:15:00',
    '42939573WVS',
    'OK',
    'Test table №1',
    'pevi5001'
  ),
];

/*function preventDefault(event) {
  event.preventDefault();
}*/

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Harnesses</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Harnes name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Tested On</TableCell>
            <TableCell>Tested By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.time}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>{row.testedOn}</TableCell>
              <TableCell>{row.testedBy}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}