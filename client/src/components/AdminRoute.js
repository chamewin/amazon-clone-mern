import { useContext } from 'react';
import { Store } from 'utils/Store';
import { Navigate } from 'react-router-dom';

export const AdminRoute = ({ children }) => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}