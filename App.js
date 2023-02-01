import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginNavigation from "./navigation/LoginNavigation";
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
  return (
      <PaperProvider>
          <View style={{backgroundColor: 'red', flex: 1}}>
              <LoginNavigation />
          </View>
      </PaperProvider>
  );
}
