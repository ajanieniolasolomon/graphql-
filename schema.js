export default `

type genre{
    _id:ID!
    name:String!
}
type book{
    _id:ID!
    title:String!
    description:String
    author:String!
    publisher:String!
    genres:String!
   pages:Int


}

type Query{
    allGenres:[genre!]!
    allBooks:[book!]!
}

type Mutation{
    createGenres(name:String!):genre!
    createBooks(title:String!,description:String,author:String!,genres:String!, publisher:String!,pages:Int):book!
}
type Subscription{
    newBooks:book!
}

`