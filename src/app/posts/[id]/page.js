"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch the JSON file from the public folder
      const fetchPost = async () => {
        const response = await fetch("/posts.json");
        const data = await response.json();

        // Find the post by id
        const post = data.find((post) => post.id === id);
        setPost(post);
      };

      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <p className="text-gray-700 text-lg">{post.content}</p>
      <div className="mt-8">
        <Link href="/posts">
          <a className="btn btn-secondary">Back to Posts</a>
        </Link>
      </div>
    </div>
  );
}
