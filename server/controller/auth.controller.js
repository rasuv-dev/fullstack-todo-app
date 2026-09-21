import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  const body = req.body;
  try {
    if (!body) {
      const error = new Error("Bad Request.........");

      error.statusCode = 400;
      throw error;
    }

    const result = await registerUser(body.email, body.password);

    res.status(201).json(result);
  } catch (e) {
    if (e.message) {
      res.status(e.statusCode).json({
        message: e.message,
      });
    } else {
      res.status(500).res({
        message: "Internal Server Error..........",
      });
      console.log("riching here");
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const body = await loginUser(email, password);
    res.status(201).json(body);
  } catch (e) {
    if (e.message) {
      res.status(e.statusCode).json({
        message: e.message,
      });
    } else {
      res.status(500).json({
        message: "Internal Server Error..........",
      });
    }
  }
};
