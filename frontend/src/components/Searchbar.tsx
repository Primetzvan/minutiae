// import React from 'react'
// import { Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
// import SearchBar from "material-ui-search-bar";
// import { useState } from "react";
// import { useQuery } from "react-query";
// import { Type } from "typescript";
// import { getUsers } from "../shared/API";
// import DeleteUser from "./DeleteUser";
// import NewUser from "./NewUser";
// import UserProfile from "./UserProfile";
// import AddIcon from '@material-ui/icons/Add';
// import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
// import FingerprintIcon from '@material-ui/icons/Fingerprint';



// type User = {
//   id: number;
//   username: string;
//   role: string;
//   finger: boolean;
//   access: [];
// }

// type Door = {
//   id: number;
//   doorName: string;
//   IPAddress: string;
//   color: string;
// }

// const StyledTableCell = withStyles((theme: Theme) =>
//         createStyles({
//             head: {
//             backgroundColor: theme.palette.common.black,
//             color: theme.palette.common.white,
//             },
//             body: {
//             fontSize: 14,
//             },
//         }),
//         )(TableCell);

//         const StyledTableRow = withStyles((theme: Theme) =>
//         createStyles({
//             root: {
//             '&:nth-of-type(odd)': {
//                 backgroundColor: theme.palette.action.hover,
//             },
//             },
//         }),
//         )(TableRow);

//         const useStyles = makeStyles({
//             table: {
//               width: '80%',
             
              
//             },
//             searchBar: {
//                 width: '80%',
//                 marginBottom: '1%',

//             }
//           });

// export default function BasicTable() {

//   const { data } = useQuery(getUsers.name, getUsers); //isLoading
//  //const [rows, setRows] = useState<User[]|undefined>(data?.users);
//  const [searched, setSearched] = useState<string>("");
 

//  const requestSearch = (searchedVal: string) => {
//   const filteredRows = data?.users.filter((row) => {
//     return row.username.toLowerCase().includes(searchedVal.toLowerCase());
//   });
// //setRows(filteredRows);
// };

// rows?.map((row) => (
//  <ul><li>{row.username}</li></ul>

// ))

// const cancelSearch = () => {
//   setSearched("");
//   requestSearch(searched);
//  };

// return(

//  <TableContainer style={{display: 'grid', placeItems: 'center'}}>
// <SearchBar value={searched} onChange={(searchVal) => requestSearch(searchVal)} onCancelSearch={() => cancelSearch()}/>
// {/* <TextField label="Search" variant="filled" className={classes.searchBar}></TextField> */}

//      <Table stickyHeader aria-label="sticky table">
//          <TableHead>
//          <TableRow>
//              <StyledTableCell></StyledTableCell>
//              <StyledTableCell>ID</StyledTableCell>
//              <StyledTableCell align="right">Username 
//              </StyledTableCell>
//              <StyledTableCell align="right">Role</StyledTableCell>
//              <StyledTableCell align="right">Fingerprint</StyledTableCell>
//              <StyledTableCell align="inherit" >Access</StyledTableCell>
//              <StyledTableCell align="inherit" ><Button><AddIcon /><NewUser /></Button></StyledTableCell>
//          </TableRow>
//          </TableHead>
//          <TableBody>
//          {data?.users.map((row) => (
//              <StyledTableRow key={row.uuid}>
//                  <StyledTableCell><Button data-cy="deleteUser"><DeleteUser /></Button></StyledTableCell>
//              <StyledTableCell component="th" scope="row">
//                  {row.uuid}
//              </StyledTableCell>
//              <StyledTableCell align="center">{row.username}</StyledTableCell>
//              <StyledTableCell align="center">{row.role}</StyledTableCell>
//              <StyledTableCell align="center">{row.finger ? <FingerprintIcon style={{color: 'green'}}/> : <FingerprintIcon style={{color: 'red'}}/>}</StyledTableCell>
//              <StyledTableCell align="justify" style={{marginLeft: '20%'}}>{row.access.map((door: Door) =>(
                
//                 <Chip label={door.doorName} style={{margin:'0.5%', backgroundColor: door.color}}/>
//              ))}</StyledTableCell> 
//               <StyledTableCell align="right"><UserProfile /> </StyledTableCell>
//              </StyledTableRow>
//          ))}
//          </TableBody>
//      </Table>
//  </TableContainer>
//  )
// }

export {};
