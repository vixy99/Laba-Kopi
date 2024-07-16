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

const ProductFormulaForm = ({isEdit, currentData}) => {

  const [listIngridient, setListIngridient] = useState([]);

  const [listProduct, setListProduct] = useState([]);

  // const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if(isEdit){
      delete values.password;
      await instance.patch(`product-formulas/${currentData.id}`, values).then(() => {
          navigate('/dashboard/admin/product-recipe/list');
      }).catch(err => console.log(err))
    }else{
      await instance.post('product-formulas',values).then(()=> {
          navigate('/dashboard/admin/product-recipe/list');
      }).catch(err => console.log(err))
    }
  };

  const getData = async () => {
    await instance.get('ingridient/active').then(({data}) => setListIngridient(data)).catch(err => console.log(err));
    await instance.get('products').then(({data}) => setListProduct(data)).catch(err => console.log(err));
  }
  useEffect(() => {
    getData();
  },[])
  const initialValues = {
      product: currentData?.product?.id || '',
      ingridient: currentData?.ingridient?.id || '',
      quantity: currentData?.quantity || '',
    }
  const validationSchema = yup.object({
    product: yup
      .string()
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
        <Typography variant="h4">{isEdit ? "Update" : "New"} Product Formula</Typography>
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
            name="product"
            label="Product" 
            select 
            value={formik.values.product}
            onChange={formik.handleChange}
            error={formik.touched.product && Boolean(formik.errors.product)}
            helperText={formik.touched.product && formik.errors.product}
          >
            {listProduct && listProduct.map((item, id) => (
              <MenuItem key={id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
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
          <TextField name="quantity" label="Quantity"
            value={formik.values.quantity}
            onChange={(e) => {
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

ProductFormulaForm.propTypes = {
  isEdit: PropTypes.bool,
  currentData: PropTypes.any,
};
export default ProductFormulaForm