import { StyleSheet, View } from "react-native"
import { Route, Routes, Navigate } from "react-router-native"
import SignIn from "./SignIn"
import RepositoryList from "./RepositoryList"
import AppBar from "./AppBar"
import { RepositoryDetail } from "./RepositoryDetail"
import CreateReview from './CreateReview'
import SignUp from './SignUp'
import MyReviews from './MyReviews'


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/:id" element={<RepositoryDetail />} />
        <Route path="/createreview" element={<CreateReview />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="myreviews" element = {<MyReviews />} />
      </Routes>
    </View>
  )
}

export default Main
