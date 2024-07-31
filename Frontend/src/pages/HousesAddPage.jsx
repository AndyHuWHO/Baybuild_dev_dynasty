import React, { useEffect } from 'react'
import Navbar from '../components/navigation/Navbar'
import Header1 from '../components/headers/Header1'
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { addHouseAsync } from '../redux/houses/thunksHouses.js'
import { getCustomersAsync } from '../redux/customers/thunksCustomers.js'
import { useNavigate } from 'react-router-dom'
import { putChecklistAsync } from '../redux/checklists/thunksChecklists.js'

const HousesAddPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialState = {
    npl: '',
    customer_id: '',
    house_model: '',
    square_ft: '',
  }
  const [formFields, setFormFields] = useState(initialState)

  const customers = useSelector(state => state.customers.list)

  useEffect(() => {
    dispatch(getCustomersAsync())
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const result = await dispatch(addHouseAsync(formFields)).unwrap()
    await dispatch(putChecklistAsync({ houseId: result._id }))
    navigate(-1)
  }

  return (
    <Navbar>
      <Header1 title={'Add House'}>
        <form onSubmit={handleSubmit}>
          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Typography sx={{ pt: '50px' }} variant='label'>
              Fill in the form below to add a new house
            </Typography>
            <TextField
              required
              name={'npl'}
              label={'NPL #'}
              type={'number'}
              value={formFields.npl}
              onChange={handleChange}
            />
            <TextField
              required
              select={true}
              name={'customer_id'}
              label={'Customer Name'}
              value={formFields.customer_id}
              onChange={handleChange}
            >
              {customers.map(customer => (
                <MenuItem key={customer._id} value={customer._id}>
                  {customer.customer_name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              name={'house_model'}
              label={'Model #'}
              value={formFields.house_model}
              onChange={handleChange}
            />
            <TextField
              required
              name={'square_ft'}
              label={'Floor area (sq ft)'}
              type={'number'}
              value={formFields.square_ft}
              onChange={handleChange}
              helperText='* Indicates required field'
            />
            <Button variant='contained' type='submit'>
              Submit
            </Button>
          </Box>
        </form>
      </Header1>
    </Navbar>
  )
}

export default HousesAddPage
