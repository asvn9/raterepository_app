import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    flexGrwo: 1
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft:0,
    marginRight:0
  },
  calculateButton: {
    backgroundColor: "blue",
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
    padding: 20,
    borderRadius: 5,
    textAlign: "center",
    marginTop: 1,
    marginLeft: 10,
    marginRight: 10
  },
  calculateButton2: {
    backgroundColor: "blue",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    padding: 2,
    width:200,
    borderRadius: 5,
    textAlign: "center",
    marginTop: 2,
  },
  separator: {
    height: 10,
    paddingBottom:20
  },
  ratingContainer: {
    backgroundColor: 'white',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0077B6',
    borderWidth: 2
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    reviewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    reviewDetails: {
      flexDirection: 'column',
      marginLeft: 12,
      padding:20
    },
    reviewItem: {
      flexDirection: 1,
      flexDirection: 'column',
      marginBottom: 5,
    },
    username: {
      fontWeight: 'bold',
      marginBottom: 4,
    },
    reviewText: {
      marginBottom: 4,
    },
    createdAtText: {
      color: '#666666',
    },
    usernameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }
})

export default styles
