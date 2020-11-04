import * as q from "./querys"
import * as db from "./db"

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
  ],
  [q.getSuggestionItems,
    {
      suggestionItems: db.items.slice(0, 20).map(item => ({item_id: item.item_id, brand_name: item.brand_name, item_name: item.item_name}))
    }
  ],
  [q.getPostsByConditions,
    {
      posts: [
        {
          __typename: "Post",
          post_id: 1,
          thumbnail_img_src: "./user1/1.jpg"
        },
        {
          __typename: "Post",
          post_id: 2,
          thumbnail_img_src: "./user2/1.jpg"
    
        }
      ]
    }
  ]
]