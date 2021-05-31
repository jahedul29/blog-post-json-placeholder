import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { DataContext } from "../App";
import Layout from "../components/layout/Layout";

const UserDetails = () => {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState({});
  const [usersPost, setUsersPosts] = useState([]);
  const { posts, users } = useContext(DataContext);

  useEffect(() => {
    setCurrentUser(users.find((user) => user.id == id));
    setUsersPosts(posts.filter((post) => post.userId == id));
  }, []);

  return (
    <Layout>
      <div className="container custom-container">
        <Row>
          <Col xs={12} md={8} lg={8} sm={12} className="m-auto">
            <div className="post-details">
              <img
                className="details-user-image"
                alt="User"
                src={
                  "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                }
              />
              <div className="details-content">
                <h2 className="details-title">{currentUser?.name}</h2>
                <h6 className="details-description">{currentUser?.email}</h6>
                <p className="details-description">{currentUser?.website}</p>
              </div>
            </div>
            <hr />
            <Row>
              <Col xs={12} md={8} lg={8} sm={12} className="m-auto">
                <h4 className="mb-4 mt-2">Posts</h4>

                {usersPost?.map((post) => (
                  <div className="post-list">
                    <div>
                      <Link
                        to={`/post-details/${post.id}`}
                        className="single-post"
                      >
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
                  </div>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default UserDetails;
