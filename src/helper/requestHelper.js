import {gql, useQuery} from "@apollo/client"
import {router} from "../../mock/router"

export const apiRequest = (queryLiterals="") => {
  // eslint-disable-next-line no-undef
  if(process.env.NODE_ENV === "development") return mockRequest(queryLiterals)
  const query = gql(queryLiterals)
  return useQuery(query)
}

const mockRequest = (queryLiterals="") => {
  console.log(queryLiterals)
  const formatedQueryLiterals = queryLiterals.replace(" ", "")
  
  return router[formatedQueryLiterals] ? {
    data: router[formatedQueryLiterals],
    error: undefined,
    loading: false
  } : {
    error: "Request Error: クエリがおかしい",
    loading: false
  }
}