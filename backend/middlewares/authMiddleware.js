const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    // Safely read cookie token (req.cookies may be undefined if cookie-parser isn't used)
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    // This will throw if token invalid or secret missing
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // store user info in req.user for later use
    console.log("decoded token:", decoded);

    next();
  } catch (error) {
    // Log the real error for server-side debugging
    console.error("auth middleware error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
