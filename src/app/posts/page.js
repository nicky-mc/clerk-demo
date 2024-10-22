"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // To create links to dynamic pages

export default function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetching the JSON file from the public folder
    fetch("/posts.json")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-semibold text-center mb-10">
          Transgender Issues in the UK
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl font-bold">{post.title}</h3>
                <p className="text-gray-600">
                  {post.content.substring(0, 200)}...
                </p>
                <div className="card-actions justify-end">
                  {/* Use Link to navigate to the dynamic post page */}
                  <Link href={`/posts/${post.id}`} className="btn btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
