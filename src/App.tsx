import React, { useContext } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Provider } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import {AuthProvider } from './context/AuthContext';
import MainNav from './Navigation/MainNav';
import { store } from './components/reducers/store';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function App(): JSX.Element {
  const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <Provider store={store}>
        <MainNav/>
      </Provider>
      </AuthProvider>
      </QueryClientProvider>

  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // alignItems:'center',
    // justifyContent:'center',
  },

});

export default App;
