import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataContext } from "../App";
import Layout from "../components/layout/Layout";
import { BsTrash, BsPen } from "react-icons/bs";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [currentItems, setCurrentItems] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    body: "",
    userId: "",
  });
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [reloadAll, setReloadAll] = useState(false);
  const { posts, setPosts } = useContext(DataContext);

  useEffect(() => {
    setUserPosts(posts.filter((p) => parseInt(p.userId) === 2));
  }, [posts, reloadAll]);

  useEffect(() => {
    if (currentItems === 0) {
      setCurrentPosts(userPosts?.slice(0, 10));
    } else {
      setCurrentPosts(userPosts?.slice(0, currentItems));
    }
  }, [currentItems, userPosts, posts, reloadAll]);

  const handlePostDelete = (id) => {
    setCurrentPosts(
      currentPosts.filter((post) => parseInt(post.id) !== parseInt(id))
    );
    toast.error("Post deleted!");
  };

  const handleInputOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updatePost = (e) => {
    if (!formData?.title && !formData?.body) {
      e.stopPropagation();
      setIsFormValidated(true);
    } else {
      const tempData = posts;
      const data = formData;
      data.id = selectedId;
      const selectedIndex = tempData.findIndex(
        (post) => parseInt(post.id) === parseInt(selectedId)
      );
      tempData[selectedIndex] = data;
      setPosts(tempData);
      setReloadAll(!reloadAll);
      setFormData({ id: "", title: "", body: "" });
      setIsEditing(false);
      toast.success("Your post updated successfully");
    }
  };

  const handlePostEdit = (id) => {
    setIsEditing(true);
    setSelectedId(id);
    const selectedPost = posts.find((post) => post.id === id);
    setFormData({
      id: id,
      title: selectedPost.title,
      body: selectedPost.body,
      userId: selectedPost.userId,
    });
  };

  return (
    <Layout>
      {/* Post edit modal */}
      <Modal
        show={isEditing}
        onHide={() => setIsEditing(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="m-auto" noValidate validated={isFormValidated}>
            <h3 className="mb-4">Update your blog</h3>
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

            <Button onClick={updatePost}>Update</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* section started */}
      <div className="custom-container">
        <Row>
          <Col xs={12} md={8} lg={8} sm={12} className="m-auto">
            <h4>My Blogs</h4>
            <div className="post-list mt-5">

              {currentPosts?.length > 0 ? (
                <>
                  {currentPosts?.map((post) => (
                    <div
                      key={post.id}
                      className="single-post justify-content-between"
                    >
                      <div className="d-flex">
                        <img
                          className="user-image"
                          alt="User"
                          src={
                            "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                          }
                        />
                        <div className="content">
                          <Link
                            to={`/post-details/${post?.id}`}
                            className="normal-link"
                          >
                            <h5 className="title">{post.title}</h5>
                            <p className="body">{post.body}</p>
                          </Link>
                        </div>
                      </div>

                      <div className="action-icons">
                        <Button
                          variant="outline-danger"
                          className="mx-2"
                          onClick={() => handlePostDelete(post.id)}
                        >
                          <BsTrash />
                        </Button>
                        <Button
                          variant="outline-info"
                          onClick={() => handlePostEdit(post.id)}
                        >
                          <BsPen />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {userPosts?.length > 10 && (
                    <div className="w-100 d-flex justify-content-center">
                      <Button
                        variant="secondary"
                        className="my-3"
                        onClick={() => setCurrentItems(currentItems + 10)}
                      >
                        Load More
                      </Button>
                    </div>
                  )}
                  
                </>
              ) : (
                <h4>No post exist. Please create one!</h4>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default MyProfile;
