import React from 'react'
/* import axios from 'axios' */
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

const WorkoutDetails = ({workout}) => {
  const {dispatch} = useWorkoutsContext()

   const handleClick = async () => {
    const response = await fetch('http://localhost:3000/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()
    
    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{workout.createdAt}</p>
      <span onClick={handleClick}>Del</span>
    </div>
  )
}

export default WorkoutDetails