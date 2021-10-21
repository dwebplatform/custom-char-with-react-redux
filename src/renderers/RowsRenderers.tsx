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
    <TableCell>
      <Box>
        {char.name}
      </Box>
    </TableCell>
    <TableCell>
      <Box>
        <FormControl fullWidth>
          <TextField style={{ position: 'absolute' }} variant="outlined" InputLabelProps={{ shrink: true }}
            value={char.ARRAY_VALUE.find(subChar => subChar.isSelected)?.value || '...'} />
          <Select value={curentSubCharId} onChange={(e)=>{
            handleChange(e.target.value);
          }}>
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
      <Box>
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
    <TableCell style={{ width: '50%' }} >
      <Box>
        <TextField value={char.STRING_VALUE} onChange={(e) => {
          onChangeCharValue(elementId, char.id, CHAR_VARIANTS.STRING, e.target.value);
        }} variant="standard" />
      </Box>
    </TableCell>
  </TableRow>);
}