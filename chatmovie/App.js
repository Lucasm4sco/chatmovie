import { useState, useEffect } from 'react';
import { useWindowDimensions, View } from 'react-native';
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
import SearchMoviesScreen from './src/screens/SearchMoviesScreen';
import EditProfileScreen from './src/screens/PerfilScreens/EditPerfilScreen';
import UsersScreen from './src/screens/UsersScreen';
import UserProfileScreen from './src/screens/PerfilScreens/UserProfileScreen';

import TabNavigatorComponent from './src/components/TabNavigatorComponent';
import HeaderTabNavigator from './src/components/HeaderTabNavigator';
import AuthenticateUser from './src/components/AuthenticateUser';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const RenderNavigator = ({ children, auth }) => {
  const { height } = useWindowDimensions();

  return (
    <View style={{ height }}>
      <Tab.Navigator
        screenOptions={{
          header: props => <HeaderTabNavigator {...props} auth={auth} />
        }}
        tabBar={props => <TabNavigatorComponent {...props} auth={auth} />}
      >
        {children}
      </Tab.Navigator>
    </View>
  )
}

const TabsNavigator = () => {
  const { auth } = useAuth();

  if (auth)
    return (
      <RenderNavigator auth={auth}>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Add' component={UsersScreen} />
        <Tab.Screen name='Authenticate' component={AuthenticateUser} />
        <Tab.Screen name='Messages' component={HomeScreen} />
      </RenderNavigator>
    )

  return (
    <RenderNavigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Authenticate' component={AuthenticateUser} />
    </RenderNavigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='Main'
      >
        <Stack.Screen name='Main' component={TabsNavigator} />
        <Stack.Screen name='MovieDetails' component={MovieDetailsScreen} />
        <Stack.Screen name='Search' component={SearchMoviesScreen} />
        <Stack.Screen name='EditProfile' component={EditProfileScreen} />
        <Stack.Screen name='UserProfile' component={UserProfileScreen} />
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