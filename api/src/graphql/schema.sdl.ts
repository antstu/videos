export const schema = gql`
  enum ReactionType {
    Barf
    Crying
    Grimace
    HeartEyes
    Hearts
    Joy
    Melting
    NoHear
    NoSee
    NoSpeak
    PrayerHands
    Rocket
    Rofl
    Smiling
    Thinking
    ThumbsUp
    ThumbsDown
    Look
    Angel
    Nerd
    Yawn
  }

  type User {
    id: Int!
    email: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    videos: [Video!]!
    reactions: [Reaction!]!
  }

  type Video {
    id: Int!
    userId: Int!
    url: String!
    title: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime!
    user: User!
    reactions: [Reaction]!
  }

  type Reaction {
    id: Int!
    userId: Int!
    videoId: Int!
    type: ReactionType!
    createdAt: DateTime!
    video: Video!
    user: User!
  }

  type Query {
    videos: [Video!]! @requireAuth
    video(id: Int!): Video @requireAuth
  }

  input CreateVideoInput {
    url: String!
    title: String!
    description: String
  }

  input UpdateVideoInput {
    url: String
    title: String
    description: String
  }

  type Mutation {
    createVideo(input: CreateVideoInput!): Video! @requireAuth
    updateVideo(id: Int!, input: UpdateVideoInput!): Video! @requireAuth
    reactToVideo(id: Int!, type: ReactionType!): Video! @requireAuth
    deleteVideo(id: Int!): Video! @requireAuth
  }
`
