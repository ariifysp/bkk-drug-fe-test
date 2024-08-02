import axios from 'axios'
import config from '.'

const configAxios = {
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
}

const httpClient = axios.create(configAxios)

export default httpClient