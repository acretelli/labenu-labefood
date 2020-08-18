export const initialState = {
  restaurantsList: [],
  activeRestaurant: { id: 0 },
}

export const appReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_RESTAURANTSLIST":
      return { ...state, restaurantsList: action.restaurantsList };
    case "LOAD_SINGLE_RESTAURANT":
      return { ...state, activeRestaurant: action.restaurant };
    default:
      return state;
    }
};