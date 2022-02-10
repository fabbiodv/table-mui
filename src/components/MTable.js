import * as React from 'react';
import { Table,
 TableBody, 
 TableCell, 
 TableContainer, 
 TableHead, 
 TableRow,
 Paper,
 Avatar,
 Grid,
 Typography,
 TablePagination,
 TableFooter
} from '@mui/material'
import faker from '@faker-js/faker';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';


const theme = createTheme();


const useStyles = makeStyles((theme)=>({
  tableContainer: {
    borderRadius: 15,
    margin: '10px 10px',
    maxWidth: 950
  },
  status: {
    fontWeight: 'bold',
    fontSize: '0.75rem',
    color: 'white',
    backgroundColor:'grey',
    borderRadius: 8,
    padding: '3px 10px',
    display: 'inline-block'
  }
}));

let USERS = [], STATUSES= ['Active', 'Pending', 'Blocked'];
for (let i = 0; i < 20; i++) {
    USERS[i] = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        jobTitle: faker.name.jobTitle(),
        company: faker.company.companyName(),
        joinDate: faker.date.past().toLocaleDateString('en-US'),
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
    }
    
}

console.log(USERS)

function MTable (){

  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    return (


        <TableContainer component={Paper} className={classes.tableContainer}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
          style={{fontWeight:'bold',
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.getContrastText(theme.palette.primary.dark)}}>
            <TableCell >User info</TableCell>
            <TableCell >Job info</TableCell>
            <TableCell>Joining Date</TableCell>
            <TableCell >Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Grid container>
                  <Grid item lg={2}>
                    <Avatar alt={row.name} src='.'
                    style={{backgroundColor: theme.palette.primary.light,
                    color: theme.palette.getContrastText(theme.palette.primary.light)
                    }}
                    />
                  </Grid>
                  <Grid item lg={10}>
                    <Typography style={{fontWeight: 'bold', color: theme.palette.getContrastText(theme.palette.primary.light)}}>{row.name}</Typography>
                    <Typography color = "textSecondary" variant="body2">{row.email}</Typography>
                    <Typography color = "textSecondary" variant="body2">{row.phone}</Typography>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell >
                <Typography color = "primary" variant="subtitle2">{row.jobTitle}</Typography>
                <Typography color = "textSecondary" variant="body2">{row.company}</Typography>
              </TableCell>
              <TableCell >{row.joinDate}</TableCell>
              <TableCell >
              <Typography
                className={classes.status}
                style = {{backgroundColor:
                ((row.status === 'Active' && 'gren') ||
                (row.status === 'Pending' && 'blue') ||
                (row.status === 'Blocked' && 'orange'))
                }}
                >
                {row.status}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    <TableFooter>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={USERS.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableFooter>
    </TableContainer>

    


    )
}

export default MTable;