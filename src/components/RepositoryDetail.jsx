import { FlatList, View } from "react-native"
import { format } from "date-fns"
import RepositoryItem from "./RepositoryItem"
import { useParams } from "react-router-native"
import { useQuery } from "@apollo/client"
import { GET_REPO } from "../graphql/queries"
import Text from "./Text"
import styles from "./styles"
import React from "react"

export const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewDetails}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.node.rating}</Text>
      </View>
      <View style={styles.textContainer}>
        <View>
          <Text fontWeight="bold" style={styles.username}>
            {review.node.user.username}
          </Text>
        </View>
        <View>
          <Text style={styles.username}>
            {format(new Date(review.node.createdAt), "MMM d, yyyy")}
          </Text>
        </View>
        <Text style={styles.reviewText}>{review.node.text}</Text>
      </View>
    </View>
  )
}

export const RepositoryDetail = () => {
  const { id } = useParams()
  const { loading, error, data, fetchMore } = useQuery(GET_REPO, {
    variables: { id, first: 4 },
    fetchPolicy: "cache-and-network",
  })

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error :(</Text>

  const onEndReach = () => {
    const canFetchMore = data?.repository?.reviews.pageInfo?.hasNextPage

    if (canFetchMore) {
      fetchMore({
        variables: {
          after: data.repository.reviews.pageInfo.endCursor,
        },
      })
    } else {
      console.log("You have reached the end of the list.")
    }
  }

  const { repository } = data
  const reviews = repository.reviews
  const ItemSeparator = () => <View style={styles.separator} />
  
  return (
    <View style={{ marginBottom: 10 }}>
      <RepositoryItem item={repository} showButton={true} />

      <FlatList
        data={reviews.edges}
        keyExtractor={(item) => item.node.id}
        renderItem={({ item }) => <ReviewItem review={item} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        scrollEnabled={true}
      />
    </View>
  )
}

export default RepositoryDetail
