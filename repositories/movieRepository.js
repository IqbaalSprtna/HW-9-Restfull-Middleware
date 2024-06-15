const { where } = require("sequelize");
const { Movie } = require("../models");

class MovieRepository {
  static async create(req) {
    try {
      const { title, genres, year } = req;
      const movie = await Movie.create({ title, genres, year });

      return movie;
    } catch (error) {
      throw error;
    }
  }

  static async getAll(req) {
    try {
      const { page = 1, limit = 10 } = req;
      const offset = (page - 1) * limit;

      const movie = await Movie.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      });

      return movie;
    } catch (error) {
      throw error;
    }
  }

  static async getById(req) {
    try {
      const { id } = req;
      const movie = await Movie.findByPk(id);

      return movie;
    } catch (error) {
      throw error;
    }
  }

  static async putGenres(req) {
    try {
      const { genres, id } = req;
      const movie = await Movie.update(
        {
          genres: genres,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return movie;
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(req) {
    try {
      const { id } = req;
      const movie = await Movie.destroy({
        where: {
          id: id,
        },
      });
      return movie;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MovieRepository;
