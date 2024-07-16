import { Helmet } from 'react-helmet-async';

// sections
import { ForgotPasswordView } from 'src/sections/auth/index';

// ----------------------------------------------------------------------

export default function ClassicForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: Forgot Password</title>
      </Helmet>

      <ForgotPasswordView />
    </>
  );
}
