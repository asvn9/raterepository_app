import { FlatList, View, StyleSheet } from "react-native"
import RepositoryItem from "./RepositoryItem"
import useRepositories from "../hooks/useRepositories"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

export const RepositoryListContainer = ({ repositories }) => {
  const ItemSeparator = () => <View style={styles.separator} />
  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()

  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList
