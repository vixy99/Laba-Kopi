import { useState } from 'react';
// import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom'; 

import Box from '@mui/material/Box';

import { useUserProps } from 'src/routes/hooks';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [openNav, setOpenNav] = useState(false);
  
  const userProps = useUserProps();

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} userProps={userProps}/>

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} userProps={userProps} />

        <Main>
          <Outlet />
        </Main>
      </Box>
    </>
  );
}

// DashboardLayout.propTypes = {
//   children: PropTypes.node,
// };
