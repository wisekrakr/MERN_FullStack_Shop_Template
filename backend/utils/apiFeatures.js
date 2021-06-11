class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // search by keyword. Keyword has to contain a word within the name of the product
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i", // case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // filter products by product fields i.e. category or rating etc.
  filter() {
    const queryCopy = { ...this.queryString };

    // removing fields from the query that are not product fields
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((field) => delete queryCopy[field]);

    // advance filter for price, rating etc.
    let queryString = JSON.stringify(queryCopy);

    // add a $ symbol in front of mongodb price queries
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    console.log(queryCopy);

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultsPerPage * (currentPage - 1); // the product results that will be skipped

    this.query = this.query.limit(resultsPerPage).skip(skip); // limit the number of product results on the page
    return this;
  }
}

module.exports = APIFeatures;
