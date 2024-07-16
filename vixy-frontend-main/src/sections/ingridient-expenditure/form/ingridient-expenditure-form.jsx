import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
// import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { 
  Box, 
  Card, 
  Stack, 
  MenuItem,
  TextField, 
  Container, 
  Typography,
} from '@mui/material';

import instance from 'src/components/api/api-instance';

const IngridientExpenditureForm = ({isEdit, currentData}) => {

  const [listIngridient, setListIngridient] = useState([]);

  // const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if(isEdit){
      delete values.password;
      await instance.patch(`ingridient-expenditures/${currentData.id}`, values).then(() => {
          navigate('/dashboard/admin/ingridient-expenditure/list');
      }).catch(err => console.log(err))
    }else{
      await instance.post('ingridient-expenditures',values).then(()=> {
          navigate('/dashboard/admin/ingridient-expenditure/list');
      }).catch(err => console.log(err))
    }
  };

  const getData = async () => {
    await instance.get('ingridient/active').then(({data}) => setListIngridient(data)).catch(err => console.log(err))
  }
  useEffect(() => {
    getData();
  },[])
  const initialValues = {
      total_amount: currentData?.total_amount || '',
      ingridient: currentData?.ingridient?.id || '',
      quantity: currentData?.quantity || '',
    }
  const validationSchema = yup.object({
    total_amount: yup
      .number()
      .required('Total Price is required.'),
    ingridient: yup
      .string()
      .trim()
      .required('Ingridient is required.'),
    quantity: yup
      .number()
      .required('Quantity is required.'),
  });

  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{isEdit ? "Update" : "New"} Ingridient Expenditure</Typography>
      </Stack>
      <Card sx={{p: 5}}>
        <Box component="form" onSubmit={formik.handleSubmit}
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
          }}
        >
          <TextField
            name="ingridient"
            label="Ingridient" 
            select 
            value={formik.values.ingridient}
            onChange={formik.handleChange}
            error={formik.touched.ingridient && Boolean(formik.errors.ingridient)}
            helperText={formik.touched.ingridient && formik.errors.ingridient}
          >
            {listIngridient && listIngridient.map((item, id) => (
              <MenuItem key={id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField name="total_amount" label="Total Price"
            value={formik.values.total_amount}
            onChange={(e) => {
              // Convert the input value to an integer using parseInt
              formik.handleChange(e);
              formik.setFieldValue('total_amount', parseInt(e.target.value, 10));
            }}          
            error={formik.touched.total_amount && Boolean(formik.errors.total_amount)}
            helperText={formik.touched.total_amount && formik.errors.total_amount}
          />
          <TextField name="quantity" label="Total Quantity"
            // autoComplete='username'
            value={formik.values.quantity}
            onChange={(e) => {
              // Convert the input value to an integer using parseInt
              formik.handleChange(e);
              formik.setFieldValue('quantity', parseInt(e.target.value, 10));
            }}          
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity ? formik.errors.quantity : `Base on Ingridient Unit ()`}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
          >
            {isEdit ? 'Update' : 'Save'}
          </LoadingButton>
        </Box>
      </Card>
    </Container>
  )
}

IngridientExpenditureForm.propTypes = {
  isEdit: PropTypes.bool,
  currentData: PropTypes.any,
};
export default IngridientExpenditureForm