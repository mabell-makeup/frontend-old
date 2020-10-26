export const filterPostsByUserName = `
{
  post(user_name: user1) {
    img_src
    user_name
  }
}
`