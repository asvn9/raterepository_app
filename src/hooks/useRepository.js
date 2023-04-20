import { useQuery } from "@apollo/client"
import { GET_REPO } from "../graphql/queries"
import Text from "../components/Text"

const useRepository = ({ id, first, orderBy, orderDirection, searchKeyword }) => {
    const { loading, error, data, fetchMore } = useQuery(GET_REPO, {
      variables: { id, first, orderBy, orderDirection, searchKeyword },
      fetchPolicy: 'cache-and-network',
    })
  
    if (loading) return <Text>Loading...</Text>
    if (error) return <Text>Error :(</Text>
  
    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage
  
      if (!canFetchMore) {
        return
      }
  
      fetchMore({
        variables: {
          after: data?.repository?.reviews?.pageInfo?.endCursor,
          first,
          orderBy,
          orderDirection,
          searchKeyword,
        },
      })
    }
  
    return {
      loading,
      error,
      repository: data?.repository,
      fetchMore: handleFetchMore,
    }
  }

  export default useRepository
  