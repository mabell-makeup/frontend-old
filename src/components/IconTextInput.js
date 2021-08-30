import React from "react"
import {IconButton} from "react-native-paper"
import {TextInput, View} from "react-native"
import {WINDOW_WIDTH} from "../styles/constants"


const createStyles = (hasIcon=false) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: WINDOW_WIDTH * 0.8,
    height: 35,
    backgroundColor: "#eee",
    borderRadius: 18
  },
  input: {
    flex: 9,
    height: "100%",
    paddingRight: 10,
    marginLeft: hasIcon ? 0 : 15,
    backgroundColor: "rgba(0, 0, 0, 0)",
    justifyContent: "center"
  },
  icon: {
    flex: 1,
    marginVertical: 0
  }
})


export const IconTextInput = ({icon="magnify", onChangeText, onSubmitEditing, isFocused=false, containerStyle, ...props}) => {
  const hasIcon = icon !== ""
  const styles = createStyles(hasIcon)
  return (
    <View style={[styles.container, containerStyle]}>
      {hasIcon && <IconButton icon={icon} style={styles.icon} />}
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
