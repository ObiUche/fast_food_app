import {SplashScreen, Stack} from "expo-router";
import './globals.css';
import { useFonts } from "expo-font";
import {useEffect} from "react";
import * as Sentry from '@sentry/react-native';
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: 'https://99776db565c1d468cb4b2a6d77d8dfe3@o4509782006759424.ingest.de.sentry.io/4509782023471184',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});



export default Sentry.wrap(function RootLayout() {

  const { isLoading, fetchAuthenticatedUser } = useAuthStore();
  const [fontsLoaded, error ] = useFonts({
  "Quicksand-Bold": require('../assets/fonts/Quicksand-Bold.ttf'),
    "Quicksand-Light": require('../assets/fonts/Quicksand-Light.ttf'),
    "Quicksand-Medium": require('../assets/fonts/Quicksand-Medium.ttf'),
    "Quicksand-Regular": require('../assets/fonts/Quicksand-Regular.ttf'),
    "Quicksand-SemiBold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
  });

useEffect( () => {
if(error) throw error;
if(fontsLoaded) SplashScreen.hideAsync();
}, [fontsLoaded, error]);

useEffect (()=> {
  fetchAuthenticatedUser();
}, [])

  if(!fontsLoaded || isLoading) return null;

  return <Stack screenOptions ={{ headerShown: false }}/>;

});