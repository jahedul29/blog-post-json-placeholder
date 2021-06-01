import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import axios from "axios";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import MyProfile from "./pages/MyProfile";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import UserDetails from "./pages/UserDetails";

// creating and exporting context
export const DataContext = createContext();

function App() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);

  // All mentioned API calling
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err.message));

    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err.message));

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err.message));
  }, []);


  return (
    <DataContext.Provider
      value={{ posts, setPosts, comments, setComments, users, setUsers }}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/posts">
            <Posts />
          </Route>

          <Route path="/post-details/:id">
            <PostDetails />
          </Route>

          <Route path="/my-profile">
            <MyProfile />
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/user/:id">
            <UserDetails />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>

        </Switch>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
