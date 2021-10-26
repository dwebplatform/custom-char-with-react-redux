
import React,{useState} from 'react';
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
import { PlusIcon, MinusIcon } from './../renderers/RowsRenderers';

interface ICharsAccordion {
  isFirst: boolean;
  children: any;
  groupName: string;
}

const CharsAccordion:React.FC<ICharsAccordion> = ({isFirst,children, groupName}) => {
  const [isExpanded,setExpanded] = useState<boolean>(isFirst);
  const handleChange=()=>{
    setExpanded(!isExpanded);
  }
  return (<Accordion
    className="chars-group"
    expanded={isExpanded}
    onChange={handleChange}>
    <AccordionSummary  className="chars-group__accordion-summary">
        <Box className="chars-group__accordion-title">
        <Box className="chars-group__accordion-title-item">
        {!isExpanded && <PlusIcon/>}
        {isExpanded && <MinusIcon/>}
        </Box>
        <Box className="chars-group__accordion-title-item">
          <Typography className="chars-group__accordion-title-text">{groupName}</Typography>
        </Box>
        </Box>
    </AccordionSummary>
    <AccordionDetails>
      {children}
    </AccordionDetails>
  </Accordion>
  );
}



interface ICharGroupWrapper  {
  isFirst: boolean;
  groupName: string;
  children: any;
}
export const CharGroupWrapper: React.FC<ICharGroupWrapper> =({isFirst, groupName,children})=>{
  console.log(isFirst);
  return (<TableRow>
    <TableCell style={{ width: '100%' }}>
     <CharsAccordion isFirst={isFirst} groupName={groupName}>
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
              {children}
              </TableBody>
                      </Table>
                    </TableContainer>
                    </Box>
                 </CharsAccordion>
                </TableCell>
                </TableRow>
              );
}
export const CharsGroupBoxComponent = () => {

  const { currentElement, charGroups } = useSelector((state: RootState) => state.chars);
  const { changeCharValue } = useChangeChar();
  if (!currentElement) {
    return <EmptyBox />;
  }

  const grouperrisedChars = _.groupBy(currentElement.chars, (char)=>char.groupId);
  console.log(grouperrisedChars);
  return (
    <Box>      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
          <TableBody>
            {/* 
            //!Группа характеристик 
            */}
            {  Object.keys(grouperrisedChars).map((groupId,index)=>{
              
              let isFirst = (index === 0);
              console.log(isFirst,`The first is ${index}`);
              let charsForGroup  = grouperrisedChars[groupId];
              let curentGroup = charGroups.find((group)=>group.id ===(+groupId));
              let groupName = '';
              if(curentGroup) {
                groupName = curentGroup.name;
              }
              return (
                <CharGroupWrapper isFirst={isFirst} key={groupId} groupName={groupName}>               
                          {/* !//!массив характерискик принадлежащий данной группе */}
                  {
                  charsForGroup.map(char=>{
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
                  })
                  }
                  </CharGroupWrapper>) 
  })}
            
          </TableBody>
        </Table>
      </TableContainer>
    </Box>)
}


