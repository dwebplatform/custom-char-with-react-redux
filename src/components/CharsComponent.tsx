import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { EmptyBox } from './EmptyBox';
import { changeBoolCharAction, changeStringCharAction, CHAR_VARIANTS, IChar } from '../redux/features/chars/charsSlice';


const RowBoolRenderer =({char,elementId,onChangeCharValue}:{char:IChar,
  elementId:number, onChangeCharValue:(currentElementId: number,charId: number, variant: CHAR_VARIANTS, value:any)=>any
})=>{
  return (<TableRow key={char.id}>
    <TableCell style={{width:'50%'}} className="char-item__key">
        <Box>
          {char.name}
        </Box>
  </TableCell>
  <TableCell>
    <Box>
      <Checkbox 
      checked={char.BOOL_VALUE === true}
      onChange={(e)=>{
        onChangeCharValue(elementId, char.id, CHAR_VARIANTS.BOOL, !e.target.value);
      }}
      value={char.BOOL_VALUE}
      />
    </Box>
  </TableCell>
  </TableRow>);
}
const RowRenderer = ({char,elementId,onChangeCharValue}:{char:IChar,
  elementId:number, onChangeCharValue:(currentElementId: number,charId: number, variant: CHAR_VARIANTS, value:any)=>any
})=>{
  return (<TableRow>
    <TableCell style={{width:'50%'}} className="char-item__key">
      <Box>
        {char.name}
      </Box>
</TableCell>
<TableCell style={{width:'50%'}} >
<Box>
     <TextField value={char.STRING_VALUE} onChange={(e)=>{
        onChangeCharValue(elementId, char.id, CHAR_VARIANTS.STRING, e.target.value);
      }} variant="standard" />
</Box>
</TableCell> 
 </TableRow>);
}
export const CharsBoxComponent=()=>{

  const {currentElement} = useSelector((state:RootState)=>state.chars);
  const dispatch = useDispatch();
  const changeCharValue = (elementId:number, charId:number,  charVariant: CHAR_VARIANTS, value: any )=>{
    console.log({elementId, charId, charVariant});
    if(charVariant === CHAR_VARIANTS.BOOL){
      //! action for change bool only
      return dispatch(changeBoolCharAction({elementId,charId,value}));
    }
    if(charVariant === CHAR_VARIANTS.ARRAY){
      //TODO: добавить обработку изменения свойств массива:
      // action for change ARRAY only
    }
    if(charVariant === CHAR_VARIANTS.STRING){
      // action for change STRING only
      return dispatch(changeStringCharAction({elementId,charId,value}));
    }
  }
  if(!currentElement){
    return <EmptyBox/>;
  }
  
  return (<Box>
    <TableContainer component={Paper}>
     <Table sx={{ minWidth: 100 }} size="small" aria-label="a dense table">
       <TableHead>
         <TableRow>
           <TableCell>Тип</TableCell>
           <TableCell>Название</TableCell>
         </TableRow>
       </TableHead>
       <TableBody>
        {currentElement.chars.map((char)=>{
          if(char.valueType === CHAR_VARIANTS.STRING){
            return (<RowRenderer key={char.id} char={char}
              elementId={currentElement.id}
              onChangeCharValue={changeCharValue}
            />);
          }
          if(char.valueType === CHAR_VARIANTS.BOOL){
            return <RowBoolRenderer key={char.id}
                char={char}
                elementId={currentElement.id}
                onChangeCharValue={changeCharValue}/>
          }
          return null;
        })}       
       </TableBody>
     </Table>
   </TableContainer>
    </Box>)
}