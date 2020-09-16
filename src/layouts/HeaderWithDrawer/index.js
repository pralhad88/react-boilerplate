import React from 'react';
import AppBar from './components/AppBar';
import AppDrawer from './components/Drawer';

const HeaderWithDrawer = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <React.Fragment>
      <AppBar toggleDrawer={toggleDrawer} />
      <AppDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
    </React.Fragment>
  );
}



export default HeaderWithDrawer;