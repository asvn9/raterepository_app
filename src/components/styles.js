import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  description: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 14,
    color: "#666",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  info: {
    marginRight: 10,
    color: "black",
  },
  label: {
    width: 80,
    fontWeight: "bold",
  },
  lang: {
    marginRight: 10,
    color: "white",
    backgroundColor: "blue",
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
})

export default styles
