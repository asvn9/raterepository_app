import { StatusBar } from "expo-status-bar"
import React from "react"
import { NativeRouter } from "react-router-native"
import Main from "./src/components/Main"
import { View } from "react-native"

const App = () => {
  return (
    <NativeRouter>
      <View>
        <Main />
        <StatusBar style="auto" />
      </View>
    </NativeRouter>
  )
}

export default App
