import * as q from "./querys"

export const router = [
  [q.filterPostsByUserName,
    {
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
  ]
]