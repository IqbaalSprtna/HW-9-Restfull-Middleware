const UserRepository = require("../repositories/userRepository");
const bcrypt = require("bcrypt");

class UserService {
  static async register(req) {
    const { email, gender, password, role } = req;
    const hashpassword = bcrypt.hashSync(password, 8);

    try {
      const user = await UserRepository.register({
        email,
        gender,
        hashpassword,
        role,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async login(req) {
    const { email, password } = req;
    try {
      const user = await UserRepository.findByEmail(email);

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return null;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUser(req) {
    const { page, limit } = req;
    try {
      const user = await UserRepository.getAll({ page, limit });

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserById(req) {
    const { id } = req;
    try {
      const user = await UserRepository.getById({ id });

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async putRole(req) {
    const { role, id } = req;
    try {
      const user = await UserRepository.putRole({ role, id });

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async delete(req) {
    const { id } = req;
    try {
      const user = await UserRepository.delete({ id });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
