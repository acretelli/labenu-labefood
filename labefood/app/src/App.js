import React, { useReducer } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { GlobalStyle } from './styles/globalStyle';
import { initialState, appReducer } from './reducer/appReducer'
import AppContext from './context/AppContext';
import { HomeAnimation } from './components/HomeAnimation/HomeAnimation';
import { LoginPage } from './components/LoginPage/LoginPage';
import { SignupPage } from './components/SignupPage/SignupPage';
import { RestaurantsListPage } from './components/RestaurantsListPage/RestaurantsListPage';
import { RestaurantItemPage } from './components/RestaurantItemPage/RestaurantItemPage';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { CartPage } from './components/CartPage/CartPage';
import { ErrorPage } from './components/ErrorPage/ErrorPage';

function App() {
  
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <div className="App">
      <GlobalStyle />
      <AppContext.Provider value={{ restaurantsList: state.restaurantsList, activeRestaurant: state.activeRestaurant, profile: state.profile, count: state.count, cart: state.cart, dispatch: dispatch }}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <HomeAnimation />
            </Route>
            <Route exact path='/login'>
              <LoginPage />
            </Route>
            <Route exact path='/signup'>
              <SignupPage />
            </Route>
            <Route exact path='/restaurants'>
              <RestaurantsListPage />
            </Route>
            <Route exact path='/restaurants/:id'>
              <RestaurantItemPage />
            </Route>
            <Route exact path='/cart'>
              <CartPage />
            </Route>
            <Route exact path='/profile'>
              <ProfilePage />
            </Route>
            <Route path='/'>
              <ErrorPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
