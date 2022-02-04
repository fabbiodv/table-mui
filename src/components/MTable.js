import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import faker from '@faker-js/faker';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary : {
      dark: '#42a5f5',
      contrastText: '#42a5f5'
    }
  }
})


const useStyles = makeStyles((theme)=>({
  tableContainer: {
    borderRadius: 15,
    margin: '10px 10px',
    maxWidth: 950
  },
  tableHeaderCell: {
    fontWeight:'bold',
    backgroundColor: theme.palette.primary.dark
  }
}));


let USERS = [], STATUSES= ['Active', 'Pending', 'Blocked'];
for (let i = 0; i < 14; i++) {
    USERS[i] = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        jobtitle: faker.name.jobTitle(),
        company: faker.company.companyName(),
        joinDate: faker.date.past().toLocaleDateString('en-US'),
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
    }
    
}

console.log(USERS)

function MTable (){

  const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>User info</TableCell>
            <TableCell className={classes.tableHeaderCell}>Job info</TableCell>
            <TableCell className={classes.tableHeaderCell}>Joining Date</TableCell>
            <TableCell className={classes.tableHeaderCell}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
                {row.email}
                {row.phone}
              </TableCell>
              <TableCell >
                {row.jobTitle}
                {row.company}
              </TableCell>
              <TableCell >{row.joinDate}</TableCell>
              <TableCell >{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default MTable;