import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as ReduxProvider} from 'react-redux';
import HomeScreen from './src/HomeScreen';
import PostsScreen from './src/PostsScreen';
import store from './store/store';
const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Posts" component={PostsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}

export default App;
