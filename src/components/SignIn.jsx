import Text from "./Text"
import FormikTextInput from "./FormikTextInput"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Formik } from "formik"
import * as yup from "yup"
import useSignIn from "../hooks/useSignIn"
import AuthStorage from "../utils/authStorage"
import { useNavigate } from "react-router-native"
import styles from "./styles"

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password has to be at least 6 characters")
    .required("Password is required"),
})

const SignIn = () => {
  const [signIn, result] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await signIn({ username, password })
      navigate("/")
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, isSubmitting }) => (
        <View>
          <FormikTextInput name="username" label="Username" />
          <FormikTextInput name="password" label="Password" />
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!isValid || isSubmitting}
          >
            <Text style={styles.calculateButton}>Log in</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )
}

export default SignIn
