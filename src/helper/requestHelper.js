import {gql, useQuery} from "@apollo/client"
import {mockRequest} from "../../mock"
import Constants from "expo-constants"


export const apiRequest = (queryLiterals="") => {
  // eslint-disable-next-line no-undef
  if(Constants.manifest.extra.env !== "production") return mockRequest(queryLiterals)
  const query = gql(queryLiterals)
  return useQuery(query)
}
