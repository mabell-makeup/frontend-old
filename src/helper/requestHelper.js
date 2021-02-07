import {mockRequest} from "../../mock"
import Constants from "expo-constants"
import {API, graphqlOperation} from "aws-amplify"


export const apiRequest = async (queryLiterals="", params={}, needParse=false, parseTarget="") => {
  if(Constants.manifest.extra.env !== "production") return mockRequest(queryLiterals)
  try {
    const response = await API.graphql(graphqlOperation(queryLiterals, params))
    const data = needParse
      ? Object.fromEntries(Object.entries(response.data[parseTarget]).map(([key, value]) => [key, JSON.parse(value)]))
      : response.data
    return data
  } catch (e) {
    console.log("error fetching", e)
  }
}
