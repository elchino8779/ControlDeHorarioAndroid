import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Page from './components/Page';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Page />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
