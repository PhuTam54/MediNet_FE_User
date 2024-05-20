import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    if (!token || (role && token !== role)) {
      navigate('/login');
    }
  }, [token, role, navigate]);

  return token && (!role || token === role) ? children : null;
};

export default PrivateRoute;