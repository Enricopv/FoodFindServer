
export function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [
        ...state,
        {
          id: action.productId,
          color: action.color
        }
      ]
    // case 'REMOVE_PRODUCT':
    //   return action.productId
    default:
      return state;
    }

}