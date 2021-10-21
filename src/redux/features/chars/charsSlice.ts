import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export enum CHAR_VARIANTS {
  ARRAY = "ARRAY",
  STRING = "STRING",
  BOOL = "BOOL",
}


export interface ICharSelector {
  id: number;
  value: string;
  isSelected: boolean;
}

export interface IChar {
  id: number;
  name: string;
  valueType: CHAR_VARIANTS;
  STRING_VALUE: string | null;
  ARRAY_VALUE: ICharSelector[] | null;
  BOOL_VALUE: boolean | null;
}
interface IElement {
  id: number;
  name: string;
  chars: IChar[];
}
interface ICharState {
  elements: IElement[];
  currentElement: IElement | null;
}
const initialState: ICharState = {
  elements: [
    {
      id: 1,
      name: 'Элемент 1',
      chars: [
        {
          id: 1,
          name: 'Производительность',
          valueType: CHAR_VARIANTS.STRING,
          STRING_VALUE: "Хорошая",
          ARRAY_VALUE: null,
          BOOL_VALUE: null
        },
        {
          id: 2,
          name: 'Есть цвет !!!',
          valueType: CHAR_VARIANTS.BOOL,
          STRING_VALUE: null,
          ARRAY_VALUE: null,
          BOOL_VALUE: true
        },
        {
          id: 3,
          name: 'Инструменты',
          valueType: CHAR_VARIANTS.ARRAY,
          STRING_VALUE: null,
          ARRAY_VALUE: [{
            id: 1,
            value:'Молоток',
            isSelected: false,
          },
        {
          id: 2,
          value:'Отвертка',
          isSelected: true,
        
        },
        {
          id: 3,
          value:'Гаичный ключ',
          isSelected: false,
        
        }
      ],
          BOOL_VALUE: null
        },
        {
          
          id: 4,
          name: 'Кружка',
          valueType: CHAR_VARIANTS.BOOL,
          STRING_VALUE: null,
          ARRAY_VALUE: null,
          BOOL_VALUE: true
        }
      ]
    },
    {
      id: 2,
      name: 'Элемент 2',
      chars: [
        {
          id: 5,
          name: 'Коробки',
          valueType: CHAR_VARIANTS.ARRAY,
          STRING_VALUE: null,
          ARRAY_VALUE: [{
            id: 5,
            value:'Пластиковые',
            isSelected: false,
          },
        {
          id: 6,
          value:'Бумажные',
          isSelected: true,
        },
      {
        id: 7,
        value: 'Стеклянные',
        isSelected: false,
      }],
          BOOL_VALUE: null
        },
        {
          id: 6,
          name: 'Количество инструментов',
          valueType: CHAR_VARIANTS.STRING,
          STRING_VALUE: "6",
          ARRAY_VALUE: null,
          BOOL_VALUE: null
        }
      ]
    },
    {
      id: 3,
      name: 'Элемент 3',
      chars: [
        {
          id: 7,
          name: 'Экономичность',
          valueType: CHAR_VARIANTS.STRING,
          STRING_VALUE: "Оптимальная",
          ARRAY_VALUE: null,
          BOOL_VALUE: null
        }
      ]
    },
  ],
  currentElement: null,
}

export const charsSlice = createSlice({
  name: 'chars',
  initialState,
  reducers: {
    changeArrayCharAction:(state, action:PayloadAction<{elementId:number; charId:number; value:any}>)=>{
      let curEl = state.elements.find(el=>el.id=== action.payload.elementId);
      if(!curEl){
        return;
      }
      state.currentElement = curEl;
      state.currentElement.chars = state.currentElement.chars.map(char=>{
        if( char.id === action.payload.charId ){
        
          // если у текущей характеристики, есть массив, то его можно менять:
          if(char.ARRAY_VALUE){
            char.ARRAY_VALUE = char.ARRAY_VALUE.map((subChar)=>{
              if(subChar.id === action.payload.value){ // пришло событие, что выбранная характеристика в selector c этим id:
                subChar.isSelected = true;
              } else {
                subChar.isSelected = false;
              }
              return subChar;
            })
          }
        }
        return char;
      });      

    },
    changeStringCharAction:(state,action: PayloadAction<{
      elementId:number;
      charId:number;
      value: string;}>)=>{
        let curEl = state.elements.find(el => el.id === action.payload.elementId);
        if(!curEl){
          return;
        }
        state.currentElement = curEl;
        state.currentElement.chars =state.currentElement.chars.map(char=>{
          if(char.id === action.payload.charId){
            char.STRING_VALUE = action.payload.value;
          }
          return char;
        }); 
    },
    changeBoolCharAction:(state,action: PayloadAction<{
      elementId:number;
      charId:number;
      value: boolean;}>)=>{
        let curEl = state.elements.find(el => el.id === action.payload.elementId);
        if(!curEl){
          return;
        }
        // обновили текущий выбранный элемент 
        state.currentElement = curEl;
        state.currentElement.chars =state.currentElement.chars.map(char=>{
          if(char.id === action.payload.charId){
            char.BOOL_VALUE = !char.BOOL_VALUE;
          }
          return char;
        }); 
      
    },
    chooseElementAction: (state, action: PayloadAction<{ id: number }>) => {
      let curEl = state.elements.find(el => el.id === action.payload.id);
      if (curEl) {
        state.currentElement = curEl;
      }
    }

  },
});


export const { chooseElementAction,changeBoolCharAction,changeStringCharAction,changeArrayCharAction } = charsSlice.actions;
export const charsReducer = charsSlice.reducer;