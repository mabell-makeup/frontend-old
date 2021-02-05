import React from "react"
import {IconButton} from "react-native-paper"
import {TextInput, View} from "react-native"


const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#eee",
    borderRadius: 18
  },
  input: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "center"
  }
}


export const IconTextInput = ({icon="magnify", onChangeText, onSubmitEditing, isFocused=false, ...props}) => {
  return (
    <View style={styles.container}>
      <IconButton icon={icon} style={{marginVertical: 0}} />
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
