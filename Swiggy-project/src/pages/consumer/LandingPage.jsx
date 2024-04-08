import DrawerComponent from '../../components/Consumer/DrawerComponent';
import React, { useState } from 'react';
import Herosection from '../../components/Consumer/Herosection';
import Features from '../../components/Consumer/Features';
import Restaurants from '../../components/Consumer/Restaurants';
import { Button } from '@mui/material';

const LandinPage = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <Herosection openDrawer={toggleDrawer}/>
      <Features />
      <Restaurants />
      <DrawerComponent
        anchor="right"
        isOpen={state['right']}
        onClose={toggleDrawer('right', false)}
        onOpen={toggleDrawer('right', true)}
      />
    </>
  );
};

export default LandinPage;
