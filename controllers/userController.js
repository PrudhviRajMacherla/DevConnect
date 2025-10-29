const Connection = require("../models/connection");
const User = require("../models/user");

const allReceivedConnections = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const receivedRequests = await Connection.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);

    return res.send(receivedRequests);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const allUserConnections = async (req, res) => {
  try {
    let loggedInUser = req.user;
    let connections = await Connection.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");

    const myconnections = connections.map((connection) =>
      connection.toUserId.equals(loggedInUser._id)
        ? connection.fromUserId
        : connection.toUserId
    );

    return res.send(myconnections);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const userFeed = async (req, res) => {
  try {
    let page = req.query.page || 1;
    let limit = req.query.limit || 5;
    let skip = (page - 1) * limit;
    const loggedInUser = req.user;

    // find all connections (any relation with logged-in user)
    const connections = await Connection.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    });

    // collect connected user IDs (including self)
    let hiddenUserFeed = new Set();
    connections.forEach((conn) => {
      hiddenUserFeed.add(conn.fromUserId.toString());
      hiddenUserFeed.add(conn.toUserId.toString());
    });

    // also hide yourself explicitly
    hiddenUserFeed.add(loggedInUser._id.toString());

    // now get users who are NOT in that set
    const feed = await User.find({
      _id: { $nin: Array.from(hiddenUserFeed) },
    })
      .select("firstName")
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      data: feed,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { allReceivedConnections, allUserConnections, userFeed };
