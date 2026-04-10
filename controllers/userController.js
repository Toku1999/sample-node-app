const getUsers = (req, res) => {
  res.json([
    { id: 1, name: "Tokesh" },
    { id: 2, name: "DevOps" }
  ]);
};

module.exports = { getUsers };
