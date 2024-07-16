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

const IngridientForm = ({isEdit, currentData}) => {

  const [listUnit, setListUnit] = useState();

  // const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if(isEdit){
      delete values.password;
      await instance.patch(`ingridient/${currentData.id}`, values).then(() => {
          navigate('/dashboard/admin/ingridient/list');
      }).catch(err => console.log(err))
    }else{
      await instance.post('ingridient',values).then(()=> {
          navigate('/dashboard/admin/ingridient/list');
      }).catch(err => console.log(err))
    }
  };

  const getData = async () => {
    await instance.get('units/active').then(({data}) => setListUnit(data)).catch(err => console.log(err))
  }
  useEffect(() => {
    getData();
  },[])
  const initialValues = {
      name: currentData?.name || '',
      description: currentData?.description || '',
      unit: currentData?.unit.id || '',
    }
  const validationSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required('Name is required.'),
    description: yup
      .string()
      .trim()
      .required('Description is required.'),
    unit: yup
      .string()
      .trim()
      .required('Unit is required.'),
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
        <Typography variant="h4">{isEdit ? "Update" : "Create"} Ingridient</Typography>
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
          <TextField name="name" label="Name"
            // autoComplete='username'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField name="description" label="Description"
            // autoComplete='description'
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            name="unit"
            label="Unit" 
            select 
            value={formik.values.unit}
            onChange={formik.handleChange}
            error={formik.touched.unit && Boolean(formik.errors.unit)}
            helperText={formik.touched.unit && formik.errors.unit}
          >
            {listUnit && listUnit.map((item, id) => (
              <MenuItem key={id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
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

IngridientForm.propTypes = {
  isEdit: PropTypes.bool,
  currentData: PropTypes.any,
};
export default IngridientForm