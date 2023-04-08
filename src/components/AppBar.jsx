import { View, StyleSheet, ScrollView } from "react-native"
import Constants from "expo-constants"
import { Link } from "react-router-native"

import Text from "./Text"

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabContainer}>
        <Link to="/">
          <Text style={styles.title}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.title}>Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  )
}

export default AppBar
