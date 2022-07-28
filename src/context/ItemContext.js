import { createContext, useReducer } from "react"
 

const INITIAL_STATE = {
   menu: [],
   
}



const ItemReducer = (state, actions) => {
    console.log(state.menu)
    switch (actions.type) {
        case "EMPTY_STATE":
            return {
                menu: [],
                 
            };
        case "FETCH_SUCCESS":
            return {
               menu: [...state.menu , actions.payload],
                 
            };
        case "FETCH_FAILED":
            return {
                menu: [],
            
           };
        default:
            return state;
    }
}


export const ItemContext = createContext(INITIAL_STATE);

export const ItemContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(ItemReducer, INITIAL_STATE);
    console.log(state)
    const getAllMenu = (e) => {
         return state.menu;
      };

    return (
        <ItemContext.Provider
            value={{
                 
                menu: state.menu,
                getAllMenu,
                dispatch,
            }}>
                {children}
        </ItemContext.Provider>
    )
}