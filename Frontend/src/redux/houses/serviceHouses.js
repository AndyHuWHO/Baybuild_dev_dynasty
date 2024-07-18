import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getAllHouses = async ({
  query,
  nplQuery,
  customerNameQuery,
  houseModelQuery,
}) => {
  try {
    const params = new URLSearchParams({
      query,
      nplQuery,
      customerNameQuery,
      houseModelQuery,
    }).toString()
    const response = await axios.get(`${BACKEND_URL}/houses?${params}`)
    return response.data.result
  } catch (error) {
    console.error('Error fetching houses:', error)
  }
}

const getHouse = async houseid => {
  try {
    const response = await axios.get(`${BACKEND_URL}/houses/${houseid}`)
    return response.data.result
  } catch (error) {
    console.error(`Error fetching house with id ${houseid}:`, error)
  }
}

const getHousesInbays = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/houses/inbay`)
    return response.data.result
  } catch (error) {
    console.error(`Error fetching houses that are in production:`, error)
  }
}

const getHouseInABay = async bayId => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/houses/inbay/${bayId}`
    )
    return response.data.result
  } catch (error) {
    console.error(`Error fetching houses that are in production:`, error)
  }
}

const addHouse = async houseData => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/houses`,
      houseData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data.result
  } catch (error) {
    console.error(`Error fetching houses that are in production:`, error)
  }
}

const deleteHouse = async houseId => {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/houses/${houseId}`
    )
    return response.data.result
  } catch (error) {
    console.error(`Error deleting house with id  ${houseId} :`, error)
  }
}

const updateHouse = async (houseId, houseData) => {
  try {
    const response = await axios.put(
      `${BACKEND_URL}/houses/${houseId}`,
      houseData
    )
    return response.data.result
  } catch (error) {
    console.error(`Error updating house with id  ${houseId} :`, error)
  }
}

const bayToHouse = async (houseId, bayId) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/houses/${houseId}/${bayId}`
    )
    return response.data
  } catch (error) {
    console.error(
      `Error updating house with id  ${houseId} to bay ${bayId}:`,
      error
    )
    throw error;
  }
}

export default {
  getAllHouses,
  getHouse,
  getHousesInbays,
  getHouseInABay,
  addHouse,
  deleteHouse,
  updateHouse,
  bayToHouse,
}
