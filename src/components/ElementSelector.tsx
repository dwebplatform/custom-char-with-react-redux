
import { FormControl, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { chooseElementAction } from '../redux/features/chars/charsSlice';
import { RootState } from '../redux/store';


export const ElementSelector=()=>{
  const { elements, currentElement } = useSelector((state: RootState) => state.chars);
  const dispatch = useDispatch();
  const handleChoseElement = (id: number) => {
    dispatch(chooseElementAction({ id }));
  }
 return ( <FormControl fullWidth>
    <Select value={currentElement?.id||''}
    onChange={(e)=>{handleChoseElement(+e.target.value)}}
    style={{height:'25px', minHeight:'25px', maxHeight:'25px'}}
    >
      {elements.map(element=>{
        return (<MenuItem key={element.id} value={element.id}  >{element.name}</MenuItem>)
      })}
    </Select>
  </FormControl>)
}