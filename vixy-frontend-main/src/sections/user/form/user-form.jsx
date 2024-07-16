import * as yup from 'yup'
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import { 
  Box, 
  Card, 
  Stack, 
  Container, 
  TextField, 
  IconButton,
  Typography, 
  InputAdornment 
} from '@mui/material';

import Iconify from 'src/components/iconify';
import instance from 'src/components/api/api-instance';

const UserForm = ({isEdit, userData}) => {

  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    if(isEdit){
      delete values.password;
      await instance.patch(`users/${userData.id}`, values).then(() => navigate('/dashboard/admin/user/list')).catch(err => console.log(err))
    }else{
      await instance.post('users',values).then(({data})=> {
        enqueueSnackbar(data.message);
        navigate('/dashboard/admin/user/list');
      }).catch(err => console.log(err))
    }
  };
  const initialValues = {
      username: userData?.username || '',
      email: userData?.email || '',
      password:userData?.email ||'',
    }
  const validationSchema = yup.object({
    username: yup
      .string()
      .min(5, '* username should have minimum length of 5')
      .matches(/^(\S+$)/g, '* This field cannot contain blankspaces')
      .trim()
      .required('Username is required.'),
    password: yup
      .string()
      .required('Please specify your password.')
      .min(8, 'The password should have at minimum length of 8.'),
    email: yup
        .string()
        .trim().email()
        .required('Email is required.'),
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
        <Typography variant="h4">{isEdit ? "Update" : "Create"} User</Typography>
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
          <TextField name="username" label="Username"
            // autoComplete='username'
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField name="email" label="Email"
            // autoComplete='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          {!isEdit && (
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
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

UserForm.propTypes = {
  isEdit: PropTypes.bool,
  userData: PropTypes.any,
};
export default UserForm