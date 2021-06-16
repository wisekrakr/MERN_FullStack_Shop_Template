import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import MetaData from "./layout/MetaData";
import Spinner from "./layout/static/Spinner";
import Product from "./products/Product";
import { getProducts } from "../state/actions/productActions";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({
  getProducts,
  products: { products, totalProductCount, loading, error, itemsPerPage },
  match,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const keyword = match.params.keyword;
  const [price, setPrice] = useState([1, 999]);

  const alert = useAlert();

  useEffect(() => {
    if (error) return alert.error(error);

    getProducts(keyword, currentPage, price);
  }, [getProducts, alert, error, currentPage, keyword, price]);

  function setCurrentPageNumber(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <Fragment>
      <MetaData title={"The Best Products to Buy Online!"} />
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
              {keyword ? (
                <Fragment>
                  <div className="col-6  mb-5">
                    <div className="px-5">
                      <span className="px-3">Filter by Price</span>
                      <Range
                        marks={{
                          1: `€1`,
                          999: `€999`,
                        }}
                        min={1}
                        max={999}
                        defaultValue={[1, 999]}
                        topFormatter={(value) => `€${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="row">
                      {products.map((product) => (
                        <Product key={product._id} product={product} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))
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
