import {mockRequest} from "../../mock"
import Constants from "expo-constants"
import {API, graphqlOperation} from "aws-amplify"


export const apiRequest = async (queryLiterals="", params={}, needParse=false, parseTarget="") => {
  if(Constants.manifest.extra.env !== "production") return mockRequest(queryLiterals)
  console.log("Requested: ", graphqlOperation(queryLiterals, params))
  const response = await API.graphql(graphqlOperation(queryLiterals, params))
  const data = needParse
    ? Object.fromEntries(Object.entries(response.data[parseTarget]).map(([key, value]) => [key, JSON.parse(value)]))
    : response.data
  return data
}

export const parseMasterData = (masterData, target, type="list" || "object") => {
  const list = Object.entries(masterData[target]).map(([key, label]) => ({label, key: Number(key)}))
  const obj = list.reduce((obj, item) => ({...obj, [item.key]: item.label}), {})
  return type === "list" ? list : obj
}
export const camelToSnake = text => text.replace(/([A-Z])/g, s => "_" + s.charAt(0).toLowerCase())