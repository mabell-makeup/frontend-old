import React from "react"
import {IconButton} from "react-native-paper"
import {TextInput, View} from "react-native"


const styles = {
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 50,
    maxHeight: 35
  },
  input: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)"
  }
}


export const SearchInput = ({onChangeText, onSubmitEditing, isFocused=false, ...props}) => {
  return (
    <View style={styles.container}>
      <IconButton icon="magnify" />
      <TextInput
        placeholder="Search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        style={styles.input}
        autoFocus={isFocused}
        {...props}
      />
    </View>
  )
}
