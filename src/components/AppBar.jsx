import { View, StyleSheet, Pressable, ScrollView } from "react-native"
import Constants from "expo-constants"
import { Link } from "react-router-native"
import { useApolloClient, useQuery } from "@apollo/client"
import { ME } from "../grqphql/queries"
import { useNavigate } from "react-router-native"
import Text from "./Text"
import { useAuthStorage } from "../hooks/useAuthStorage"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
    flexDirection: "row",
    alignItems: "center",
    // ...
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    marginLeft: 20,
  },
  tabContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
})

const AppBar = () => {
  const { loading, error, data } = useQuery(ME)
  const authStorage = useAuthStorage()
  const navigate = useNavigate()
  const apolloClient = useApolloClient()

  const signOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
    navigate("/signin")
  }

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    console.log(error)
  }

  const loggedIn = data && data.me

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabContainer}>
        <Link to="/">
          <Text style={styles.title}>Repositories</Text>
        </Link>

        {loggedIn ? (
          <Pressable onPress={signOut}>
            <Text style={styles.title}>Sign Out</Text>
          </Pressable>
        ) : (
          <Link to="/signin">
            <Text style={styles.title}>Sign In</Text>
          </Link>
        )}
                {!loggedIn && (
        <Link to="/signup">
          <Text style={styles.title}>Sign up</Text>
        </Link>
      )}
                <Link to="/createreview">
          <Text style={styles.title}>Create a review</Text>
        </Link>
        {loggedIn && (
        <Link to="/myreviews">
          <Text style={styles.title}>My reviews</Text>
        </Link>
      )}
      </ScrollView>
    </View>
  )
}
export default AppBar
