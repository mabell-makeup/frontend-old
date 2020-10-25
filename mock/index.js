/* eslint-disable no-undef */
const {ApolloServer, gql} = require("apollo-server")
const {books, items, posts} = require(__dirname + "/db.js")

// スキーマを定義する
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Item {
    item_id: Int,
    item_name: String,
    brand_name: String,
    item_category: [String],
    price: String,
    release_data: String
  }

  type Post {
    img_src: String,
    user_name: String,
    description: String,
    tags: [String],
    items: [Int]
  }

  type Query {
    books: [Book],
    items: [Item],
    posts: [Post],
  }
`

// クエリ発行時の処理を指定する
const resolvers = {
  Query: {
    books: () => books,
    items: () => items,
    posts: () => posts
  }
}

const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "Hello"
}

// サーバーを起動する
// const server = new ApolloServer({typeDefs, resolvers, mocks})
const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`)
})