import { useState, useEffect  } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import instance from 'src/components/api/api-instance';

import ProductCard from '../create/product-card';
import { applyFilter, getComparator } from '../utils';
import TransactionCreateToolbar from '../create/transaction-create-toolbar';

// ----------------------------------------------------------------------

export default function TransactionCreateView() {
  const [users, setUsers] = useState([]);

  const [filterName, setFilterName] = useState('');

 
  const getData = async () => {
    await instance.get('transactions').then(({data}) => setUsers(data)).catch(err => console.log(err))
  }
  useEffect(() => {
    getData();
  },[]);
  

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator('asc', 'name'),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;
  console.log(notFound);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">New Transactions</Typography>
      </Stack>

      <Card>
        <TransactionCreateToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        {dataFiltered.map( (item, key) => (
          <ProductCard key={key}/>
        ))}
      </Card>
    </Container>
  );
}
