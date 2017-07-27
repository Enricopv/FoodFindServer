// export function addProduct(productId) {
//     return {
//         type: 'ADD_PRODUCT',
//         productId: productId
//     };
// }

// export function removeProduct(productId) {
//     return {
//         type: 'REMOVE_PRODUCT',
//         productId: productId
//     };
// }

export function addProduct(productId, color) {
  return {
    type: 'ADD_PRODUCT',
    productId: productId,
    color: color
  };
}

// export function removeProduct(productId) {
//     return {
//         type: 'REMOVE_PRODUCT',
//         productId: productId
//     };
// }

// export function addProductToCart(productId) {
//   return(dispatch) => {

//   }
// }