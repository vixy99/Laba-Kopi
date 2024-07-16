import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

const UserListPage = () =>
    <>
      <Helmet>
        <title> User | List </title>
      </Helmet>

      <UserView />
    </>
export default UserListPage