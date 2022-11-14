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
import './index.scss'
import { pink } from '@mui/material/colors';
import AdminAddAnimeModal from '../../modal/AdminAddAnimeModal';

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
const headCells = [
  {  id: 'anime',disablePadding: true,label: 'Anime'},
  {  id: 'studio',disablePadding: false,label: 'Studio'},
  {  id: 'score',disablePadding: false,label: 'Score'},
  {  id: 'year',disablePadding: false, label: 'Year'}, 
  {  id: 'season',disablePadding: false,label: 'Season'},
  {  id: 'type',disablePadding: false,label: 'Type'},
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
export default function AdminAnimeTable(props) {
  const { anime } =props
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - anime.length) : 0;
    const [modalAnime,setModalAnime]=useState()
    const [modalMode,setModalMode]=useState('')
    const [open, setOpen] = useState(false);
    const handleOpen = (item,mode) => {
        setModalMode(mode);
        if(mode=="edit"){
            setModalAnime(item)
        }
        setOpen(true);
    }
    const handleClose = () =>setOpen(false);
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead/>
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                 {anime
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => { 
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.animes_name}
                        >
                          <TableCell padding="checkbox">
                          </TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            {row.animes_name}
                          </TableCell>
                          <TableCell align="left">{row.Studio}</TableCell>
                          <TableCell align="left">{row.animes_score}</TableCell>
                          <TableCell align="left">{row.animes_year}</TableCell>
                          <TableCell align="left">{row.animes_seasonal}</TableCell>
                          <TableCell align="left">{row.animes_seasonal?'TV':'Movie'}</TableCell>
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
          count={anime.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <AdminAddAnimeModal open={open} onClose={handleClose} anime={modalAnime} mode={modalMode}/>
    </Box>
  );
}