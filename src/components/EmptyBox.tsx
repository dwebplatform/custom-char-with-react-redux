
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export const EmptyBox=()=>{
  return (<Box><TableContainer component={Paper}>
    <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
      <TableBody>
        <TableRow style={{height:'250px'}}>
        <TableCell style={{width:'50%'}} >
            </TableCell>
            <TableCell style={{width:'50%'}} >
            </TableCell> 
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer></Box>);
}