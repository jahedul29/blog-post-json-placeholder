import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataContext } from "../App";

const PostList = () => {
  const [currentItems, setCurrentItems] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);
  const { posts } = useContext(DataContext);

  useEffect(() => {
    if (currentItems === 0) {
      setCurrentPosts(posts?.slice(0, 10));
    } else {
      setCurrentPosts(posts?.slice(0, currentItems));
    }
  }, [currentItems, posts]);

  return (
    <div className="post-list mt-5">
      {currentPosts?.map((post) => (
        <div >
          <Link to={`/post-details/${post.id}`} className="single-post">
            <img
              className="user-image"
              alt="User"
              src={
                "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
              }
            />
            <div className="content">
              <h5 className="title">{post.title}</h5>
              <p className="body">{post.body}</p>
            </div>
          </Link>
        </div>
      ))}
      <div className="w-100 d-flex justify-content-center">
        <Button
          variant="secondary"
          className="my-3"
          onClick={() => setCurrentItems(currentItems + 10)}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default PostList;
