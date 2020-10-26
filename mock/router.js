import * as querys from "./querys"
const q = Object.entries(querys).flatMap(([key, query]) => ({[key]: query.replace(" ", "")}))[0]

export const router = {
  [q.filterPostsByUserName]: {
    posts: [
      {
        __typename: "Post",
        img_src: "./user1/1.png",
        user_name: "user1"
      },
      {
        __typename: "Post",
        img_src: "./user2/1.png",
        user_name: "user2"
      }
    ]
  }
}