import axios from 'axios'

const SERVER_HOST_URL = 'http://127.0.0.1:8000'
const MOVIES_API = `${SERVER_HOST_URL}/api/movies`

export class MovieService {
  
  static movieHostUrl(){
    return SERVER_HOST_URL
  }

  static async getMovies(url: string = MOVIES_API) {
    try {
      const response = await axios.get(url)
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
