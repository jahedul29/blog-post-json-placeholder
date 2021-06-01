import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { DataContext } from "../App";
import Layout from "../components/layout/Layout";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import { Link } from "react-router-dom";

const Users = () => {
  const [currentUserState, setCurrentUserState] = useState([]);
  const [sortedByName, setSortedByName] = useState("asc");
  const [sortedByEmail, setSortedByEmail] = useState("asc");
  const [filterFormData, setFilterFormData] = useState({
    name: "",
    email: "",
    website: "",
  });
  // const [isOperationPerformed, setIsOperationPerformed] = useState(false);
  const { users, setUsers } = useContext(DataContext);

  useEffect(() => {
    const browserData = JSON.parse(localStorage.getItem("blog-data"));
    const sortByName = JSON.parse(localStorage.getItem("sort_by_name"));
    const sortByEmail = JSON.parse(localStorage.getItem("sort_by_email"));

    if (browserData && browserData.length > 0) {
      setCurrentUserState(browserData);
      setSortedByName(sortByName?.order || "asc");
      setSortedByEmail(sortByEmail?.order || "asc");
      setFilterFormData(JSON.parse(localStorage.getItem("filterFormData")));
    } else {
      setCurrentUserState(users);
      localStorage.setItem("blog-data", JSON.stringify(users));
    }
  }, [users]);

  // useEffect(() => {
  //   setCurrentUserState(users);
  //   localStorage.setItem("blog-data", JSON.stringify(users));
  // }, [isOperationPerformed]);

  const dynamicSort = (property, order) => {
    let sort_order = 1;
    if (order === "desc") {
      sort_order = -1;
    }
    return (a, b) => {
      // a should come before b in the sorted order
      if (a[property] < b[property]) {
        return -1 * sort_order;
        // a should come after b in the sorted order
      } else if (a[property] > b[property]) {
        return 1 * sort_order;
        // a and b are the same
      } else {
        return 0 * sort_order;
      }
    };
  };

  const handleFilterFormChange = (e) => {
    setFilterFormData({ ...filterFormData, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    localStorage.setItem("filterFormData", JSON.stringify(filterFormData));
    if (
      filterFormData.name === "" &&
      filterFormData.emial === "" &&
      filterFormData.website === ""
    ) {
      e.preventDefault();
    } else if (filterFormData.name === "" && filterFormData.email === "") {
      const filteredData = users.filter((user) =>
        user.website
          .toLowerCase()
          .includes(filterFormData.website.trim().toLowerCase())
      );
      setCurrentUserState(filteredData);
      localStorage.setItem("blog-data", JSON.stringify(filteredData));
    } else if (filterFormData.name === "" && filterFormData.website === "") {
      const filteredData = users.filter((user) =>
        user.email
          .toLowerCase()
          .includes(filterFormData.email.trim().toLowerCase())
      );
      setCurrentUserState(filteredData);
      localStorage.setItem("blog-data", JSON.stringify(filteredData));
    } else if (filterFormData.email === "" && filterFormData.website === "") {
      const filteredData = users.filter((user) =>
        user.name
          .toLowerCase()
          .includes(filterFormData.name.trim().toLowerCase())
      );
      setCurrentUserState(filteredData);
      localStorage.setItem("blog-data", JSON.stringify(filteredData));
    } else if (filterFormData.name === "") {
      const filteredData = users
        .filter((user) =>
          user.email
            .toLowerCase()
            .includes(filterFormData.email.trim().toLowerCase())
        )
        .filter((tempData) =>
          tempData.website
            .toLowerCase()
            .includes(filterFormData.website.trim().toLowerCase())
        );
      setCurrentUserState(filteredData);
      localStorage.setItem("blog-data", JSON.stringify(filteredData));
    } else if (filterFormData.email === "") {
      const filteredData = users
        .filter((user) =>
          user.name
            .toLowerCase()
            .includes(filterFormData.name.trim().toLowerCase())
        )
        .filter((tempData) =>
          tempData.website
            .toLowerCase()
            .includes(filterFormData.website.trim().toLowerCase())
        );
      setCurrentUserState(filteredData);
      localStorage.setItem("blog-data", JSON.stringify(filteredData));
    } else if (filterFormData.website === "") {
      const filteredData = users
        .filter((user) =>
          user.name
            .toLowerCase()
            .includes(filterFormData.name.trim().toLowerCase())
        )
        .filter((tempData) =>
          tempData.email
            .toLowerCase()
            .includes(filterFormData.email.trim().toLowerCase())
        );
      setCurrentUserState(filteredData);
      localStorage.setItem("blog-data", JSON.stringify(filteredData));
    } else {
      const filteredData = users
        .filter((user) =>
          user.name
            .toLowerCase()
            .includes(filterFormData.name.trim().toLowerCase())
        )
        .filter((tempData) =>
          tempData.email
            .toLowerCase()
            .includes(filterFormData.email.trim().toLowerCase())
        )
        .filter((secondTempData) =>
          secondTempData.website
            .toLowerCase()
            .includes(filterFormData.website.trim().toLowerCase())
        );
      setCurrentUserState(filteredData);
      localStorage.setItem("blog-data", JSON.stringify(filteredData));
    }
  };

  return (
    <Layout>
      <div className="custom-container">
        <Row>
          <Col xs={12} md={8} lg={8} sm={12} className="m-auto">
            <h4>Users List</h4>

            <div className="filter-form">
              <Form>
                <Row className="align-items-center justify-content-end my-2">
                  <Col sm={3} className="my-1">
                    <Form.Control
                      defaultValue={filterFormData?.name}
                      name="name"
                      placeholder="Name"
                      onChange={handleFilterFormChange}
                    />
                  </Col>
                  <Col sm={3} className="my-1">
                    <Form.Control
                      defaultValue={filterFormData?.email}
                      name="email"
                      placeholder="Email"
                      onChange={handleFilterFormChange}
                    />
                  </Col>
                  <Col sm={3} className="my-1">
                    <Form.Control
                      defaultValue={filterFormData?.website}
                      name="website"
                      placeholder="Website"
                      onChange={handleFilterFormChange}
                    />
                  </Col>
                  <Col xs="auto" className="my-1">
                    <Button onClick={handleSearch}>Search</Button>
                  </Col>
                </Row>
              </Form>
            </div>

            <Table striped bordered hover>
              <thead className="bg-secondary">
                <tr>
                  <th>
                    Name{" "}
                    <span className="ml-3">
                      {sortedByName === "asc" ? (
                        <FiChevronsDown
                          onClick={() => {
                            setSortedByName("desc");
                            const sortedData = currentUserState.sort(
                              dynamicSort("name", "desc")
                            );
                            setUsers(sortedData);
                            setCurrentUserState(sortedData);
                            localStorage.setItem(
                              "blog-data",
                              JSON.stringify(sortedData)
                            );
                            localStorage.setItem(
                              "sort_by_name",
                              JSON.stringify({ by: "name", order: "desc" })
                            );
                          }}
                        />
                      ) : (
                        <FiChevronsUp
                          onClick={() => {
                            setSortedByName("asc");
                            const sortedData = currentUserState.sort(
                              dynamicSort("name", "asc")
                            );
                            setUsers(sortedData);
                            setCurrentUserState(sortedData);
                            localStorage.setItem(
                              "blog-data",
                              JSON.stringify(sortedData)
                            );
                            localStorage.setItem(
                              "sort_by_name",
                              JSON.stringify({ by: "name", order: "asc" })
                            );
                          }}
                        />
                      )}
                    </span>{" "}
                  </th>
                  <th>
                    Email{" "}
                    <span className="ml-3">
                      {sortedByEmail === "asc" ? (
                        <FiChevronsDown
                          onClick={() => {
                            setSortedByEmail("desc");
                            const sortedData = currentUserState.sort(
                              dynamicSort("email", "desc")
                            );
                            setUsers(sortedData);
                            setCurrentUserState(sortedData);
                            localStorage.setItem(
                              "blog-data",
                              JSON.stringify(sortedData)
                            );
                            localStorage.setItem(
                              "sort_by_email",
                              JSON.stringify({ by: "email", order: "desc" })
                            );
                          }}
                        />
                      ) : (
                        <FiChevronsUp
                          onClick={() => {
                            setSortedByEmail("asc");
                            const sortedData = currentUserState.sort(
                              dynamicSort("email", "asc")
                            );
                            setUsers(sortedData);
                            setCurrentUserState(sortedData);
                            localStorage.setItem(
                              "blog-data",
                              JSON.stringify(sortedData)
                            );
                            localStorage.setItem(
                              "sort_by_email",
                              JSON.stringify({ by: "email", order: "asc" })
                            );
                          }}
                        />
                      )}
                    </span>
                  </th>
                  <th>Website</th>
                </tr>
              </thead>
              <tbody>
                {currentUserState?.length > 0 ? (
                  <>
                    {currentUserState?.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <Link to={`/user/${user?.id}`}>
                          {user.name}
                          </Link>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.website}</td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr rowSpan="5">
                    <td colSpan="3">No User found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Users;
