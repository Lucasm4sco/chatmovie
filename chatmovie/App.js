import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useAuth } from './src/hooks/useAuth';
import { useChooseWithNetworkStatus } from './src/hooks/useChooseWithNetworkStatus';

import { Provider } from 'react-redux';
import store from './src/store';

import SplashScreen from './src/screens/SplashScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import WithoutConnectionScreen from './src/screens/WithoutConnectionScreen';

const App = () => {
  return <>
    <StatusBar style='light' />
  </>
}

const StartingApp = () => {
  const [finishedAnimSplashScreen, setFinishedAnimSplashScreen] = useState(false);
  const [fontsLoaded] = useFonts({
    'Acme': require('./src/assets/fonts/Acme-Regular.ttf')
  });

  const { loading } = useAuth();
  const CurrentComponentAplication = useChooseWithNetworkStatus(App, WithoutConnectionScreen, LoadingScreen, true);

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