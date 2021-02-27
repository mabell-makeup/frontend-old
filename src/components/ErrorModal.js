import React, {useContext} from "react"
import {View} from "react-native"
import {Button, Paragraph, Dialog, Portal} from "react-native-paper"
import {appStore, clearError} from "../stores/appStore"

export const ErrorModal = () => {
  const {dispatch, state: {error}} = useContext(appStore)

  return (
    <View>
      <Portal>
        <Dialog visible={error.errorType} onDismiss={() => clearError(dispatch)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{error.message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => clearError(dispatch)}>閉じる</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}
