import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const workout = {title, load, reps}
        
        const response = await fetch('http://localhost:3000/api/workouts', {
          method: 'POST',
          body: JSON.stringify(workout),
          headers: {
            'Content-Type': 'application/json'
          }
        }) 
       /* const response = await axios.post('localhost:3000/api/workouts',workout,{
        headers:{
            'Content-Type': 'application/json'
        }
       }) */
        const json = await response.json()
    
        if (!response.ok) {
          const er = json.error
          if(er.includes('title')){
            setEmptyFields(prev=>[...prev,"title"])
          }
          if(er.includes('reps')){
            setEmptyFields(prev=>[...prev,"reps"])
          }
          if(er.includes('load')){
            setEmptyFields(prev=>[...prev,"load"])
          }
          setError("fill in the missing fields")
         
        }
        if (response.ok) {
          setError(null)
          setTitle('')
          setLoad('')
          setReps('')
          setEmptyFields([])
          dispatch({type: 'CREATE_WORKOUT', payload: json}) 
        }
    
      }
    

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes("title")? "error":''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
        className={emptyFields.includes("load")? "error":''}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
        className={emptyFields.includes("reps")? "error":''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm