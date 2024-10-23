import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const postsFilePath = path.join(process.cwd(), "public", "posts.json");

// Function to read posts from JSON file
function getPosts() {
  const fileData = fs.readFileSync(postsFilePath, "utf-8");
  return JSON.parse(fileData);
}

// Handle GET request for specific post by ID
export async function GET(req, { params }) {
  const { id } = params;
  const posts = getPosts();

  // Find the post by ID
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post, { status: 200 });
}

// Handle PUT request to update a post by ID
export async function PUT(req, { params }) {
  const { id } = params;
  const { title, content } = await req.json();
  const posts = getPosts();

  // Find the post by ID
  const postIndex = posts.findIndex((p) => p.id === Number(id));
  if (postIndex === -1) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  // Update the post
  posts[postIndex].title = title;
  posts[postIndex].content = content;

  // Save the updated posts back to the file
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));

  return NextResponse.json(
    { message: `Post ${id} updated successfully`, post: posts[postIndex] },
    { status: 200 }
  );
}

// Handle DELETE request to delete a post by ID
export async function DELETE(req, { params }) {
  const { id } = params;
  let posts = getPosts();

  // Filter out the post by ID
  const updatedPosts = posts.filter((p) => p.id !== Number(id));

  if (posts.length === updatedPosts.length) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  // Save the updated posts back to the file
  fs.writeFileSync(postsFilePath, JSON.stringify(updatedPosts, null, 2));

  return NextResponse.json(
    { message: `Post ${id} deleted successfully` },
    { status: 200 }
  );
}
