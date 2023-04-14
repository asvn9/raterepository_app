import { useQuery } from "@apollo/client"
import { GET_REPOSITORIES } from "../grqphql/queries"
import Text from "../components/Text"

const useRepositories = () => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  })

  if (loading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  const repositories = data.repositories.edges.map((edge) => edge.node)
  return { repositories }
}

export default useRepositories
