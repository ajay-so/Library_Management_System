
const applyPagination = (query, page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  return query.skip(skip).limit(Number(limit));
};

module.exports = applyPagination;
