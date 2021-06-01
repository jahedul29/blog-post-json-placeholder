import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { DataContext } from "../App";
import Layout from "../components/layout/Layout";

const PostDetails = () => {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState();
  const [currentComments, setCurrentComments] = useState([]);
  const { posts, comments } = useContext(DataContext);

  useState(() => {
    setCurrentPost(posts.find((p) => parseInt(p.id) === parseInt(id)));
    setCurrentComments(comments.filter((c) => parseInt(c.postId) === parseInt(id)));
  }, [id, posts]);

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
                <h2 className="details-title">{currentPost?.title}</h2>
                <p className="details-description">{currentPost?.body}</p>
              </div>
            </div>

            <hr/>

            <Row>
              <Col xs={12} md={8} lg={8} sm={12} className="m-auto">
              <h4 className="mb-4 mt-2">Comments</h4>

                {currentComments?.map((comment) => (
                  <div className="post-list">
                    <div className="single-post">
                      <img
                        className="user-image"
                        alt="User"
                        src={
                          "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                        }
                      />
                      <div className="content">
                        <h5 className="title">{comment.name}</h5>
                        <h6>{comment.email}</h6>
                        <p className="body">{comment.body}</p>
                      </div>
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

export default PostDetails;
