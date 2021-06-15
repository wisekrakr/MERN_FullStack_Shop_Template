import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";

import MetaData from "./layout/MetaData";
import Spinner from "./layout/static/Spinner";
import Product from "./products/Product";
import { getProducts } from "../state/actions/productActions";

const Home = ({
  getProducts,
  products: { products, totalProductCount, loading, error, itemsPerPage },
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();

  useEffect(() => {
    if (error) return alert.error(error);
    getProducts(currentPage);
  }, [getProducts, alert, error, currentPage]);

  function setCurrentPageNumber(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      <MetaData title={"The Best Product to Buy Online!"} />
      <h6 className="text-center small-heading text-light">
        Latest Products: {totalProductCount ? totalProductCount : 0} products
      </h6>

      <p className="heading-underline" />

      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section id="products" className="container mt-5">
            <div className="row">
              {products && !loading ? (
                products.map((product) =>
                  product !== null ? (
                    <Product
                      className="custom-list-item"
                      key={product._id}
                      product={product}
                    />
                  ) : (
                    <Spinner />
                  )
                )
              ) : (
                <Spinner />
              )}
            </div>
          </section>
          {itemsPerPage <= totalProductCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalProductCount}
                onChange={setCurrentPageNumber}
                nextPageText={">"}
                prevPageText={"<"}
                firstPageText={"<<"}
                lastPageText={">>"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
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
