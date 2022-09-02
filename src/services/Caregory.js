import axios from "axios";
const URL = "https://res.cloudinary.com/drxffezfe/raw/upload/v1661977358/book-categories_qbktat.json"
export default class CategoryService {
  static async getCategories() {
    const response = await axios.get(URL)
    return response.data
    }
}
