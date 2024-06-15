const { where } = require("sequelize");
const { User } = require("../models");

class UserRepository {
  static async register(req) {
    try {
      const { email, gender, hashpassword, role } = req;
      const user = await User.create({
        email,
        gender,
        password: hashpassword,
        role,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getAll(req) {
    try {
      const { page = 1, limit = 10 } = req;
      const offset = (page - 1) * limit;

      const user = await User.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getById(req) {
    try {
      const { id } = req;
      const user = await User.findByPk(id);

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async putRole(req) {
    try {
      const { role, id } = req;
      const user = await User.update(
        {
          role: role,
        },
        {
          where: {
            id: id, // Kondisi untuk menemukan record yang akan diupdate
          },
        }
      );

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async delete(req) {
    try {
      const { id } = req;
      const user = await User.destroy({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserRepository;
