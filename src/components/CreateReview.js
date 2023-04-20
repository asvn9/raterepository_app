import { useState } from "react"
import Text from "./Text"
import FormikTextInput from "./FormikTextInput"
import { View, TouchableOpacity } from "react-native"
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-native"
import styles from "./styles"
import { useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/queries"

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required("Owner name is required")
    .test('required', 'Owner name is required', function(value) {
        return value ? true : false
      }),
  repositoryName: yup
    .string()
    .required("Repository name is required")
    .test('required', 'Repository name is required', function(value) {
        return value ? true : false
      }),
    rating: yup
    .number()
    .min(1, "Value must be greater than or equal to 1")
    .max(100, "Value must be less than or equal to 100")
    .required("Rating is required"),
    text: yup
    .string()
})

const CreateReview = () => {
  const navigate = useNavigate()
  const [createReview] = useMutation(CREATE_REVIEW)
  const [error, setError] = useState(null)

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values
    try {
       const {data} = await createReview({
            variables: {
                review:{
                    ownerName,
                    repositoryName,
                    rating: parseInt(rating),
                    text
                }
            }
        })
   
        const firstPart = data.createReview.id.split(".")[1]
        const secondPart = data.createReview.id.split(".")[2]
        const repoId = firstPart + "." + secondPart
   
      navigate(`/${repoId}`)
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
      initialValues={{ ownerName: "", repositoryName: "", rating: "", text: "" }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, isSubmitting }) => (
        <View>
          <FormikTextInput name="ownerName" label="Repository owner" />
          <FormikTextInput name="repositoryName" label="Repository name" />
          <FormikTextInput name="rating" label="Rating" />
          <FormikTextInput name="text" label="Review" />
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!isValid || isSubmitting}
          >
            <Text style={styles.calculateButton}>Create a review</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  </View>
)
}

export default CreateReview