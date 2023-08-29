import axios from 'axios'

//KUN TESTATAAN PELKKAA FRONTENDIA -> JSON SERVER OSOITE
//const baseUrl = 'http://localhost:3001/persons'

//KUN TESTATAAN FRONTENDIA JA BACKENDIA YHDESSA -> BACKEND SERVER ADDRESS
//const baseUrl = 'http://localhost:3001/api/persons'

//KUN TESTATAAN FRONTENDIA JA BACKENDIA YHDESSA -> BACKEND SERVER ADDRESS
//KUN TUOTANTOSOVELLUS VIEDAAN INTERNETIIN -> SUHTEELLINEN OSOITE
//MUUTA MYOS TIEDOSTON C:\Users\PC\persons\vite.config.js SISALTO
const baseUrl = 'api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const delItem = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { 
  getAll, 
  create, 
  update,
  delItem 
}