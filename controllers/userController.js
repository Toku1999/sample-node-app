const getUsers = (req, res) => {
  res.json([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" }
  ]);
};

module.exports = { getUsers };
