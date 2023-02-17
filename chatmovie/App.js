import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useAuth } from './src/hooks/useAuth';
import { useChooseWithNetworkStatus } from './src/hooks/useChooseWithNetworkStatus';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import store from './src/store';

import SplashScreen from './src/screens/SplashScreen';
import WithoutConnectionScreen from './src/screens/WithoutConnectionScreen';
import HomeScreen from './src/screens/HomeScreen';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';

import TabNavigatorComponent from './src/components/TabNavigatorComponent';
import HeaderTabNavigator from './src/components/HeaderTabNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  const { auth } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={{
        header: props => <HeaderTabNavigator {...props} />
      }}
      tabBar={props => <TabNavigatorComponent {...props} auth={auth} />}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Add' component={HomeScreen} />
      <Tab.Screen name='Perfil' component={HomeScreen} />
      <Tab.Screen name='Messages' component={HomeScreen} />
    </Tab.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='Main'
      >
        <Stack.Screen name='Main' component={TabsNavigator} />
        <Stack.Screen name='MovieDetails' component={MovieDetailsScreen} />
        <Stack.Screen name='Search' component={SearchMoviesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const StartingApp = () => {
  const [finishedAnimSplashScreen, setFinishedAnimSplashScreen] = useState(false);
  const [fontsLoaded] = useFonts({
    'Acme': require('./src/assets/fonts/Acme-Regular.ttf')
  });

  const { loading } = useAuth();
  const CurrentComponentAplication = useChooseWithNetworkStatus(<App />, <WithoutConnectionScreen />);

  useEffect(() => {
    setTimeout(() => setFinishedAnimSplashScreen(true), 3000);
  }, []);

  if (!loading && finishedAnimSplashScreen)
    return CurrentComponentAplication

  return <SplashScreen fontsLoaded={fontsLoaded} />
}

export default () => (
  <Provider store={store}>
    <StartingApp />
  </Provider>
);