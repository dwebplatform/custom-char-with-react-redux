import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './styles/char.scss';
import { CharsBoxComponent } from './components/CharsComponent';
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
      <CharsBoxComponent />
    </Container>
  );
}

export default App;
