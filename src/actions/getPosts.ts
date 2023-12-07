"use server"
import Post from "@/models/Post"
import { Post as PostType } from "@/types/Post"

export const getPosts = async (authorID: string) => {
  const data = await Post.find({ authorID })
  const posts: PostType[] = data.map(post => ({
    _id: post._id.toString(),
    authorID: post.authorID,
    body: post.body,
    likes: post.likes,
    comments: post.comments,
    createdAt: post.createdAt.getTime()
  }))
  
  return posts
}