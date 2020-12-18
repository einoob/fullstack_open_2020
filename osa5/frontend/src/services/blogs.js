import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObj) => {
	const config = {
		headers: { Authorization: token }
	}
	console.log('at creation', newObj, config)
	
	const response = await axios.post(baseUrl, newObj, config)
	return response.data
}

const update = (id, newObj) => {
	const request = axios.put(`${baseUrl}/${id}`, newObj)
	return request.then(response => response.data)
}

export default { getAll, create, update, setToken }
