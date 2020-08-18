import React, { useReducer } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/globalStyle';
import { initialState, appReducer } from './reducer/appReducer'
import AppContext from './context/AppContext';
import { LoginPage } from './components/LoginPage/LoginPage';
import { SignupPage } from './components/SignupPage/SignupPage';
import { RestaurantsListPage } from './components/RestaurantsListPage/RestaurantsListPage';
import { RestaurantItemPage } from './components/RestaurantItemPage/RestaurantItemPage';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { CartPage } from './components/CartPage/CartPage';

function App() {
  
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <div className="App">
      <GlobalStyle />
      <p>Labefood</p>
      <AppContext.Provider value={{ restaurantsList: state.restaurantsList, activeRestaurant: state.activeRestaurant, dispatch: dispatch }}>
        <BrowserRouter>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/signup' component={SignupPage} />
          <Route exact path='/' component={RestaurantsListPage} />
          <Route exact path='/restaurants/:id' component={RestaurantItemPage} />
          <Route exact path='/cart' component={CartPage} />
          <Route exact path='/profile' component={ProfilePage} />
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
