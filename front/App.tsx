import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { ActionType, createAction, createReducer } from 'typesafe-actions';

enum HomeActionType {
  FETCH_NAME = 'home/FETCH_NAME',
  SET_NAME = 'home/SET_NAME',
}

const actions = {
  fetchName: createAction(HomeActionType.FETCH_NAME)(),
  setName: createAction(HomeActionType.SET_NAME)<string>(),
};

type Home = {
  name: string;
  count: number;
}
const init: Home = {
  name: '한양',
  count: 0,
};
const store = createStore(createReducer<Home, ActionType<typeof actions>>(init, {
  [HomeActionType.SET_NAME]: (state, action) => ({
    ...state,
    name: action.payload,
  })
}));

const App = () =>
  <Provider store={store}>
    <div>
      test page....~~ssssdfsf
    </div>
    ;
  </Provider>;


export default App;
