import { FlatList, View, StyleSheet, Pressable, ScrollView } from "react-native"
import {format} from 'date-fns'
import RepositoryItem from "./RepositoryItem"
import useRepositories from "../hooks/useRepositories"
import { Route, Routes, Navigate, useNavigate, useParams } from "react-router-native"
import { GET_REPO, GET_REVIEWS } from "../grqphql/queries"
import { useQuery } from "@apollo/client"
import Text from "./Text"
import styles from "./styles"
import React from "react"

export const ReviewItem = ({ review, username }) => {

    return (
  <View style={styles.reviewDetails}>
    <View style={styles.ratingContainer}>
      <Text style={styles.rating}>{review.node.rating}</Text>
    </View>
    <View style={styles.textContainer}>
      <View >
        <Text fontWeight='bold' style={styles.username}>{review.node.user.username}</Text>
      </View>
      <View >
        <Text style={styles.username}>{format(new Date(review.node.createdAt), 'MMM d, yyyy')}</Text>
      </View>
      <Text style={styles.reviewText}>{review.node.text}</Text>
    </View>
  </View>
  
    );
  };


export const RepositoryDetail = () => {
    const { id } = useParams();
    console.log(id)
    const { loading, error, data, fetchMore } = useQuery(GET_REPO, {
      variables: { id },
      first:4,
      fetchPolicy: 'cache-and-network'
    });
  
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error :(</Text>;
    const onEndReach = () => {
      console.log('You have reached the end of the list.')
        fetchMore();
      
    }
  
  
    const { repository } = data;
    console.log(repository)
    const reviews = repository.reviews
    console.log(repository)
    const ItemSeparator = () => <View style={styles.separator} />
    return (
      <View>
        <RepositoryItem item={repository} showButton={true} />
  
        <FlatList
          data={reviews.edges}
          keyExtractor={(item) => item.node.id}
          renderItem={({ item }) => <ReviewItem review={item} />}
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={onEndReach}
          onEndReachedThreshold={0.20}
        />
        </View>
    );
  };

  export default RepositoryDetail