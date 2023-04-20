import { FlatList, View, Pressable } from "react-native"
import RepositoryItem from "./RepositoryItem"
import useRepositories from "../hooks/useRepositories"
import { useNavigate } from "react-router-native"
import styles from "./styles"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import { Searchbar } from "react-native-paper"
import { useDebounce } from "use-debounce"

export const RepositoryItemContainer = ({ item }) => {
  const navigate = useNavigate()

  const handlePress = () => {
    navigate(`/${item.id}`)
  }

  return (
    <Pressable onPress={handlePress}>
      <RepositoryItem item={item} />
    </Pressable>
  )
}

export const RepositoryListContainer = ({ repositories, onEndReach }) => {
  const ItemSeparator = () => <View style={styles.separator} />
  return (
    <View style={{ marginBottom: 200 }}>
      <FlatList
        data={repositories}
        renderItem={({ item }) => <RepositoryItemContainer item={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.2}
        scrollEnabled={true}
      />
    </View>
  )
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT")
  const [orderDirection, setOrderDirection] = useState("ASC")
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery] = useDebounce(searchQuery, 500)

  const onChangeSearch = (query) => setSearchQuery(query)

  const { repositories, fetchMore } = useRepositories({
    first: 5,
    searchKeyword: debouncedQuery,
    orderBy: orderBy,
    orderDirection: orderDirection,
    debouncedQuery: debouncedQuery,
  })

  const handleOrderByChange = (value) => {
    if (value === "RATING_DESC") {
      setOrderDirection("DESC")
      setOrderBy("RATING_AVERAGE")
    } else if (value === "RATING_ASC") {
      setOrderDirection("ASC")
      setOrderBy("RATING_AVERAGE")
    } else {
      setOrderDirection("ASC")
      setOrderBy("CREATED_AT")
    }
  }

  const onEndReach = () => {
    console.log("You have reached the end of the list.")
    fetchMore()
  }

  return (
    <View>
      <Picker
        selectedValue={orderBy}
        onValueChange={handleOrderByChange}
        style={styles.picker}
        prompt="Select the order method"
      >
        <Picker.Item label="Highest rated" value="RATING_DESC" />
        <Picker.Item label="Lowest rated" value="RATING_ASC" />
        <Picker.Item label="Most recent" value="CREATED_AT" />
      </Picker>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <RepositoryListContainer
        repositories={repositories}
        onEndReach={onEndReach}
      />
    </View>
  )
}

export default RepositoryList
