import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'components/Main';
import Original from 'components/Original';
import Login from 'components/Login';
import NotFound from 'components/NotFound';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import activities from 'reducers/activities';
import user from 'reducers/user';
import originals from 'reducers/originals';


const reducer = combineReducers({
  user: user.reducer,
  activities: activities.reducer,
  originals: originals.reducer
});
const store = configureStore({reducer});
export const App = () => {
  return (
    
     <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/original' element={<Original/>}></Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
