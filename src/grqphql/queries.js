import {gql, useMutation} from '@apollo/client'


export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!){
    authenticate(credentials: $credentials){
      accessToken
    }
  }
`


export const GET_REPOSITORIES = gql `
    query Edges {
    repositories {
      edges {
        node {
          fullName
          ownerAvatarUrl
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
        }
      }
    }
  }`

  export const ME = gql `
  query{
  me {
    id
    username
  }
}`