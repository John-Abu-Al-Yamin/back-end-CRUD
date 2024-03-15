const jwt = require("jsonwebtoken");

// verifyToken

function verifyToken(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken) {
    const token = authToken.split(" ")[1];

    try {
      const decodedPayLoad = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedPayLoad;
      next();
    } catch (error) {
      return res.status(401).json({ message: "invalid Token, access denied" });
    }
  } else {
    return res
      .status(401)
      .json({ message: "No Token Provided, access denied" });
  }
}

// verifyToken And Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Not Allowed , Only Admin" });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
};
