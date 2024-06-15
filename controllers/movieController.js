const MovieService = require("../service/movieService");

class MovieController {
  static async create(req, res, next) {
    const { title, genres, year } = req.body;

    try {
      const movie = await MovieService.create({ title, genres, year });

      res.status(201).json(movie);
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    const { page, limit } = req.query;
    try {
      const movie = await MovieService.getAllMovie({ page, limit });
      res.status(200).json({
        totalItems: movie.count,
        totalPages: Math.ceil(movie.count / limit),
        currentPage: parseInt(page),
        movies: movie.rows,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const movie = await MovieService.getUserById({ id });

      if (movie) {
        res.status(200).json(movie);
      }
      res.status(404).json({ message: "Data Not Found" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;

    try {
      await MovieService.delete({ id });
      res.status(200).json({ message: "successfully delete" });
    } catch (error) {
      next(error);
    }
  }

  static async putGenres(req, res, next) {
    const { genres } = req.body;
    const { id } = req.params;
    try {
      const movie = await MovieService.putGenres({ genres, id });

      if (movie) {
        res.status(200).json({ message: "Data Berhasil Diubah" });
      }

      res.status(400).json({ message: "Terjadi Kesalahan Saat Mengubah Data" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
