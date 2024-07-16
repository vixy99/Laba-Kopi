import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
// import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import { 
  Box, 
  Card, 
  Stack, 
  Container, 
  TextField, 
  Typography, 
} from '@mui/material';

import instance from 'src/components/api/api-instance';

const UnitForm = ({isEdit, currentData}) => {

  // const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if(isEdit){
      delete values.password;
      await instance.patch(`units/${currentData.id}`, values).then(() => {
          navigate('/dashboard/admin/unit/list');
      }).catch(err => console.log(err))
    }else{
      await instance.post('units',values).then(()=> {
          navigate('/dashboard/admin/unit/list');
      }).catch(err => console.log(err))
    }
  };
  const initialValues = {
      name: currentData?.name || '',
      description: currentData?.description || '',
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
        <Typography variant="h4">{isEdit ? "Update" : "Create"} Unit</Typography>
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

UnitForm.propTypes = {
  isEdit: PropTypes.bool,
  currentData: PropTypes.any,
};
export default UnitForm