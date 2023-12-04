"use server"
import Post from "@/models/Post"

export default async (authorID: string) => {
  const data = await Post.find({ authorID })
  const posts = data.map(post => ({
    _id: post._id.toString(),
    authorID: post.authorID,
    body: post.body,
    likes: post.likes,
    comments: post.comments,
    createdAt: post.createdAt.getDate()
  }))
  return posts
}