let intialState = {}

const ViewRestaurentCurrentData = (state = intialState,action )=>{
    switch(action.type){
        case "ViewRestaurent":
          return state = action.payload
        default:
            return {}
    }

}

export default ViewRestaurentCurrentData