import React from 'react';
import * as yup from 'yup';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
// import { useForm} from 'react-hook-form';
// import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import { 
  Box, 
  Card, 
  Grid, 
  Stack, 
  Container, 
  TextField, 
  Typography,
} from '@mui/material';

import instanceMultipart from 'src/components/api/api-instance-multipart';

import UploadImage from './upload-image';

const ProductForm = ({isEdit, currentData}) => {

  // const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit = async (values) => {    
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('price', parseInt(values.price, 10));
    if(typeof values.imageFile !== "string"){
      formData.append('image_file', uuid());
      formData.append("file", values.imageFile);
    }
    if(isEdit){
      await instanceMultipart.patch(`products/${currentData.id}`, formData).then(() => {
          navigate('/dashboard/admin/product/list');
      }).catch(err => console.log(err))
    }else{      
      await instanceMultipart.post('products',formData).then(()=> {
          navigate('/dashboard/admin/product/list');
      }).catch(err => console.log(err))
    }
  };
  const initialValues = {
      name: currentData?.name || '',
      price: currentData?.price || '',
      imageFile: currentData?.image_file || '',
      pictureChanged: !isEdit,
    }

  const MAX_FILE_SIZE = 10240000; // 102400 =  100KB

  const validFileExtensions = { image: ['jpg', 'png', 'jpeg', 'webp'] };
  
  function isValidFileType(fileName, fileType) {
    return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  }
  const validationSchema = yup.object({
    name: yup
      .string()
      .trim()
      .required('Name is required.'),
    price: yup
      .string()
      .trim()
      .required('Price is required.'),
    pictureChanged: yup.boolean(),
    imageFile: yup
      .string()
      .when("pictureChanged", {
        is: true,
        then: () => yup.mixed()
        .required("Please upload an image")
        .test("is-valid-type", "Not a valid image type",
          value => isValidFileType(value && value.name.toLowerCase(), "image"))
        .test("is-valid-size", "Max allowed size is 10MB",
          value => value && value.size <= MAX_FILE_SIZE)
      })
  });
  // const methods = useForm();

  // const {
    // reset,
    // watch,
    // control,
    // setValue,
    // handleSubmit,
    // formState: { isSubmitting },
  // } = methods;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });
  const handleDrop = async (imageFile) => {
    const file = imageFile[0];
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    })
    formik.setFieldValue('pictureChanged',true)
    formik.setFieldValue('imageFile',file)
  };
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{isEdit ? "Update" : "Create"} Product</Typography>
      </Stack>
      <Card sx={{p: 5}}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ py:2, px: 2 }}>
                <UploadImage
                  value={formik.values.imageFile}
                  name= "imageFile"
                  onChange={formik.handleChange}
                  onDrop={handleDrop}
                />
                
                <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color:  formik.errors.imageFile ?  'error.main':'text.secondary',
                    }}
                  >
                    {formik.errors.imageFile ? formik.errors.imageFile : 'Allowed *.jpeg, *.jpg, *.png, *.gif'}
                    {/* <br /> max size of {fData(3145728)} */}
                  </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box
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
                <TextField name="price" label="Price"
                  // autoComplete='price' 
                  type='number'
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
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
              
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Container>
  )
}

ProductForm.propTypes = {
  isEdit: PropTypes.bool,
  currentData: PropTypes.any,
};
export default ProductForm