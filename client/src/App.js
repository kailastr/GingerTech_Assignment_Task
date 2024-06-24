import './App.css';

import { Route, Routes, Navigate } from 'react-router-dom';

//layouts
import LoginPage from './Components/Pages/LoginPage';
import SignUpPage from './Components/Pages/SignUpPage';

//pages
import DefaultLayout from './Layout/Default.Layout';
import ProjectCollection from './Components/Pages/ProjectCollection.Page';
import EditProjectPage from './Components/Pages/EditProject.Page';
import CreateProjectPage from './Components/Pages/CreateProject.Page';
import ViewProjectPage from './Components/Pages/ViewProject.Page';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/project/login' />} />
        <Route path='/project' element={<DefaultLayout />}>
          <Route path='all' element={<ProjectCollection />} />
          <Route path='edit/:id' element={<EditProjectPage />} />
          <Route path='create' element={<CreateProjectPage />} />
          <Route path='view/:id' element={<ViewProjectPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
