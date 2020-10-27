import {router} from "./router"


export const mockRequest = (queryLiterals="") => {
  const formatedQueryLiterals = queryLiterals.replace(/\s/g, "")
  const response = router.filter(route => route[0].test(formatedQueryLiterals))

  return response.length > 0 ? {
    data: response[0][1],
    error: undefined,
    loading: false
  } : {
    error: "Request Error: クエリがおかしい",
    loading: false
  }
}