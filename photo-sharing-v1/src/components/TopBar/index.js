import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const TopBar = ({ context }) => {
  return (
    <AppBar className="cs142-topbar-appBar" position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" color="inherit">
          Phi Thiện Anh
        </Typography>
        
        <Typography variant="h5" color="inherit">
          {context}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;