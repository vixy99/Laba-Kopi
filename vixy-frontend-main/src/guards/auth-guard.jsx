import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';
// import isValidTokenMember from './isValidTokenMember';
import { getToken } from 'src/sections/user/utils';

const AuthGuard = ({ children }) => 
  getToken() ? children : <Navigate to='/signin' replace />;

AuthGuard.propTypes = {
  children: PropTypes.any,
};

export default AuthGuard;