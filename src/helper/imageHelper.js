import * as ImagePicker from "expo-image-picker"
import AWS from "aws-sdk"
import config from "../aws-exports"
import {Auth} from "aws-amplify"
import "react-native-get-random-values"
import {v4 as uuidv4} from "uuid"

export const pickImage = async (onPickSuccess=result=>result, onCancel=()=>{}) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1
  })
  !result.cancelled ? onPickSuccess(result) : onCancel()
}

const createS3Client = async () => {
  AWS.config.region = config.aws_project_region
  const credentials = await Auth.currentCredentials()
  return new AWS.S3({credentials: credentials, params: {Bucket: "mabell-app-img-storage"}})
}

export const uploadImage = async imgSrc => {
  try {
    const s3Client = await createS3Client()
    const credentials = await Auth.currentCredentials()
    const fileExtension = imgSrc.match(/[^.]+$/)
    const fileName = `${uuidv4()}.${fileExtension}`
    const response = await fetch(imgSrc)
    const blob = await response.blob()
    s3Client.putObject({Key: `${credentials.identityId}/${fileName}`, ContentType: "image", Body: blob},
      (err, data) => data === null && console.log("Failed image upload:", err.stack)
    )
    return `https://${config.aws_user_files_s3_bucket}.s3-${config.aws_user_files_s3_bucket_region}.amazonaws.com/${credentials.identityId}/${fileName}`
  } catch (error) {
    console.log("upload image error:", error)
  }
}