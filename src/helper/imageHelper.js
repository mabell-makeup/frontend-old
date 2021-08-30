import * as ImagePicker from "expo-image-picker"
import * as ImageManipulator from "expo-image-manipulator"

export const pickImage = async (onPickSuccess=result=>result, onCancel=()=>{}) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
    base64: true
  })
  return !result.cancelled ? onPickSuccess(result) : onCancel()
}

export const compressImage = async (imgSrc, compressRate=1, resize) => {
  try {
    const compressed = await ImageManipulator.manipulateAsync(imgSrc, resize ? [{resize}] : [], {compress: compressRate, base64: true})
    return compressed.base64
  } catch (error) {
    console.log("upload image error:", error)
    throw error
  }
}