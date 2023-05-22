/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Alert,
  BackHandler
} from 'react-native';
import MyWebView from './MyWebView';



const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.root}>
        <MyWebView 
          handleClose={()=>{
            Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
              {
                text: '아니오',
                onPress: () => null,
              },
              {text: '예', onPress: () => BackHandler.exitApp()},
            ]);
          }}/>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
});

export default App;