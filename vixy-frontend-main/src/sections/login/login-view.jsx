import * as yup from 'yup'
import { useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks'; 

import { bgGradient } from 'src/theme/css'; 

// import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import instance from 'src/components/api/api-instance';

// ----------------------------------------------------------------------

export default function LoginView() {

  const [errorMessage, setErrorMessage] = useState();

  const { pathname } = useLocation();

  const theme = useTheme();

  
  let navigate = '/dashboard';

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values) => {
    setErrorMessage();
    await instance.post('auth/login',values).then(({data}) => {
      if(data.status === 401){
        setErrorMessage(data.message)
      }else {
        localStorage.setItem('token',data.token);
        if(pathname !== '/auth/login'){
          navigate = pathname;
        }
        router.push(navigate);
      }
    }).catch(err => console.log(err))
  };

  const initialValues = {
    username: '',
    password: '',
  };
  const validationSchema = yup.object({
    username: yup
      .string()
      .trim()
      .required('Email / Username is required.'),
    password: yup
      .string()
      .required('Please specify your password')
      .min(8, 'The password should have at minimum length of 8'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const renderForm = (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Stack spacing={3}>
        <TextField name="username" label="Email / Username"
           autoComplete='username'
           value={formik.values.username}
           onChange={formik.handleChange}
           error={formik.touched.username && Boolean(formik.errors.username)}
           helperText={formik.touched.username && formik.errors.username}
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
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 1 }}>
        <Link
          component={RouterLink} 
          to="/auth/forgot-password"
          variant="subtitle2" underline="hover"
          sx={{ cursor: 'pointer'}}
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
      >
        Login
      </LoadingButton>
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
      {/* <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      /> */}

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, textAlign: 'center'}}>Sign in</Typography>

          {/* <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography> */}

          {/* <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
