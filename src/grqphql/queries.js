import {gql, useMutation} from '@apollo/client'


export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!){
    authenticate(credentials: $credentials){
      accessToken
    }
  }
`

export const DELETE_REVIEW = gql `
mutation DeleteReview($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)

}
`

export const GET_CURRENT_USER = gql `
query getCurrentUser($includeReviews: Boolean = true) {
  me {
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          createdAt
          userId
          rating
          id
          text
          repository {
            ownerName
            url
          }
          user{
            username
          }
        }
      }
    }
  }
}
`

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      username
    }
  }
`

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      id
      rating
    }
  }
`

export const GET_REPO = gql`
query Repository($id: ID!, $first: Int, $after: String) {
  repository(id: $id) {
      id
      fullName
      ownerAvatarUrl
      description
      language
      ownerName
      name
      forksCount
      stargazersCount
      ratingAverage
      reviewCount
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`

export const GET_REPOSITORIES = gql `
query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          id
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

  export const GET_REVIEWS = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      reviews(first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            repositoryId
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;


  export const ME = gql `
  query{
  me {
    id
    username
  }
}`


export const GET_REPOSITORIESS = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      edges {
        node {
          id
          fullName
          ownerAvatarUrl
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
        }
        cursor
      }
      pageInfo{
        endCursor
        hasNextPage
      }
    }
  }
`;