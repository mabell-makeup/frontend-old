import * as q from "./querys"
import * as db from "./db"

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const router = [
  [q.getSuggestionItems,
    {
      suggestionItems: db.items.slice(0, 20).map(item => ({item_id: item.item_id, brand_name: item.brand_name, item_name: item.item_name}))
    }
  ],
  [q.getTrendPosts,
    {
      posts: shuffle(db.posts.slice(0, 5)).map(post => ({post_id: post.post_id, thumbnail_img_src: post.thumbnail_img_src}))
    }
  ],
  [q.getPostsByConditions,
    {
      posts: db.posts.slice(0, 2).map(post => ({post_id: post.post_id, thumbnail_img_src: post.thumbnail_img_src}))
    }
  ],
  [q.getPostDetail, shuffle(db.posts.slice(0, 5)).pop()]
]