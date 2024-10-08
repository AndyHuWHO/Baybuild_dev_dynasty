import React, { useEffect, useState } from 'react'
import BayCard from './BayCard.jsx'
import Walls from './Walls.jsx'
import Doors from './Doors.jsx'
import LengendExample from './LengendExample.jsx'
import './styles/productionlineVnew.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAllBaysAsync } from '../../redux/bays/thunksBays'
import {
  getHousesInbayAsync,
  bayToHouseAsync,
} from '../../redux/houses/thunksHouses'
import { DndContext, useSensor, useSensors, MouseSensor } from '@dnd-kit/core'
import StatusEditDialog from './StatusEditDialog.jsx'
import { toast } from 'react-toastify'
const Productionline = () => {
  const dispatch = useDispatch()
  const bayArray = useSelector(state => state.bays.list || [])
  const allInBayHouses = useSelector(state => state.houses.inBayList || [])
  const [editHouseStatusDialog, setEditHouseStatusDialog] = useState({
    houseInfo: null,
    isOpen: false,
  })

  const lastUpdated = new Date().toLocaleString()

  useEffect(() => {
    dispatch(getAllBaysAsync())
    dispatch(getHousesInbayAsync())
  }, [])

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 3,
    },
  })

  const sensors = useSensors(mouseSensor)

  const handleDragEnd = event => {
    const { active, over } = event
    const house = active.data.current
    const houseStatus = house.status
    const houseId = house._id

    if (houseStatus !== 4) {
      toast.error('House Status need to be complete before moving')
      return
    }
    if (houseStatus === 0) {
      toast.error('Cancelled Houses should not be in a bay')
      return
    }

    const newBayId = parseFloat(over.id).toString()
    const oldBay = active.data.current.bay_id
    if (oldBay !== newBayId) {
      dispatch(bayToHouseAsync({ houseId: houseId, bayId: newBayId }))
    }
  }

  const handleOpenEditHouseStatusDialog = houseInfo => {
    setEditHouseStatusDialog({ houseInfo, isOpen: true })
  }

  const handleCloseEditHouseStatusDialog = houseInfo => {
    setEditHouseStatusDialog({ houseInfo: null, isOpen: false })
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div className='production-line-grid'>
          {bayArray.map(bay => {
            return (
              <BayCard
                bay={bay}
                houses={allInBayHouses}
                key={bay.bay_id}
                handleOpenEditHouseStatusDialog={
                  handleOpenEditHouseStatusDialog
                }
              />
            )
          })}
          <LengendExample />
          <Walls />
          <Doors />
        </div>
        {editHouseStatusDialog.isOpen && (
          <StatusEditDialog
            isOpen={editHouseStatusDialog.isOpen}
            handleClose={handleCloseEditHouseStatusDialog}
            houseInfo={editHouseStatusDialog.houseInfo}
          />
        )}
      </DndContext>
      <br />
      <br />
      <br />
      <br />
    </>
  )
}

export default Productionline
