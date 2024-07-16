import { Helmet } from 'react-helmet-async';

// sections
import { NewPasswordView } from 'src/sections/auth/index';

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Reset Password</title>
      </Helmet>

      <NewPasswordView />
    </>
  );
}
