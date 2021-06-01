import React from "react";
import Layout from "../components/layout/Layout";
import "../assets/scss/home.scss";
import logo from "../assets/img/logo.jpg";

const Home = () => {
  return (
    <Layout>
      <div className="jumbotron home-jumbo custom-container">
        <h1 className="display-4 text-center">Welcome to Blog</h1>

        <hr className="my-4" />

        <div className="d-flex justify-content-center mb-5">
          <img src={logo} alt="log" className="m-auto" />
        </div>

        <p className="w-75 m-auto">
          This is simple blog site. You can post a blog and see others blog
          here. Welcome to our community. We are really happy to have youu here.
        </p>
        
      </div>
    </Layout>
  );
};

export default Home;
