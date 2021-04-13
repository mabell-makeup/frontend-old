import React, {useState} from "react"
import {Text, StyleSheet} from "react-native"

const styles = StyleSheet.create({
  text: {
    lineHeight: 30
  },
  readMore: {
    color: "#999",
    lineHeight: 30
  }
})

export const TextWithReadMore = ({text, style, maxLineCount}) => {
  const onTextLayout = ({nativeEvent: {lines}}) => {
    if (typeof lineCount === "undefined"){
      setLineCount(lines.length)
      setIsExpanded(false)
    }
  }
  const [lineCount, setLineCount] = useState()
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <>
      <Text style={{...styles.text, ...style}} numberOfLines={isExpanded ? undefined : maxLineCount} onTextLayout={onTextLayout}>{text}</Text>
      {lineCount > maxLineCount && !isExpanded && <Text style={styles.readMore} onPress={() => setIsExpanded(true)}>続きを見る</Text>}
    </>
  )
}