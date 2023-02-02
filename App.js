import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PreLoginNavigation from "./navigation/preLogin/PreLoginNavigation";
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import useTheme from "./hooks/useTheme";
import InAppNavigation from "./navigation/inApp/InAppNavigation";

export default function App() {
    const theme = useTheme();
  return (
      <PaperProvider theme={theme}>
              {/*<PreLoginNavigation />*/}
              {/*<PreLoginNavigation />*/}
          <InAppNavigation />
      </PaperProvider>
  );
}
