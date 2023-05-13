import { Outlet, Route, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../App';

const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AppContext);
  const navigateTo = useNavigate

  if (!isLoggedIn) {
    navigateTo('/')
  };

  return <Outlet />
};

export default PrivateRoute;