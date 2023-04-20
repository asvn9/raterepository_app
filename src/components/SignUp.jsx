import Text from "./Text"
import FormikTextInput from "./FormikTextInput"
import { View, TouchableOpacity } from "react-native"
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-native"
import styles from "./styles"
import { CREATE_USER } from "../graphql/queries"
import { useMutation } from "@apollo/client"
import useSignIn from "../hooks/useSignIn"
import { useState } from "react"

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Username must be at least 3 characters")
    .max(30, "Username can be 30 characters maximum")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password has to be at least 5 characters")
    .max(50, "Password can't be more than 50 characters")
    .required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirm is required"),
})

const SignUp = () => {
  const navigate = useNavigate()
  const [createUser] = useMutation(CREATE_USER)
  const [signIn] = useSignIn()
  const [error, setError] = useState()
  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      })
      await signIn({ username, password })
      navigate("/")
    } catch (e) {
      console.log(e)
      setError(e.message)
    }
  }

  return (
    <View>
      {error && (
        <TouchableOpacity>
          <Text style={{ color: "red" }}>{error}</Text>
        </TouchableOpacity>
      )}

      <Formik
        initialValues={{ username: "", password: "", passwordConfirm: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isValid, isSubmitting }) => (
          <View>
            <FormikTextInput name="username" label="Username" />
            <FormikTextInput name="password" label="Password" />
            <FormikTextInput name="passwordConfirm" label="Confirm password" />
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid || isSubmitting}
            >
              <Text style={styles.calculateButton}>Sign up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  )
}

export default SignUp
