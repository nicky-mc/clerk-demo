import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Path to the posts.json file
const postsFilePath = path.join(process.cwd(), "public", "posts.json");

// Helper function to read the posts
function getPosts() {
  const fileData = fs.readFileSync(postsFilePath, "utf-8");
  return JSON.parse(fileData);
}

// Helper function to save the posts
function savePosts(posts) {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
}

// Handle GET, POST, PUT, and DELETE requests
export async function GET() {
  // Fetch and return all posts
  const posts = getPosts();
  return NextResponse.json(posts, { status: 200 });
}

export async function POST(req) {
  const { title, content } = await req.json();

  // Fetch existing posts
  const posts = getPosts();

  // Create a new post with a unique ID
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };

  // Add the new post to the array and save it
  posts.push(newPost);
  savePosts(posts);

  return NextResponse.json(
    { message: "Post added successfully", post: newPost },
    { status: 200 }
  );
}

export async function PUT(req) {
  const { id, title, content } = await req.json();

  // Fetch existing posts
  const posts = getPosts();

  // Find the post by its ID
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  // Update the post's title and content
  posts[postIndex].title = title;
  posts[postIndex].content = content;

  // Save the updated posts array
  savePosts(posts);

  return NextResponse.json(
    { message: "Post updated successfully", post: posts[postIndex] },
    { status: 200 }
  );
}

export async function DELETE(req) {
  const { id } = await req.json();

  // Fetch existing posts
  let posts = getPosts();

  // Filter out the post with the given ID
  posts = posts.filter((post) => post.id !== id);

  // Save the updated posts array
  savePosts(posts);

  return NextResponse.json(
    { message: `Post ${id} deleted successfully` },
    { status: 200 }
  );
}
