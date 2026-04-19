import React, { useState } from 'react';
import { Route, Routes, HashRouter } from 'react-router-dom'; 
import { Grid } from '@mui/material';
import TopBar from './components/TopBar';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import UserPhotos from './components/UserPhotos';

const App = () => {
  const [topBarContext, setTopBarContext] = useState("Vui lòng chọn một người dùng");

  return (
      <div>
        <div className="app-container">
        <TopBar context={topBarContext} />
        <div className="cs142-main-topbar-buffer" />
        
        <Grid container spacing={2}>
          <Grid item sm={3}>
            <UserList />
          </Grid>
          <Grid item sm={9}>
            <Routes>
              <Route path="/users/:userId" element={<UserDetail setContext={setTopBarContext} />} />
              <Route path="/photos/:userId" element={<UserPhotos setContext={setTopBarContext} />} />
              <Route path="/users" element={<div className="typography">Welcome! Click on a user.</div>} />
              <Route path="/" element={<div className="typography">Welcome! Click on a user.</div>} />
            </Routes>
          </Grid>
        </Grid>
      </div>
      </div>
  );
};

export default App;