const Goals = require("../models/goal")

const getAllGoals = async (req, res) => {
    try {
        const goals = await Goals.find()
        res.status(200).json({ success: true, goals })
      } catch (error) {
        res.send(error)
      }
}
const getGoal = async (req, res) => {
   const { goalId } = req.params;
   try {
    const goal = await Goals.findById({ _id: goalId })
    res.status(200).json({ success: true, goal})
   } catch (error) {
    res.send(error)
   }
}
const createGoal = async (req, res) => {
   const { title, description } = req.body
   try {
   if (!title || !description) {
    return res.status(400).json({success: false, msg: 'Please fill all the input fields'})
   }
   const goal = await Goals.create(req.body);
   res.status(201).json({ success: true, goal })
 } catch (error) {
   res.send(error)
 }
}
const updateGoal = async (req, res) => {
    const { goalId } = req.params;
    try {
        const goal = await Goals.findByIdAndUpdate({_id: goalId }, req.body, {
            new: true,
            runValidators: true,
        })
        res.status(200).json({ success: true, goal })
    } catch (error) {
        res.send(error)
    }
}
const deleteGoal = async (req, res) => {
    const { goalId } = req.params;
    try {
        const goal = await Goals.findByIdAndDelete({_id: goalId }) 
        res.status(200).json({ success: true })
    } catch (error) {
        res.send(error)  
    }
}

module.exports = { getAllGoals, getGoal, createGoal, updateGoal, deleteGoal}