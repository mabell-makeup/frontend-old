import React from "react"
import {Searchbar} from "react-native-paper"

const styles = {
  input: {
    width: "100%",
    height: "80%",
    elevation: 0, // 影を削除
    maxHeight: 50,
    top: 5,
    backgroundColor: "rgba(0, 0, 0, 0)"
  }
}


export const SearchInput = ({onChangeText, onSubmitEditing, isFocused=false, ...props}) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      style={styles.input}
      autoFocus={isFocused}
      {...props}
    />
  )
}
