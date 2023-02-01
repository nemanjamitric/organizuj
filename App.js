import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./navigation/Navigation";

export default function App() {
  return (
      <View style={{backgroundColor: 'red', flex: 1}}>
        <Navigation />
      </View>
  );
}
