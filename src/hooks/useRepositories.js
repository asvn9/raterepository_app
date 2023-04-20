import { useQuery } from "@apollo/client"
import { GET_REPOSITORIESS } from "../graphql/queries"

const useRepositories = ({first,orderBy, orderDirection, searchKeyword}) => {
  const { loading, error, data, fetchMore, ...result } = useQuery(GET_REPOSITORIESS, {
    variables: {
      first,
      orderBy,
      orderDirection,
      searchKeyword
    },
    fetchPolicy: "cache-and-network",
  })

  const handleFetchMore = () => {
    const canFetchMore =  data?.repositories?.pageInfo?.hasNextPage
    console.log("fetch?")
    if (!canFetchMore) {
      return
    }
    console.log("fetching")
    fetchMore({
      variables: {
        after: data?.repositories?.pageInfo?.endCursor,
        orderBy,
        orderDirection,
        searchKeyword,
      },
    })
  }
  return {
    loading,
    error,
    fetchMore: handleFetchMore,
    repositories: data?.repositories?.edges?.map((edge) => edge.node),
    ...result
  }
}


export default useRepositories
