import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const getDefectsByHouseId = async houseId => {
  try {
    const response = await axios.get(`${BACKEND_URL}/defects/${houseId}`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching defects for house with id ${houseId}:`, error)
  }
}

export const addDefect = async (houseId, defectData) => {
  try {
    const formData = new FormData()
    for (const key in defectData) {
      if (key === 'images') {
        defectData.images.forEach(image => {
          formData.append('images', image)
        })
      } else {
        formData.append(key, defectData[key])
      }
    }

    const response = await axios.post(
      `${BACKEND_URL}/defects/${houseId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    )
    return response.data
  } catch (error) {
    console.error(`Error adding defect to house with id ${houseId}:`, error)
    throw error
  }
}

export const updateDefect = async (houseId, defectId, defectData) => {
  try {
    const formData = new FormData()

    // Append new images to form data
    if (defectData.images) {
      defectData.images.forEach(image => {
        formData.append('images', image)
      })
    }

    // Append deleted images URLs as a JSON string
    if (defectData.deleted) {
      formData.append('deleted', JSON.stringify(defectData.deleted))
    }

    // Append kept images URLs as a JSON string
    if (defectData.kept) {
      formData.append('kept', JSON.stringify(defectData.kept))
    }

    // Append other defect data fields
    for (const key in defectData) {
      if (!['images', 'deleted', 'kept'].includes(key)) {
        formData.append(key, defectData[key])
      }
    }

    const response = await axios.put(
      `${BACKEND_URL}/defects/${houseId}/${defectId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    )

    return response.data
  } catch (error) {
    console.error(`Error updating defect with id ${defectId}:`, error)
  }
}

export const deleteDefect = async (houseId, defectId) => {
  try {
    const response = await axios.delete(
      `${BACKEND_URL}/defects/${houseId}/${defectId}`,
      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error) {
    console.error(`Error deleting defect with id ${defectId}:`, error)
  }
}
