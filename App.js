/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { TouchableOpacity, View, Text, SafeAreaView, ScrollView, StatusBar, useColorScheme } from 'react-native'
import { Colors, Header } from 'react-native/Libraries/NewAppScreen'

function App() {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  // 播放掃描成功的聲音


  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
