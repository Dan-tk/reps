const express = require('express')
const router = express.Router()
const {getAllWorkouts, getSingleWorkout, deleteWorkout, updateWorkout, createWorkout }=require('../controllers/workoutController')

//get all workouts
router.get('/',getAllWorkouts)

//get a single workout
router.get('/:id',getSingleWorkout)

//post a new workout
router.post('/', createWorkout)

//delete a single workout
router.delete('/:id',deleteWorkout)

//update a workout
router.patch('/:id',updateWorkout)

//export routes
module.exports = router