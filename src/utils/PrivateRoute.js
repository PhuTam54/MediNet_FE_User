// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const PrivateRoute = ({ children, role }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token'); 

//   useEffect(() => {
//     if (!token || (role && token !== role)) {
//       navigate('/login');
//     }
//   }, [token, role, navigate]);

//   return token && (!role || token === role) ? children : null;
// };

// export default PrivateRoute;
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({ children, role }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    if (!token || (role && userRole !== role)) {
      navigate('/login');
    }
  }, [token, role, userRole, navigate]);

  return token && (!role || userRole === role) ? children : null;
};

export default PrivateRoute;