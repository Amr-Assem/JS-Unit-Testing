import React, { useState, useEffect } from "react";
import axios from "axios";

async function fetchPost() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

function API() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetchPost()
      .then((data) => {
        setIsLoading(false);
        setPosts(data);
      })
      .catch(() => {
        setIsLoading(false);
        setError("Something went wrong");
      });
  }, []);

  console.log(posts);

  if (isLoading) return <p>Loading post ...</p>;
  if (error) return <p role="alert">{error}</p>;
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <div>{post.body}</div>
        </div>
      ))}
    </>
  );
}

export default API;
