"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Popover, TextField, Typography, Box } from "@mui/material";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  // Fetch all posts from the API when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data); // Store the fetched posts in state
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Handle submitting a new post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = { title, content };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const result = await response.json();
        setPosts([...posts, result.post]); // Add the new post to the state
        setTitle(""); // Clear the title input
        setContent(""); // Clear the content input
        handleClose(); // Close the popover
      } else {
        const errorText = await response.text();
        console.error(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // Handle opening the popover
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle closing the popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Determine if the popover is open
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <section className="py-10 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-4xl font-semibold text-center mb-10 text-white">
          Blog Posts
        </h2>

        {/* Button to open the popover to add a post */}
        <Button variant="contained" color="primary" onClick={handleClick}>
          Add Post
        </Button>

        {/* Popover for adding a new post */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Box p={2}>
            <Typography variant="h6">Add New Post</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Add Post
              </Button>
            </form>
          </Box>
        </Popover>

        {/* List of posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {posts.map((post) => (
            <div key={post.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl font-bold text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-700">
                  {post.content.substring(0, 200)}...
                </p>
                <div className="card-actions justify-end">
                  {/* Link to the individual post page */}
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
