module.exports = (getDb) => {
  return (req, res, next) => {
    const db = getDb();
    if (!db) {
      res.status(503).json({ message: 'Server is starting up. Please try again later.' });
    } else {
      next();
    }
  };
};
