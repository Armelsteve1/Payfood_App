import React from 'react';
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
// import AppNavigator from './src/navigation/AppNavigator'
import HomeNavigator from './src/navigation/HomeNavigator';

export default function App() {
  return (
    <Provider store={store}>
      {/* <AppNavigator /> */}
      <HomeNavigator/>
    </Provider>
  );
}