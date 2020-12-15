import {Auth} from "aws-amplify"

export const signup = async (username, password, email, nickname, gender, birthdate) => {
  try {
    const {user} = await Auth.signUp({
      username,
      password,
      attributes: {
        email,
        nickname,
        gender,
        birthdate
      }
    })
    console.log("SIGNUP_USER:", user)
  } catch (error) {
    console.log("error signing up:", error)
  }
}