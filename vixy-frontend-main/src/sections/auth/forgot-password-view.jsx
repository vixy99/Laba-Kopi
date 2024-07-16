import * as yup from 'yup'
import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
// import InputAdornment from '@mui/material/InputAdornment';

import { bgGradient } from 'src/theme/css'; 

// import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import instance from 'src/components/api/api-instance';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {

  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate()

  const theme = useTheme();

  const onSubmit = async (values) => {
    setErrorMessage();
    await instance.post('auth/forgot-password',values).then(({data}) => {
      if(data.status === 404){
        setErrorMessage(data.message)
      }else {
        navigate('/auth/reset-password');
      }
    }).catch(err => console.log(err))
  };

  const initialValues = {
    email: '',
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .trim().email()
      .required('Email is required.'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const renderForm = (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField name="email" label="Email address"
           autoComplete='email'
           value={formik.values.email}
           onChange={formik.handleChange}
           error={formik.touched.email && Boolean(formik.errors.email)}
           helperText={formik.touched.email && formik.errors.email}
        />
      </Stack>
      {errorMessage && (
          <Typography sx={{
            my: 1,
            textAlign: 'center',
            color: 'red',
            fontSize:14
          }}>
            {errorMessage}
          </Typography>
      )}
  
      <LoadingButton
        sx={{
          my: 2
        }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
      >
        Send Request
      </LoadingButton>
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 1 }}>
        <Link
          component={RouterLink}
          to="/auth/login"
          color="inherit"
          variant="subtitle2"
          sx={{
            mt:5,
            alignItems: 'center',
            display: 'inline-flex',
          }}
        >
          <Iconify icon="eva:arrow-ios-back-fill" width={16} />
          Return to sign in
        </Link>
      </Stack>
    </Box>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 600,
          }}
        >
          <Typography variant="h3" sx={{ mb: 2, textAlign: 'center'}}>Forgot your password?</Typography>

          <Typography variant="body2" sx={{ mb: 5, color: 'text.secondary', textAlign: 'center' }}>
            Please enter the email address associated with your account and We will email you a link
            to reset your password.
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
