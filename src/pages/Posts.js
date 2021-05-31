import React, { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Layout from "../components/layout/Layout";
import "../assets/scss/post.scss";
import { DataContext } from "../App";
import PostList from "../components/PostList";
import { toast } from "react-toastify";

const Posts = () => {
  const [formData, setFormData] = useState({ id: "", title: "", body: "" });
  const [isFormValidated, setIsFormValidated] = useState(false);
  const { posts, setPosts } = useContext(DataContext);

  const handleSubmit = (e) => {
    console.log("inside submit", formData);
    if (!formData?.title && !formData?.body) {
      e.stopPropagation();
      setIsFormValidated(true);
    } else {
      const lastPost = posts.pop();
      const data = formData;
      data.id = lastPost.id + 1;
      setPosts([data, ...posts]);
      setFormData({ id: "", title: "", body: "" });
      toast.success("Your post saves successfully");
    }
  };

  const handleInputOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <div className="container custom-container">
        <div className="post-form">
          <Form
            as={Col}
            md="8"
            className="m-auto"
            noValidate
            validated={isFormValidated}
          >
            <h3 className="mb-4">Create your own Blog</h3>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleInputOnChange}
                value={formData?.title}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                This field is required!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                required
                name="body"
                placeholder="What's on your mind....?"
                onChange={handleInputOnChange}
                as="textarea"
                rows={4}
                value={formData?.body}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                This field is required!
              </Form.Control.Feedback>
            </Form.Group>

            <Button onClick={handleSubmit}>Submit</Button>
          </Form>
        </div>

        <Row>
          <Col xs="12" md="6" lg="6" sm="12" className="m-auto">
            <PostList />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Posts;
