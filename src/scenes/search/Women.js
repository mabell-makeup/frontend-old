import React, {useContext} from "react"
import {ImageList} from "../../components/ImageList"
import {searchStore} from "../../stores/searchStore"


export const Women = () => {
  const {state: {searchResult}} = useContext(searchStore)

  return <ImageList data={searchResult} />
}