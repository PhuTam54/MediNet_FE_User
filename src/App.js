import { Fragment, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from '~/utils/PrivateRoute';
function App() {
    
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                 {privateRoutes.map((route, index) => {
  const Page = route.component;
  let Layout = DefaultLayout;

  if (route.layout) {
    Layout = route.layout;
  } else if (route.layout === null) {
    Layout = Fragment;
  }

  return (
    <Route key={index} path={route.path} element={
      route.path === '/courses' ||  route.path === '/mycourses' ? (
        <PrivateRoute role="Employee">
          <Layout>
            <Page />
          </Layout>
        </PrivateRoute>
      ) : (route.path === '/cart' || route.path === '/checkout' || route.path === '/myOrder' || route.path ==='/profile') ? (
        <PrivateRoute>
          <Layout>
            <Page />
          </Layout>
        </PrivateRoute>
      ) : (
        <Layout>
          <Page />
        </Layout>
      )
    }/>
  );
})}
                </Routes>
           
            </div>

            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
    
        </Router>
    );
}

export default App;
