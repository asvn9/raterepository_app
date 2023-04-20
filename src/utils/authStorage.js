import AsyncStorage from "@react-native-async-storage/async-storage"

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`)
    const parsedToken = JSON.stringify(token)
    return parsedToken ? JSON.parse(parsedToken) : null
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken)
    } catch (e) {
      console.error("Failed to save access token to storage", e)
    }
  }

  async removeAccessToken() {
    console.log("removeAccessToken called")
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`)
    } catch (e) {
      console.error("Failed to remove access token from storage", e)
    }
  }
}
export default AuthStorage
