const profileView = async (req, res) => {
  try {
    res.status(200).send({
      user: req.user, // or fetch user from DB using decoded.id
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {profileView};