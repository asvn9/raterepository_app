import { StatusBar } from "expo-status-bar"
import React from "react"
import { NativeRouter } from "react-router-native"
import Main from "./src/components/Main"
import { View } from "react-native"
import { ApolloProvider } from "@apollo/client"
import createApolloClient from './src/utils/apolloClient'
import AuthStorage from "./src/utils/authStorage"
import AuthStorageContext from './src/hooks/useAuthStorage'

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const App = () => {
  return (
    <NativeRouter>
      <View>
        <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
          <Main />
          </AuthStorageContext.Provider>
          </ApolloProvider>
        <StatusBar style="auto" />
      </View>
    </NativeRouter>
  )
}

export default App
