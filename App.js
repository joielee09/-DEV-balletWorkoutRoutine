import React from 'react';
import Stack from "./navigation/Stack";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import { store } from "./Store";

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
    <Stack />
    </NavigationContainer>
    </Provider>
  );
}

export default App;