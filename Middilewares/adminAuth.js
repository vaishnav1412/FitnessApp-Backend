const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const admin_token = req.headers["authorisation"].split(" ")[1];
    jwt.verify(admin_token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "authentification failed", success: false });
      } else {
        
        const role = decoded.role;
        if (role === "admin") {
          const admin = await User.findOne({ _id: decoded.id });
          if (!admin) {
            return res
              .status(401)
              .send({ message: "authentification failed", success: false });
          } else {
            if (admin.isAdmin === 1) {
              req.adminId = decoded.id;
              next();
            } else {
              return res
                .status(401)
                .send({ message: "authentification failed", success: false });
            }
          }
        } else {
          return res
            .status(401)
            .send({ message: "authentification failed", success: false });
        }
      }
    });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "authentification failed", success: false });
  }
};
