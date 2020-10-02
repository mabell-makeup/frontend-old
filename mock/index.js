// eslint-disable-next-line no-undef
const {ApolloServer, gql} = require("apollo-server")

// スキーマを定義する
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`

// クエリで取得するデータを定数で置いておく
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crishton"
  }
]

// クエリ発行時の処理を指定する
const resolvers = {
  Query: {
    books: () => books
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