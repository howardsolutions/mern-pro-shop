export default function asyncHanler(fn) {
  return (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// catch(next) => if any error occured, pass it to Express
