import {gql, useQuery} from "@apollo/client"

export const apiRequest = (queryLiterals="") => {
  // eslint-disable-next-line no-undef
  if(process.env.NODE_ENV === "development") return mockRequest(queryLiterals)
  const query = gql(queryLiterals)
  return useQuery(query)
}

const mockRequest = (queryLiterals="") => mockResponse


const mockResponse = {
  data: {
    posts: [
      {
        __typename: "Post",
        img_src: "./user1/1.png",
        user_name: "user1"
      },
      {
        __typename: "Post",
        img_src: "./user2/1.png",
        user_name: "user2"
      }
    ]
  },
  error: undefined,
  loading: false
}