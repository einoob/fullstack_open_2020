import axios from 'axios'
//import React from 'react'

const baseUrl = 'http://localhost:3001/persons'

const create = newObj => {
	const request = axios.post(baseUrl, newObj)
	return request.then(response => response.data)
}

const remove = person => {
	const request = axios.delete(`${baseUrl}/${person.id}`)
	return request.then(response => response.data)
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const update = (id, newNumber) => {
	const request = axios.put(`${baseUrl}/${id}`, newNumber)
	return request.then(response => response.data)
}

export default {
	create,
	remove,
	getAll,
	update
}
