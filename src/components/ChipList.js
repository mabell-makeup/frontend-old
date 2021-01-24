import React from "react"
import {View, TouchableOpacity} from "react-native"
import {Text, Checkbox} from "react-native-paper"

// eslint-disable-next-line max-lines-per-function
const createStyles = (hasLeft, selected) => ({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    marginVertical: 2
  },
  chip: {
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 6,
    minWidth: 40,
    height: 28,
    borderWidth: 0.5,
    borderRadius: 50,
    borderColor: "#ccc",
    backgroundColor: selected ? "#ddd" : "#fff"
  },
  chipText: {
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: hasLeft || selected ? 25 : 0
  },
  leftContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  leftItem: {
    position: "absolute",
    left: 0
  },
  checkbox: {
    position: "absolute",
    left: -8
  }
})


const Chip = ({selected=false, left=false, children="", checkboxProps, ...props}) => {
  const hasLeft = left !== false ? true : false // falseでないときはReact.Componentが入っている
  const styles = createStyles(hasLeft, selected)

  return (
    <TouchableOpacity style={styles.chip} {...props}>
      <View style={styles.leftContainer}>
        {hasLeft && <View style={styles.leftItem}>{left}</View>}
        {selected &&
          <View style={styles.checkbox}>
            <Checkbox
              status={selected ? "checked" : "unchecked"}
              color="#888"
              {...checkboxProps}
            />
          </View>}
      </View>
      <Text style={styles.chipText}>{children}</Text>
    </TouchableOpacity>
  )
}


export const ChipList = ({items=[{label: ""}], style}) => {
  const styles = createStyles()

  return (
    <View style={{...styles.row, ...style}}>
      {items.map(({label, ...props}) => <Chip key={label} {...props}>{label}</Chip>)}
    </View>
  )
}
