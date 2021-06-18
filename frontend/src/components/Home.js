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
import { getCategories } from "../state/actions/categoryActions";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ({
  getProducts,
  getCategories,
  products: {
    products,
    totalProductCount,
    loading,
    error,
    itemsPerPage,
    filteredProductCount,
  },
  categories: { categories },
  match,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const keyword = match.params.keyword;
  const [price, setPrice] = useState([1, 999]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const alert = useAlert();

  useEffect(() => {
    if (error) return alert.error(error);

    getProducts(keyword, currentPage, price, category, rating);
    getCategories();
  }, [
    getProducts,
    getCategories,
    alert,
    error,
    currentPage,
    keyword,
    price,
    category,
    rating,
  ]);

  function setCurrentPageNumber(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = totalProductCount;
  if (keyword) {
    count = filteredProductCount;
  }

  return (
    <Fragment>
      <MetaData title={"The Best Products to Buy Online!"} />
      <h6 className="text-center small-heading text-light">Latest Products</h6>

      <p className="heading-underline" />

      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="filter col-sm-6 col-md-3 mb-5">
                    <div className="px-5">
                      <h6 className="px-auto mb-5 x-small-heading text-light">
                        Filter by Price
                      </h6>
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

                      <hr className="my-5" />
                      <div className="px-auto">
                        <h6 className="px-auto x-small-heading text-light">
                          Filter by Category
                        </h6>
                        <ul className="p-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category._id}
                              onClick={() => {
                                setCategory(category.value);
                              }}
                            >
                              {category.value}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-3" />
                      <div className="px-auto">
                        <h6 className="px-auto x-small-heading text-light">
                          Filter by Rating
                        </h6>
                        <ul className="p-0">
                          {[5, 4, 3, 2, 1].map((value) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={value}
                              onClick={() => {
                                setRating(value);
                              }}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{
                                    width: `${value * 20}%`,
                                  }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-9 mx-auto">
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
          {itemsPerPage <= count && (
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
  getCategories: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
  categories: state.categories,
});

export default connect(mapStateToProps, {
  getProducts,
  getCategories,
})(Home);
