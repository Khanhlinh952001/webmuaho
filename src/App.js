import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { publicRouter, privateRouter } from './Router'
import DashLayout from './Layout/dashboardLayout/Layout.js';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useAuth } from './hooks/useClient';

function App() {
  const {isAuthenticated}= useAuth();
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          {isAuthenticated
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
