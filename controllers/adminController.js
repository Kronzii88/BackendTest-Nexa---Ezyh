const { Admin } = require("../models");
const jwt = require("jsonwebtoken");
const { JWT_SIGNATURE_KEY } = require("../config/environment.js");

function createToken({ id, name, password }) {
  return jwt.sign(
    {
      id,
      name,
      password,
    },
    JWT_SIGNATURE_KEY
  );
}
exports.handleLogin = async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;

    if (!name || !password) {
      return res.status(404).json({
        status: "EMPTY",
        data: {
          message: "name or password cannot be empty",
        },
      });
    }
    const admin = await Admin.findOne({
      where: {
        name: name,
      },
    });

    if (!admin) {
      return res.status(401).json({
        status: "FAIL",
        data: {
          message: "name not found",
        },
      });
    }

    if (password !== admin.password) {
      return res.status(401).json({
        status: "FAIL",
        data: {
          message: "Password is incorrect",
        },
      });
    }

    const token = createToken(admin);
    await Admin.update(
      {
        token,
      },
      {
        where: {
          id: admin.id,
        },
      }
    );

    res.status(201).json({
      status: "OK",
      data: {
        token: token,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "FAIL",
      data: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
    });
  }
};
