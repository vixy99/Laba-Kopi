import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
// import isValidTokenMember from './isValidTokenMember';
// import { getToken } from 'src/sections/user/utils';
import isTokenAdmin from 'src/utils/is-token-admin';

const AdminGuard = ({ children }) => 
  isTokenAdmin() ? children : <Navigate to='/dashboard' replace />;

AdminGuard.propTypes = {
  children: PropTypes.any,
};

export default AdminGuard;