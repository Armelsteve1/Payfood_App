import React from 'react';
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import AppNavigator from './src/navigation/AppNavigator'


export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}