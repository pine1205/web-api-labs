import express from 'express';
import Task from './taskModel';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line




// Get a user's tasks - get tasks for a single user when logged in 
router.get('/', async (req, res) => {
    console.log(req.user);
    const tasks = await Task.find({ userId: `${req.user._id}`});
    res.status(200).json(tasks);
});



// when a user creates a task, their user ID would be stored in the userId field.
//When this endpoint is called, the populate('userId', 'username') uses the'userId' field to look up the User collection
//  and replaces the userId field in each Task with the corresponding username from the user document.



// Get a user's tasks
router.get('/user/:uid', async (req, res) => {
    const tasks = await Task.find({ userId: `${req.params.uid}`});
    res.status(200).json(tasks);
});
//This function takes in a user id and finds the tasks that contain that user id.



// create a task
router.post('/', asyncHandler(async (req, res) => {
    const newTask = req.body;                          //req.body contains the data sent from frontend 
    newTask.userId = req.user._id;                    //Adds the logged-in user’s ID to the task
    const task = await Task(newTask).save();          
    res.status(201).json(task);
}));

//{ title: "Study React",
//   description: "Finish hooks",
//   userId: "abc123"}            // attaches the ID and saves the task to database
//Send response to frontend - 201 = “Created successfully”


//Task - is a Mongoose model 
//It uses Task model, find document by id, updates/deletes it






// Update Task
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await Task.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'Task Updated Successfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Task' });
    }
});


// delete Task
router.delete('/:id', async (req, res) => {
    const result = await Task.deleteOne({
        _id: req.params.id,
    });
    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find Task' });
    }
});



export default router;
