import { useDispatch } from "react-redux";
import { changeArrayCharAction, changeBoolCharAction, changeStringCharAction, CHAR_VARIANTS } from "../charsSlice";

export const useChangeChar =()=>{
  const dispatch = useDispatch();
  const changeCharValue = (elementId: number, charId: number, charVariant: CHAR_VARIANTS, value: any):any => {
    if (charVariant === CHAR_VARIANTS.BOOL) {
      // action for change bool only
      return dispatch(changeBoolCharAction({ elementId, charId, value }));
    }
    if (charVariant === CHAR_VARIANTS.ARRAY) {
      //TODO: добавить обработку изменения свойств массива:
      // action for change ARRAY only
      return dispatch(changeArrayCharAction({ elementId, charId, value }));
    }
    if (charVariant === CHAR_VARIANTS.STRING) {
      // action for change STRING only
      return dispatch(changeStringCharAction({ elementId, charId, value }));
    }
  }
  return {changeCharValue};
}