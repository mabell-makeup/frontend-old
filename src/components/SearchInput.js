import React, {useState} from "react"
import {Searchbar} from "react-native-paper"

const styles = {
  input: {
    width: "100%",
    height: "90%",
    elevation: 0 // 影を削除
  }
}


export const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const onChangeSearch = query => setSearchQuery(query)

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={styles.input}
    />
  )
}
