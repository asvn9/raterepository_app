import Text from "./Text"
import FormikTextInput from "./FormikTextInput"
import { View, StyleSheet, Pressable, TouchableOpacity } from "react-native"
import { Formik, isValid, isSubmitting } from "formik"
import * as yup from "yup"

const styles = StyleSheet.create({
  calculateButton: {
    backgroundColor: "blue",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    marginTop: 10,
  },
})

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

const SignIn = ({ onSubmit }) => {
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
