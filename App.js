import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PreLoginNavigation from "./navigation/preLogin/PreLoginNavigation";
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
  return (
      <PaperProvider>
          <View style={{backgroundColor: 'red', flex: 1}}>
              <PreLoginNavigation />
          </View>
      </PaperProvider>
  );
}
