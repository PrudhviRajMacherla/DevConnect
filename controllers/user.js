const createUser = (req, res) => {
  try {
    res.send("crated user");
  } catch (err) {
    res.status(500).send("something went wrong in user creation");
  }
};

const getUser = (req, res) => {
  try {
    res.send("get user");
  } catch (err) {
    res.status(500).send("something went wrong in getting user dtail");
  }
};

module.exports = { createUser, getUser };
