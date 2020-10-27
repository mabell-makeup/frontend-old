import {router} from "./router"

const handleError = formatedQueryLiterals => {
  console.log("Error Query:", formatedQueryLiterals)

  return {
    error: "Request Error: クエリがおかしい",
    loading: false
  }
}

export const mockRequest = (queryLiterals="") => {
  const formatedQueryLiterals = queryLiterals.replace(/\s/g, "")
  const response = router.filter(route => route[0].test(formatedQueryLiterals))

  return response.length > 0
    ? {
      data: response[0][1],
      error: undefined,
      loading: false
    }
    : handleError(formatedQueryLiterals)
}