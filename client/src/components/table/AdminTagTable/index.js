import { useState,useEffect } from "react";
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { pink } from '@mui/material/colors';
import { useSelector, useDispatch } from 'react-redux'
import AdminTagModal from "../../modal/AdminTagModal";

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
const headCells = [
  {  id: 'tag',disablePadding: true,label: 'Tag'},
  {  id: 'universe status',disablePadding: false,label: 'Universe status'},
  {  id: 'manage',disablePadding: false,label: 'Manage'}
];

function EnhancedTableHead() {
  return (
    <TableHead sx={{backgroundColor: pink[400]}}>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{
              color:'white'
            }}
          >
           {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
export default function AdminTagTable(props) {
    const { TagAnime } = props
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    useEffect(()=>{
        
    },[])
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - TagAnime.length) : 0;
        const [modalAnimeTag,setModalAnimeTag]=useState()
        const [modalMode,setModalMode]=useState('')
        const [open, setOpen] = useState(false);
        const handleOpen = (item,mode) => {
            setModalMode(mode);
            if(mode=="edit"){
                setModalAnimeTag(item)
            }
            setOpen(true);
    }
    const handleClose = () =>setOpen(false);
    return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 450 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead/>
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {TagAnime
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => { 
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.tags_id}
                    >
                      <TableCell padding="checkbox">
                    
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        {row.tags_name}
                      </TableCell>
                      <TableCell align="left">{row.tags_universe_status?"True":"False"}</TableCell>
                      <TableCell align="left"><button className='adminTable-detail-button' onClick={()=>handleOpen(row,"edit")}>Detail</button></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5 ,10, 25, 50]}
          component="div"
          count={TagAnime.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <AdminTagModal open={open} onClose={handleClose} tag={modalAnimeTag} mode={modalMode}/>
    </Box>
  );
}