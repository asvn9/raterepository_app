import { AUTHENTICATE } from "../grqphql/queries"
import { useMutation } from "@apollo/client"
import { useAuthStorage } from "./useAuthStorage"
import { useApolloClient } from "@apollo/client"

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE)
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    })
    await authStorage.setAccessToken(data.authenticate.accessToken)
    console.log(apolloClient.cache.extract())
    apolloClient.resetStore()
  }
  console.log(apolloClient.cache.extract())
  return [signIn, result]
}

export default useSignIn
