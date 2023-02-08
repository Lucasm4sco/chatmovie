import { useFonts } from 'expo-font'

import SplashScreen from './src/screens/SplashScreen';


export default () => {
  const [fontsLoaded] = useFonts({
    'Acme': require('./src/assets/fonts/Acme-Regular.ttf'),
  });

  return <SplashScreen fontsLoaded={fontsLoaded} />
}