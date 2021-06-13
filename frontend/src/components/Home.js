import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ListGroup, Container } from "reactstrap";

import MetaData from "./layout/MetaData";
import Spinner from "./layout/static/Spinner";
import Product from "./products/Product";
import { getProducts } from "../state/actions/productActions";

const Home = ({
  getProducts,
  products: { products, totalProductCount, loading, error },
}) => {
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container>
      <MetaData title={"The Best Product to Buy Online!"} />
      <h6 className="text-center small-heading text-light">Latest Products</h6>

      <p className="heading-underline" />

      <section id="products" className="container mt-5">
        <div className="row">
          {products && !loading ? (
            <ListGroup className="custom-list">
              {/* Shows a list of study items */}

              {products.map((product) =>
                product !== null ? (
                  <Product key={product._id} product={product} />
                ) : (
                  <Spinner />
                )
              )}
            </ListGroup>
          ) : (
            <Spinner />
          )}
        </div>
      </section>
    </Container>
  );
};

Home.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getProducts })(Home);
