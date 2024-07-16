import * as yup from 'yup'
import { useState } from 'react';
import { useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { MuiOtpInput } from "mui-one-time-password-input";

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
import { IconButton, InputAdornment } from '@mui/material';
// import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks'; 

import { bgGradient } from 'src/theme/css'; 

// import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import instance from 'src/components/api/api-instance';

// ----------------------------------------------------------------------

export default function ForgotPasswordView() {

  const [errorMessage, setErrorMessage] = useState();

  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const onSubmit = async (values) => {
    setErrorMessage();
    try {
      const { data } = await instance.post('auth/reset-password', values);
  
      if (data.status === 404) {
        setErrorMessage(data.message);
      } else {
        setErrorMessage('Success reset password, redirecting to login page . . . ')
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    } catch (err) {
      console.error(err);
    }
  
  };

  const initialValues = {
    code: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = yup.object({
    code: yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
    email: yup.string().required('Email is required').email('Email must be a valid email address'),
    password: yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: yup.string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
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
        <MuiOtpInput
          length={6}
          autoFocus
          name="code"
          gap={1.5}
          value={formik.values.code}
          onChange={(code) => formik.setFieldValue('code', code)}
        />
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
        <TextField
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          <Typography variant="h3" sx={{ mb: 2, textAlign: 'center'}}>Request sent successfully!</Typography>

          <Typography variant="body2" sx={{ mb: 5, color: 'text.secondary', textAlign: 'center' }}>
            We&apos;ve sent a 6-digit confirmation email to your email.
            <br />
            Please enter the code in below box to verify your email.
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
