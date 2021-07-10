import React from "react"
import {useCallback} from "react"
import {Share} from "react-native"
import {IconButton} from "react-native-paper"


export const ShareButton = (props) => {
  const openShare = useCallback(() => {
    Share.share({...props}, {})
  }, [props])
  
  return <IconButton icon="export-variant" onPress={openShare} />
}
