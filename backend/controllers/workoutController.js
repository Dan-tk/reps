const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts
const getAllWorkouts =async(req,res)=>{
    try {
        const workouts = await Workout.find().sort({createdAt:-1})
        res.status(200).json(workouts)       
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
    

}

//get a single workout
const getSingleWorkout =async(req,res)=>{
    try {    
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).json({ error: 'Workout not found' })
    }
        const workout = await Workout.findById(req.params.id)
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
          }
        res.status(200).json(workout)       
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }

}

//create a new workout
const createWorkout =async(req,res)=>{
    const {title, load, reps} = req.body
    try {
        const workout = await Workout.create({title, load, reps}) 
        res.status(200).json(workout)       
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
    
}

//delete a single workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    const workout = await Workout.findOneAndDelete({_id: id})
  
    if(!workout) {
      return res.status(400).json({error: 'No such workout'})
    }
  
    res.status(200).json(workout)
  }

//update a workout
const updateWorkout =async(req,res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).json({ error: 'Workout not found' })
        }
        const workout = await Workout.findOneAndUpdate({_id:req.params.id},{...req.body},{new:true})

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
          }

        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }

}

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout,
    createWorkout
}
