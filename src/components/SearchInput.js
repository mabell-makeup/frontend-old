import React, {useRef, useEffect} from "react"
import {Searchbar} from "react-native-paper"

const styles = {
  input: {
    width: "100%",
    height: "80%",
    elevation: 0, // 影を削除
    top: 5
  }
}


export const SearchInput = ({onChangeText, onSubmitEditing, isFocused, ...props}) => {
  const ref = useRef()
  useEffect(() => {
    isFocused && ref.current.focus()
  }, [])

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      style={styles.input}
      ref={ref}
      {...props}
    />
  )
}
