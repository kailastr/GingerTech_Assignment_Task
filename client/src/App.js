import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom';

//layouts
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';

//pages
import DefaultLayout from './Layout/Default.Layout';
import AuthenticationLayout from './Layout/AuthenticationLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/user' element={<AuthenticationLayout />} >
          <Route index element={<Navigate to='login' />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
