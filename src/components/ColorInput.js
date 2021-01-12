import React, {useContext} from "react"
import {View} from "react-native"
import {Checkbox} from "react-native-paper"
import {searchStore} from "../stores/searchStore"


const createStyles = ({color}) => ({
  checkbox: {
    backgroundColor: color,
    width: 40,
    height: 40,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    margin: 4
  }
})


// eslint-disable-next-line no-unused-vars
export const ColorInput = ({color, onPress=(dispatch, state, color)=>{}}) => {
  const {dispatch, state} = useContext(searchStore)
  const styles = createStyles({color})

  return (
    <View style={styles.checkbox}>
      <Checkbox
        status={color === state.tmpConditions.color ? "checked" : "unchecked"}
        onPress={onPress(dispatch, state, color)}
        color="#fff"
        width={40}
      />
    </View>
  )
}
