const MovieRepository = require("../repositories/movieRepository");

class MovieService {
  static async create(req) {
    const { title, genres, year } = req;

    try {
      const movie = await MovieRepository.create({
        title,
        genres,
        year,
      });

      return movie;
    } catch (error) {
      throw error;
    }
  }

  static async getAllMovie(req) {
    const { page, limit } = req;

    try {
      const movie = await MovieRepository.getAll({ page, limit });

      return movie;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(req) {
    const { id } = req;
    try {
      const movie = await MovieRepository.getById({ id });

      return movie;
    } catch (error) {
      throw error;
    }
  }

  static async putGenres(req) {
    const { genres, id } = req;
    try {
      const movie = await MovieRepository.putGenres({ genres, id });

      return movie;
    } catch (error) {
      throw error;
    }
  }

  static async delete(req) {
    const { id } = req;
    try {
      const movie = await MovieRepository.delete({ id });

      return movie;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MovieService;
