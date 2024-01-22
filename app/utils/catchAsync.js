module.exports = (fn) => {
  // You return and anonymous fn in order to gain access to the params
  // and in that anonymous fn, the fn create user is called which returns a promise
  // then you use a catch() to get its error and pass it on to the global error handler using next()
  return (req, res, next) => {
    // fn is the function createUser,
    fn(req, res, next).catch((err) => next(err));
  };
};
