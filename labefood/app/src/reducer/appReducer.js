export const initialState = {
  restaurantsList: [],
  profile: {},
  activeRestaurant: { id: 0 },
  count: 0,
  cart: [],
}

export const appReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let newCart;
      newCart = [...state.cart, {...action.product, quantity: state.count, restaurantId: action.restaurantId}];
      return { ...state, cart: newCart, count: 0 };
    case "LOAD_RESTAURANTSLIST":
      return { ...state, restaurantsList: action.restaurantsList };
    case "LOAD_SINGLE_RESTAURANT":
      return { ...state, activeRestaurant: action.restaurant };
    case "LOAD_PROFILE":
      return { ...state, profile: action.profile };
    case "SUM_QUANTITY":
      return { ...state, count: state.count + 1 };
    case "SUBTRACT_QUANTITY":
      return { ...state, count: state.count - 1 };
    default:
      return state;
    }
};