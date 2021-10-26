
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

import './chars-components.scss';

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
  });
  }
  return (
  <Box>    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className="char-header__title">Тип</TableCell>
            <TableCell>Название</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
   
          {sortedChars.map((char) => {
            if (char.valueType === CHAR_VARIANTS.STRING) {
              return (<RowRenderer key={char.id} char={char}
                elementId={currentElement.id}
                onChangeCharValue={changeCharValue}/>);
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
      <div className="tabs">
        <div className="tabs__item">
        <button className={`tabs__item-button ${ curTab === 0 ? 'selected':''}`} onClick={()=>setCurTab(0)} value={0}>1</button>
        </div>
        <div className="tabs__item" >
          <button  
           className={`tabs__item-button ${curTab === 1 ? 'selected':''}`}
          onClick={()=>setCurTab(1)} value={1}>2</button>
        </div>
      </div>
      <TabVariant value={curTab} index={0}>
        <CharsBoxComponent sortedBy={SORTED_VARIANTS.ALPHABET}/>
      </TabVariant>
      <TabVariant value={curTab} index={1}>
        <CharsGroupBoxComponent/>
      </TabVariant>
    </Box>
    </Box>)
}

