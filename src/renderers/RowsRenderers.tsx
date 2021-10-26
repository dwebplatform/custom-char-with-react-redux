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
import FormControl from "@mui/material/FormControl";

import { CHAR_VARIANTS, IChar } from '../redux/features/chars/charsSlice';
import './styles.scss';

export const MinusIcon=()=>{
  return (<svg  width="12px" height="12px"  viewBox="0 0 122.88 119.8"><path d="M23.59,0h75.7a23.63,23.63,0,0,1,23.59,23.59V96.21A23.64,23.64,0,0,1,99.29,119.8H23.59a23.53,23.53,0,0,1-16.67-6.93l-.38-.42A23.49,23.49,0,0,1,0,96.21V23.59A23.63,23.63,0,0,1,23.59,0Zm59.7,53.51a6.39,6.39,0,1,1,0,12.77H39.59a6.39,6.39,0,1,1,0-12.77Zm16-40.74H23.59A10.86,10.86,0,0,0,12.77,23.59V96.21a10.77,10.77,0,0,0,2.9,7.37l.28.26A10.76,10.76,0,0,0,23.59,107h75.7a10.87,10.87,0,0,0,10.82-10.82V23.59A10.86,10.86,0,0,0,99.29,12.77Z"/></svg>);
}
export const PlusIcon =()=>{
  return (<svg  width="12px" height="12px" viewBox="0 0 122.88 119.8"><path d="M23.59,0h75.7a23.63,23.63,0,0,1,23.59,23.59V96.21A23.64,23.64,0,0,1,99.29,119.8H23.59a23.53,23.53,0,0,1-16.67-6.93l-.38-.42A23.49,23.49,0,0,1,0,96.21V23.59A23.63,23.63,0,0,1,23.59,0ZM55.06,38.05a6.38,6.38,0,1,1,12.76,0V53.51H83.29a6.39,6.39,0,1,1,0,12.77H67.82V81.75a6.38,6.38,0,0,1-12.76,0V66.28H39.59a6.39,6.39,0,1,1,0-12.77H55.06V38.05ZM99.29,12.77H23.59A10.86,10.86,0,0,0,12.77,23.59V96.21a10.77,10.77,0,0,0,2.9,7.37l.28.26A10.76,10.76,0,0,0,23.59,107h75.7a10.87,10.87,0,0,0,10.82-10.82V23.59A10.86,10.86,0,0,0,99.29,12.77Z"/></svg>);
}

export const RowArrayRenderer = ({ char, elementId, onChangeCharValue }: {
  char: IChar,
  elementId: number, onChangeCharValue: (currentElementId: number, charId: number, variant: CHAR_VARIANTS, value: any) => any
}) => {
  
  const handleChange =(id:number|string)=>{
    onChangeCharValue(elementId,char.id,CHAR_VARIANTS.ARRAY, id);
  }
  if (!char.ARRAY_VALUE) {
    return null;
  }

  let curentSubChar = char.ARRAY_VALUE.find(el=>el.isSelected);
  if(!curentSubChar){
    return null;
  }

  let curentSubCharId = curentSubChar.id;
  return (<TableRow>
    <TableCell style={{width:'50%'}} className="char-item__key">
      <Box>
        {char.name}
      </Box>
    </TableCell>
    <TableCell style={{width:'50%',padding:'0px', border:'none'}} className="char-item__value">
      <Box className="box-container">
        <FormControl style={{flex:'1', width:'100%'}} >
          <Select style={{width:'100%', padding:'0px', border:'none'}} 
          disableUnderline
          value={curentSubCharId} onChange={(e)=>{handleChange(e.target.value);}}
          className="char-selector">
            {char.ARRAY_VALUE.map((subChar) => {
              return (<MenuItem 
                selected={subChar.isSelected} 
                value={subChar.id}
                key={subChar.id}>{subChar.value}</MenuItem>)
            })}
          </Select>
        </FormControl>
      </Box>
    </TableCell>
  </TableRow>);
};
export const RowBoolRenderer = ({ char, elementId, onChangeCharValue }: {
  char: IChar,
  elementId: number, onChangeCharValue: (currentElementId: number, charId: number, variant: CHAR_VARIANTS, value: any) => any
}) => {
  return (<TableRow key={char.id}>
    <TableCell style={{ width: '50%' }} className="char-item__key">
      <Box>
        {char.name}
      </Box>
    </TableCell>
    <TableCell>
      <Box 
      className="char-item__value"
      >
        <Checkbox
          checked={char.BOOL_VALUE === true}
          onChange={(e) => {
            onChangeCharValue(elementId, char.id, CHAR_VARIANTS.BOOL, !e.target.value);
          }}
          value={char.BOOL_VALUE}
        />
      </Box>
    </TableCell>
  </TableRow>);
}
export const RowRenderer = ({ char, elementId, onChangeCharValue }: {
  char: IChar,
  elementId: number, onChangeCharValue: (currentElementId: number, charId: number, variant: CHAR_VARIANTS, value: any) => any
}) => {
  return (<TableRow>
    <TableCell style={{ width: '50%' }} className="char-item__key">
      <Box>
        {char.name}
      </Box>
    </TableCell>
    <TableCell style={{ width: '50%' }} className="char-item__value" >
      <Box>
        <TextField value={char.STRING_VALUE} onChange={(e) => {
          onChangeCharValue(elementId, char.id, CHAR_VARIANTS.STRING, e.target.value);
        }} variant="standard" 
        className="char-item__value-input"
        InputProps={{ disableUnderline: true }}
        />
      </Box>
    </TableCell>
  </TableRow>);
}