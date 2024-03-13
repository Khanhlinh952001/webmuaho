import { Route, Routes, BrowserRouter, useHistory } from 'react-router-dom';
import { publicRouter, privateRouter } from './router';
import DashLayout from './layout/dashboarLayout';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      } else {
        setUser(false);
      }
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);



  return (
    <>
      <BrowserRouter>
        <Routes>
          {user
            ? privateRouter.map((route, index) => {
                const Page = route.component;
                let Layout = DashLayout;
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
              })
            : publicRouter.map((route, index) => {
                const Page = route.component;
                let Layout = DashLayout;
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
