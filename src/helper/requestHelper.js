import {Auth} from "aws-amplify"


export const apiRequest = async (queryLiterals="", params={}, needParse=false, parseTarget="") => {
  // console.log("Requested: ", graphqlOperation(queryLiterals, params))
  // const response = await API.graphql(graphqlOperation(queryLiterals, params))
  // const data = needParse
  //   ? Object.fromEntries(Object.entries(response.data[parseTarget]).map(([key, value]) => [key, JSON.parse(value)]))
  //   : response.data
  return {}
}

export const parseMasterData = (masterData, target, type="list" || "object") => {
  const list = Object.entries(masterData[target]).map(([key, label]) => ({label, key: Number(key)}))
  const obj = list.reduce((obj, item) => ({...obj, [item.key]: item.label}), {})
  return type === "list" ? list : obj
}
export const camelToSnake = text => text.replace(/([A-Z])/g, s => "_" + s.charAt(0).toLowerCase())

const base_url = "https://2re8ozjb1e.execute-api.ap-northeast-1.amazonaws.com/dev"
// const base_url = "http://192.168.3.4:3000"

export const apiRequest2 = async(url="/", options={method: "GET", data: undefined}) => {
  const user = await Auth.currentAuthenticatedUser()
  const idToken = user.signInUserSession.idToken.jwtToken
  const headers = {
    "Authorization": idToken,
    "Content-Type": "application/json"
  }
  const {method="GET", data} = options
  console.log("Requested: ", method, url, data)
  return fetch(base_url + url, {method, body: JSON.stringify(data), headers})
    .then(res => res.json())
    .then(data => {
      console.log(`Response [${method}]${url}: `, data)
      return data
    })
}

export const encodeQuery = (data={}) => {
  const queryList = Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  return queryList.join("&")
}
