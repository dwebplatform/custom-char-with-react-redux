import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import './styles/char.scss';
import { CharsBoxComponent, CharsContainerComponent } from './components/CharsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { chooseElementAction } from './redux/features/chars/charsSlice';
function App() {

  const { elements } = useSelector((state: RootState) => state.chars);
  const dispatch = useDispatch();

  const handleChoseElement = (id: number) => {
    dispatch(chooseElementAction({id}));
  }
   return (
    <Container sx={{ width: '500px' }}>
      <Box style={{ width: '100%', marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '10px' }}>

        {elements.map((element) => {
          return (<Box key={element.id}
            onClick={(e) => handleChoseElement(element.id)}
            style={{
              display: 'flex',
              cursor: 'pointer',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100px',
              height: '100px',
              border: '1px solid red',
              textAlign: 'center',
            }}>
            {element.name}
          </Box>);
        })}
      </Box>
          <CharsContainerComponent/>
      {/* <CharsBoxComponent /> */}
    </Container>
  );
}

export default App;
