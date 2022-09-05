import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import theme from './assets/theme';
import { AuthContext, useAuthContext } from './auth/AuthContext';
import { isUserLoggedIn } from './auth/utils/utils';
import LayoutWrapper from './containers/layoutWrapper.container';
import Folder from './containers/folder.container';
import Home from './containers/home.container';
import Space from './containers/space.container';
import Team from './containers/team.container';
import Login from './views/Login';
import SignUp from './views/SignUp';

function RequireAuth({ children }: any) {
  const authenticated = useAuthContext();

  return authenticated.isAuthenticated === true ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: isUserLoggedIn(),
  });



  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{...authState, setAuthState }}>
    <BrowserRouter>
      <Routes>
        <Route 
          path=''
          element = {
            <RequireAuth>
              <LayoutWrapper>
                <Home/>
              </LayoutWrapper>
            </RequireAuth>
          }
        />
        <Route
          path='/login'
          element={
            !authState.isAuthenticated ? (
            <Login/>
            ) : (
              <Navigate to="/" replace/>
            )
          }
        />
        <Route
          path='/signup'
          element={
            !authState.isAuthenticated ? (
            <SignUp/>
            ):(
              <Navigate to="/" replace/>
            )
          }
        />
        <Route
          path='/team/:teamId'
          element={
            <RequireAuth>
              <LayoutWrapper>
                <Team/>
              </LayoutWrapper>
            </RequireAuth>
          }
        />
        <Route
          path='/space/:spaceId'
        >
          <Route
             path=''
             element={
              <RequireAuth>
                <LayoutWrapper>
                  <Space/>
                </LayoutWrapper>
              </RequireAuth>
            }
          />
          <Route
            path='folder/:folderId'
            element={
              <RequireAuth>
                <LayoutWrapper>
                  <Folder/>
                </LayoutWrapper>
              </RequireAuth>
            }
          />
        </Route>
        
      </Routes>
    </BrowserRouter>
    </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
