import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

// import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import instance from 'src/components/api/api-instance';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import ProductFormulaTableRow from '../product-formula-table-row';
import ProductFormulaTableHead from '../product-formula-table-head';
import ProductFormulaTableToolbar from '../product-formula-table-toolbar';
import { 
  emptyRows, 
  applyFilter,
  getComparator, 
 } from '../utils';

// ----------------------------------------------------------------------


const HEAD_LABEL = [
  { id: 'product', label: 'Product' },
  { id: 'ingridient', label: 'Ingridient' },
  { id: 'quantity', label: 'Quantity' },
  { id: '', label: '' },
  { id: '' },
]

const ProductFormulaPage = () => {
  const [listData, setListData] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const getData = async () => {
    await instance.get('product-formulas').then(({data}) => {
      setListData(data);
    }).catch(err => console.log(err));
  }
  useEffect(() => {
    getData();
  },[]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleActivateRow = async (id) => {
    await instance.post(`ingridient/activation/${id}`).then(() => {
      getData();
    }).catch(err => console.log(err))
  };

  const handleEdit = (id) => navigate(`/dashboard/admin/product-recipe/${id}/edit`)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: listData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Data Product Formula</Typography>

        <Button component={RouterLink} to='/dashboard/admin/product-recipe/create' variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Product Formula
        </Button>
      </Stack>

      <Card>
        <ProductFormulaTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ProductFormulaTableHead
                order={order}
                orderBy={orderBy}
                rowCount={listData.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={HEAD_LABEL}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <ProductFormulaTableRow
                      key={row.id}
                      data={row}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleActivateRow={() => handleActivateRow(row.id)}
                      handleEdit={() => handleEdit(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, listData.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={listData.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}

export default ProductFormulaPage;
