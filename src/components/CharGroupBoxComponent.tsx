
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import { EmptyBox } from './EmptyBox';


import { changeArrayCharAction, changeBoolCharAction, changeStringCharAction, CHAR_VARIANTS, IChar } from '../redux/features/chars/charsSlice';
import { useChangeChar } from './../redux/features/chars/hooks/useChangeChars';

import '../styles/chars-group.scss';
import { RowArrayRenderer, RowBoolRenderer, RowRenderer } from '../renderers/RowsRenderers';
// window._ = _;

const CharsAccordion:React.FC<any> = ({children, groupName}) => {
  return (<Accordion
    className="chars-group">
    <AccordionSummary
      expandIcon={<div className="chars-group__plus-icon">+</div>}
      id="panel1a-header"
      className="chars-group__accordion-summary">
      <Typography>{groupName}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>
  );
}


export const CharGroupItemComponent: React.FC<any> =({children})=>{
  return (<TableCell style={{ width: '100%' }}>
  <CharsAccordion groupName="Цветы">
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
           {/* !//!массив характерискик принадлежащий данной группе */}
           {children}
         </TableBody>
       </Table>
     </TableContainer>
     </Box>
  </CharsAccordion>
 </TableCell>);
}
export const CharsGroupBoxComponent = () => {

  const { currentElement, charGroups } = useSelector((state: RootState) => state.chars);
  const { changeCharValue } = useChangeChar();
  if (!currentElement) {
  
    return <EmptyBox />;
  }
  const grouperrisedChars = _.groupBy(currentElement.chars, (char)=>char.groupId);

  console.log(grouperrisedChars)
  return (
    <Box>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Сортировка по группам</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 
            //!Группа характеристик */}


            {  Object.keys(grouperrisedChars).map((groupId)=>{
     
              let charsForGroup  = grouperrisedChars[groupId];
              return (
                <TableRow>
                <TableCell style={{ width: '100%' }}>
                 <CharsAccordion groupName={charGroups[+groupId].name}>
                 <Box>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell >Тип</TableCell>
                            <TableCell>Название</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* !//!массив характерискик принадлежащий данной группе */}

                  {charsForGroup.map(char=>{
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
                    </Box>
                 </CharsAccordion>
                </TableCell>
                </TableRow>
              )
    
  })}
            
          </TableBody>
        </Table>
      </TableContainer>
    </Box>)
}


