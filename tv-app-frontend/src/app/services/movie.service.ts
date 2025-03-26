import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/'
const MOVIES_API = `${API_URL}movies`

export class MovieService {

  static async getMovies(page: number = 1) {
    try {
      const response = await axios.get(`${MOVIES_API}?page=${page}`)
      return response.data
    } catch (error) {
      console.error('Error fetching movies:', error)
      throw error
    }
  }

  static async getMovie(id: number) {
    try {
      const response = await axios.get(`${MOVIES_API}/${id}/`)
      return response.data
    } catch (error) {
      console.error(`Error fetching movie with ID ${id}:`, error)
      throw error
    }
  }

  static async createMovie(movieData: FormData) {
    try {
      const response = await axios.post(MOVIES_API, movieData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return response.data
    } catch (error) {
      console.error('Error creating movie:', error)
      throw error
    }
  }

  static async updateMovie(id: number, movieData: FormData) {
    try {
      const response = await axios.patch(`${MOVIES_API}${id}/`, movieData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return response.data
    } catch (error) {
      console.error(`Error updating movie with ID ${id}:`, error)
      throw error
    }
  }

  static async deleteMovie(id: number) {
    try {
      await axios.delete(`${MOVIES_API}${id}/`)
      return { success: true }
    } catch (error) {
      console.error(`Error deleting movie with ID ${id}:`, error)
      throw error
    }
  }
}
