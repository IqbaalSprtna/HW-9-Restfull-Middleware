const UserService = require("../service/userService");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret";

class UserController {
  static async register(req, res, next) {
    const { email, gender, password, role } = req.body;

    try {
      const user = await UserService.register({
        email,
        gender,
        password,
        role,
      });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await UserService.login({ email, password });
      if (!user) {
        return res.status(401).json({ message: "Invalid Credintial" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: token });
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    const { page, limit } = req.query;
    try {
      const user = await UserService.getAllUser({ page, limit });

      res.status(200).json({
        totalItems: user.count,
        totalPages: Math.ceil(user.count / limit),
        currentPage: parseInt(page),
        movies: user.rows,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById({ id });

      if (user) {
        res.status(200).json(user);
      }

      res.status(404).json({ message: "Data Not Found" });
    } catch (error) {
      next(error);
    }
  }

  static async putRole(req, res, next) {
    const { role } = req.body;
    const { id } = req.params;
    try {
      await UserService.putRole({ role, id });

      res.status(200).json({ message: "Data Berhasil Diubah" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      await UserService.delete({ id });

      res.status(200).json({
        message: "successfully delete",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
