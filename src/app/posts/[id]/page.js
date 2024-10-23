"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function PostPage() {
  const { id } = useParams(); // Get the post ID from the URL
  const router = useRouter(); // Used to navigate after delete
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch the specific post when the page loads
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch the post");
        }
        const data = await response.json();
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      }
    };

    fetchPost();
  }, [id]);

  // Handle deleting the post
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          router.push("/posts"); // Navigate back to the posts list after delete
        } else {
          console.error("Failed to delete the post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  // Handle saving the edited post
  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setPost(updatedPost.post);
        setIsEditing(false); // Exit editing mode
      } else {
        console.error("Failed to update the post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      {isEditing ? (
        <div>
          <h1 className="text-4xl font-bold mb-6">Edit Post</h1>
          <input
            type="text"
            className="w-full border-2 border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border-2 border-gray-300 p-3 mb-4 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
          />
          <button className="btn btn-primary mr-4" onClick={handleEdit}>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-gray-700 text-lg mb-4">
              {paragraph}
            </p>
          ))}
          <div className="mt-8">
            <button
              className="btn btn-warning mr-4"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <div className="mt-8">
            <Link href="/posts" className="btn btn-secondary">
              Back to Posts
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
