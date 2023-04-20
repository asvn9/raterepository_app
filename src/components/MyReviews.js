import { GET_CURRENT_USER, DELETE_REVIEW } from "../graphql/queries"
import { useQuery } from "@apollo/client"
import { ReviewItem } from "./RepositoryDetail"
import Text from "./Text"
import {View, ScrollView, TouchableOpacity, Linking, Alert} from "react-native"
import styles from "./styles"
import { useMutation } from "@apollo/client"


const MyReviews = () => {
  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
  })

  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [
      { query: GET_CURRENT_USER, variables: { includeReviews: true } },
    ],
  })

  if (loading) return <Text>loading...</Text>
  if (error) return <Text>Error:</Text>

  const handleUrlClick = (value) => {
    Linking.openURL(value)
  }

  const handleDeletion = (value) => {
    console.log(value)
    deleteReview({
      variables: { deleteReviewId: value },
    })
      .then(() => {
        refetch()
      })
      .catch((error) => console.error(error))
  }

  return (
    <ScrollView>
      {data.me.reviews && (
        <View>
          {data.me.reviews.edges.map((edge) => (
            <View key={edge.node.id}>
              <Text style={styles.title}>{edge.node.repository.ownerName}</Text>
              <ReviewItem review={edge} />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => handleUrlClick(edge.node.repository.url)}
                >
                  <Text style={styles.calculateButton}>View repository</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Confirmation",
                      "Are you sure you want to delete this review?",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "OK",
                          onPress: () => handleDeletion(edge.node.id),
                        },
                      ],
                      { cancelable: false }
                    )
                  }
                >
                  <Text style={styles.calculateButton}>Delete review</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}

export default MyReviews
