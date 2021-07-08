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
    flex: 9,
    height: "100%",
    paddingRight: 10,
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "center"
  },
  icon: {
    flex: 1,
    marginVertical: 0
  }
}


export const IconTextInput = ({icon="magnify", onChangeText, onSubmitEditing, isFocused=false, containerStyle, ...props}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <IconButton icon={icon} style={styles.icon} />
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
