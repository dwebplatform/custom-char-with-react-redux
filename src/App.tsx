import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import './styles/char.scss';
import { CharsBoxComponent, CharsContainerComponent } from './components/CharsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { chooseElementAction } from './redux/features/chars/charsSlice';
import { FormControl, MenuItem, Select } from '@mui/material';
import { ElementSelector } from './components/ElementSelector';


function App() {

  
  const dispatch = useDispatch();

  
  return (
    <Container sx={{ width: '500px' }}>
      <Box style={{ width: '100%', marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <ElementSelector />
      </Box>
      <CharsContainerComponent />
    </Container>
  );
}

export default App;
