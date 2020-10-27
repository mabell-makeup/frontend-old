import {gql, useQuery} from "@apollo/client"
import {mockRequest} from "../../mock"


export const apiRequest = (queryLiterals="") => {
  // eslint-disable-next-line no-undef
  if(process.env.NODE_ENV === "development") return mockRequest(queryLiterals)
  const query = gql(queryLiterals)
  return useQuery(query)
}
