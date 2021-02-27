import {Alert, Linking} from "react-native"

export const openContactPage = async (name="", mail="") => {
  const supported = await Linking.canOpenURL(`https://docs.google.com/forms/d/e/1FAIpQLSfPXxKkNNBnOj1H6R6_YRTMlG7G30J5tzxq9Zg-UOG4gs2ybA/viewform?usp=pp_url&entry.2005620554=${name}&entry.1045781291=${mail}`)
  if (supported) {
    await Linking.openURL(`https://docs.google.com/forms/d/e/1FAIpQLSfPXxKkNNBnOj1H6R6_YRTMlG7G30J5tzxq9Zg-UOG4gs2ybA/viewform?usp=pp_url&entry.2005620554=${name}&entry.1045781291=${mail}`)
  } else {
    Alert.alert(
      "Error",
      "ページを開けませんでした",
      [{text: "閉じる"}],
      {cancelable: false}
    )
  }
}

export const openReportInappropriateContentPage = async (post_id) => {
  const supported = await Linking.canOpenURL(`https://docs.google.com/forms/d/e/1FAIpQLSdK7ioFpUb-dAnxuZtnYMNeZI9air8J_aP18omlH7is9T6MhQ/viewform?usp=pp_url&entry.2005620554=${post_id}`)
  if (supported) {
    await Linking.openURL(`https://docs.google.com/forms/d/e/1FAIpQLSdK7ioFpUb-dAnxuZtnYMNeZI9air8J_aP18omlH7is9T6MhQ/viewform?usp=pp_url&entry.2005620554=${post_id}`)
  } else {
    Alert.alert(
      "Error",
      "ページを開けませんでした",
      [{text: "閉じる"}],
      {cancelable: false}
    )
  }
}