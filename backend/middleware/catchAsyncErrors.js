module.exports = (catchFunction) => (req, res, next) =>
  Promise.resolve(catchFunction(req, res, next)).catch(next);
