import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import "../assets/scss/not-found.scss";
import notFound from '../assets/img/404.jpg'

const NotFound = () => {
  return (
    <Layout>
      <div className="ps-page--404 custom-container">
        <div className="container">
          <div className="ps-section__content">
            <figure>
              <img src={notFound} alt="" />
              <h3>Ohh! Page not found</h3>
              <p>
                It seems we can't find what you're looking for. <br />
                Go back to
                <Link to="/">Homepage</Link>
              </p>
            </figure>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
