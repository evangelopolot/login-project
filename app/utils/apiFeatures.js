class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // BUILD THE QUERY
    // 1) Filltering
    const queryObj = { ...this.queryString };
    const excludedFields = ["sort", "limit", "fields"];
    console.log("This is the queryObj: ", queryObj);
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced Filltering - Refactoring the limiters by adding the $ sign
    // so that it can be handled by mongo - {gte} to {$gte}
    console.log("This is the queryObj: ", queryObj);
    console.log("This is the queryString: ", this.queryString);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log("This is the replaced queryStr: ", JSON.parse(queryStr));

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    //SORTING
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limit() {
    // FIELD LIMITING
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v"); // - : means exclude this field
    }
    return this;
  }
}

module.exports = APIFeatures;
