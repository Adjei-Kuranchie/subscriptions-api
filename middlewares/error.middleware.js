const errorMiddleware = (err, req, res, next) => {
  next();
};

export default errorMiddleware;
