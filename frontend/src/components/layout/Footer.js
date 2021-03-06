import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";

const Footer = () => {
  return (
    <Fragment>
      <footer id="footer" className="footer-1">
        <div className="main-footer widgets-dark typo-light">
          <Container className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="widget subscribe no-box">
                  <h5 className="widget-title">
                    Your Shop | A great place to buy stuff!<span></span>
                  </h5>
                  <p>
                    A company statement or a small summary of what this company
                    sells to its customers.{" "}
                  </p>
                </div>
              </div>

              <div className="get-started col-xs-12 col-sm-6 col-md-3">
                <div className="widget no-box">
                  <h5 className="widget-title">
                    Quick Links<span></span>
                  </h5>
                  <ul className="thumbnail-widget">
                    <li>
                      <div className="thumb-content">
                        <Link to="">Get Started</Link>
                      </div>
                    </li>
                    <li>
                      <div className="thumb-content">
                        <Link to="">Customer Service</Link>
                      </div>
                    </li>
                    <li>
                      <div className="thumb-content">
                        <Link to="">News</Link>
                      </div>
                    </li>
                    <li>
                      <div className="thumb-content">
                        <Link to="">About</Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="widget no-box">
                  <h5 className="widget-title">
                    Get Started<span></span>
                  </h5>
                  <p>Get access to all the world's knowledge.</p>
                  <Link
                    className="btn draw-border"
                    to="/register"
                    target="_blank"
                  >
                    Register Now
                  </Link>
                </div>
              </div>

              <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="widget no-box">
                  <h5 className="widget-title">
                    Contact Us<span></span>
                  </h5>

                  <p>
                    <a href="mailto:info@wise.com" title="Get in touch">
                      info@wise.com
                    </a>
                  </p>
                  <ul className="social-footer2">
                    <i
                      className="fab fa-twitter fa-2x"
                      title="twitter.com/wisekrakr"
                    />
                    <i
                      className="fab fa-youtube fa-2x"
                      title="youtube.com/wisekrakringames"
                    />
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <div className="footer-copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <p>Copyright Wise ?? 2020. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
