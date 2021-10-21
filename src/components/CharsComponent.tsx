
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import _ from 'lodash';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import FormControl from "@mui/material/FormControl";

import { EmptyBox } from './EmptyBox';


import { changeArrayCharAction, changeBoolCharAction, changeStringCharAction, CHAR_VARIANTS, IChar, SORTED_VARIANTS } from '../redux/features/chars/charsSlice';
import { useState } from 'react';
import { RowArrayRenderer, RowBoolRenderer, RowRenderer } from '../renderers/RowsRenderers';
import { useChangeChar } from '../redux/features/chars/hooks/useChangeChars';
import { CharsGroupBoxComponent } from './CharGroupBoxComponent';

// window._ = _;


export const CharsBoxComponent:React.FC<any> = ({sortedBy}:{sortedBy: SORTED_VARIANTS}) => {

  const { currentElement } = useSelector((state: RootState) => state.chars);
  const {changeCharValue} = useChangeChar();

  if (!currentElement) {
    return <EmptyBox />;
  }
  let sortedChars = [...currentElement.chars];
  //! Если пришла фраза отсортировать по алфавиту, сортируем по нему:
  if(sortedBy === SORTED_VARIANTS.ALPHABET){
    sortedChars =  sortedChars.sort((a, b)=>{
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
  })
  }
  return (
  <Box>    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Тип</TableCell>
            <TableCell>Название</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
   
          {sortedChars.map((char) => {
            if (char.valueType === CHAR_VARIANTS.STRING) {
              return (<RowRenderer key={char.id} char={char}
                elementId={currentElement.id}
                onChangeCharValue={changeCharValue}
              />);
            }
            if (char.valueType === CHAR_VARIANTS.BOOL) {
              return <RowBoolRenderer key={char.id}
                char={char}
                elementId={currentElement.id}
                onChangeCharValue={changeCharValue} />
            }
            if (char.valueType === CHAR_VARIANTS.ARRAY) {
              return (<RowArrayRenderer 
                key={char.id}   
                elementId={currentElement.id}
                onChangeCharValue={changeCharValue} 
                char={char}
                />);
            }
            return null;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>)
}



export const TabVariant:React.FC<any>=({children, value,index})=>{
  return (<Box hidden={value!==index}>  {value===index &&children}</Box>);
}
export const CharsContainerComponent=()=>{

  const [curTab, setCurTab] = useState<number>(0);
  return (<Box>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
      value={curTab}
      onChange={(e:any, newValue:number)=>{
        setCurTab(newValue)
      }}
      >
        <Tab label="Характеристики" value={0}  />
        <Tab label="По группам" value={1} />
        <Tab label="По алфавиту" value={2} />
      </Tabs>
      <TabVariant value={curTab} index={0}>
           <CharsBoxComponent/>
      </TabVariant>
      <TabVariant value={curTab} index={1}>
        <CharsGroupBoxComponent/>
      </TabVariant>
      <TabVariant value={curTab} index={2}>
        {/* TODO: сортировать по алфавиту */}
        <CharsBoxComponent sortedBy={SORTED_VARIANTS.ALPHABET}/>
      </TabVariant>
      
    </Box>
    </Box>)
}

