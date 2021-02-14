import * as ImagePicker from "expo-image-picker"
import AWS from "aws-sdk"
import config from "../../src/aws-exports"
import {Auth} from "aws-amplify"

export const pickImage = async (onPickSuccess=result=>result) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1
  })
  console.log("PickedImage", result)
  await onPickSuccess(result)
}

export const createS3Client = async () => {
  AWS.config.region = config.aws_project_region
  const credentials = await Auth.currentCredentials()
  return new AWS.S3({credentials: credentials, params: {Bucket: "mabell-app-img-storage"}})
}